/* ==========================================================================
   TownSquare Local Market - Admin & Vendor Dashboard Controller
   Handles: Live KPIs, Dynamic Inventory CRUD, Order Status Dispatcher, Vendor Registry
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const kpiRevenue = document.getElementById('kpiGrossRevenue');
  const kpiOrders = document.getElementById('kpiTotalOrders');
  const kpiVendors = document.getElementById('kpiActiveVendors');
  const kpiLowStock = document.getElementById('kpiLowStock');
  const tabOrderCount = document.getElementById('tabOrderCount');

  const inventoryTbody = document.getElementById('inventoryTableBody');
  const ordersTbody = document.getElementById('ordersTableBody');
  const vendorsTbody = document.getElementById('vendorsTableBody');

  const addProductModal = document.getElementById('addProductModal');
  const openAddModalBtn = document.getElementById('openAddProductModalBtn');
  const closeAddModalBtn = document.getElementById('closeAddProductModalBtn');
  const addProductForm = document.getElementById('addProductForm');
  const vendorSelect = document.getElementById('newProdVendor');

  // Tab Switcher
  const tabButtons = document.querySelectorAll('.dashboard-tab-btn');
  const tabContents = document.querySelectorAll('.dashboard-tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tabButtons.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.style.display = 'none');

      btn.classList.add('active');
      const targetId = btn.dataset.tab;
      const targetContent = document.getElementById(targetId);
      if (targetContent) targetContent.style.display = 'block';
    });
  });

  // Calculate & Refresh KPIs
  function refreshKPIs() {
    const products = marketStore.products;
    const orders = marketStore.orders;
    const vendors = marketStore.vendors;

    const gross = orders.reduce((sum, ord) => sum + ord.total, 0);
    const lowStockCount = products.filter(p => p.stock < 10).length;

    if (kpiRevenue) kpiRevenue.textContent = `$${gross.toFixed(2)}`;
    if (kpiOrders) kpiOrders.textContent = orders.length;
    if (kpiVendors) kpiVendors.textContent = vendors.length;
    if (kpiLowStock) kpiLowStock.textContent = lowStockCount;
    if (tabOrderCount) tabOrderCount.textContent = orders.length;
  }

  // Render Inventory Table
  function renderInventoryTable() {
    if (!inventoryTbody) return;
    const products = marketStore.products;

    if (products.length === 0) {
      inventoryTbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding:2rem; color:var(--text-muted);">No products in catalog. Click "+ Add New Product" to create one.</td></tr>`;
      return;
    }

    inventoryTbody.innerHTML = products.map(p => {
      let stockBadgeClass = 'status-badge ok-stock';
      let stockText = `${p.stock} in stock`;

      if (p.stock <= 0) {
        stockBadgeClass = 'status-badge low-stock';
        stockText = 'Out of Stock (0)';
      } else if (p.stock < 10) {
        stockBadgeClass = 'status-badge status-badge preparing';
        stockText = `Low Stock (${p.stock})`;
      }

      return `
        <tr>
          <td>
            <div style="display:flex; align-items:center; gap:0.75rem;">
              <img src="${p.image}" alt="${p.title}" style="width:44px; height:44px; border-radius:var(--radius-sm); object-fit:cover; border:1px solid var(--border);">
              <div>
                <strong style="display:block; font-size:0.9rem; color:var(--text-main);">${p.title}</strong>
                <span style="font-size:0.75rem; color:var(--text-muted);">${p.unit}</span>
              </div>
            </div>
          </td>
          <td><span style="color:var(--primary); font-weight:600;">${p.vendor}</span></td>
          <td style="text-transform:capitalize;">${p.category}</td>
          <td><strong>$${p.price.toFixed(2)}</strong></td>
          <td><span class="${stockBadgeClass}">${stockText}</span></td>
          <td style="color:var(--secondary); font-weight:700;">★ ${p.rating} (${p.reviewsCount})</td>
          <td style="text-align:right;">
            <div style="display:inline-flex; gap:0.4rem;">
              <button class="btn btn-outline btn-sm restock-btn" data-id="${p.id}" data-amount="10" title="Add 10 units" style="padding:0.3rem 0.6rem; font-size:0.75rem;">
                +10 Stock
              </button>
              <button class="cart-remove-btn delete-prod-btn" data-id="${p.id}" style="padding:0.3rem 0.6rem; font-size:0.75rem;">
                Delete
              </button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    // Attach Action Listeners
    inventoryTbody.querySelectorAll('.restock-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const prod = products.find(p => p.id === parseInt(id));
        if (prod) {
          marketStore.updateStock(id, prod.stock + parseInt(btn.dataset.amount));
          showToast(`Restocked "${prod.title}" (+${btn.dataset.amount} units).`, "toast-success", "📦");
          renderInventoryTable();
          refreshKPIs();
        }
      });
    });

    inventoryTbody.querySelectorAll('.delete-prod-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        const prod = products.find(p => p.id === parseInt(id));
        if (prod && confirm(`Are you sure you want to remove "${prod.title}" from the marketplace?`)) {
          marketStore.deleteProduct(id);
          showToast(`Deleted product "${prod.title}".`, "toast-info", "🗑️");
          renderInventoryTable();
          refreshKPIs();
        }
      });
    });
  }

  // Render Orders Management Table
  function renderOrdersTable() {
    if (!ordersTbody) return;
    const orders = marketStore.orders;

    if (orders.length === 0) {
      ordersTbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">No orders recorded yet. Place an order in the marketplace to test!</td></tr>`;
      return;
    }

    ordersTbody.innerHTML = orders.map(ord => {
      let badgeClass = 'status-badge confirmed';
      if (ord.status === 'Preparing Order') badgeClass = 'status-badge preparing';
      if (ord.status === 'Out for Delivery') badgeClass = 'status-badge out-delivery';
      if (ord.status === 'Delivered') badgeClass = 'status-badge delivered';

      const itemsSummary = (ord.items || []).map(i => `${i.title} (${i.qty}x)`).join(', ');

      return `
        <tr>
          <td><strong style="color:var(--primary-dark);">${ord.id}</strong><div style="font-size:0.75rem; color:var(--text-muted);">${ord.date}</div></td>
          <td>
            <strong>${ord.customerName}</strong>
            <div style="font-size:0.75rem; color:var(--text-muted);">${ord.customerPhone}</div>
          </td>
          <td style="max-width:200px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${itemsSummary}">${itemsSummary}</td>
          <td><strong style="color:var(--text-main); font-size:0.95rem;">$${ord.total.toFixed(2)}</strong></td>
          <td><span style="font-size:0.8rem; font-weight:600;">${ord.paymentMethod}</span></td>
          <td><span class="${badgeClass}">${ord.status}</span></td>
          <td><span style="font-size:0.8rem; color:var(--text-muted);">${ord.courier}</span></td>
          <td style="text-align:right;">
            <select class="sort-select update-order-status" data-id="${ord.id}" style="padding:0.35rem 0.75rem; font-size:0.8rem;">
              <option value="Order Confirmed" ${ord.status === 'Order Confirmed' ? 'selected' : ''}>Confirmed</option>
              <option value="Preparing Order" ${ord.status === 'Preparing Order' ? 'selected' : ''}>Preparing</option>
              <option value="Out for Delivery" ${ord.status === 'Out for Delivery' ? 'selected' : ''}>Out for Delivery</option>
              <option value="Delivered" ${ord.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
            </select>
          </td>
        </tr>
      `;
    }).join('');

    ordersTbody.querySelectorAll('.update-order-status').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const orderId = sel.dataset.id;
        const newStatus = e.target.value;
        marketStore.updateOrderStatus(orderId, newStatus);
        showToast(`Order ${orderId} status updated to "${newStatus}"!`, "toast-success", "🚚");
        renderOrdersTable();
      });
    });
  }

  // Render Vendors Registry Table
  function renderVendorsTable() {
    if (!vendorsTbody) return;
    const vendors = marketStore.vendors;

    vendorsTbody.innerHTML = vendors.map(v => `
      <tr>
        <td>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <img src="${v.avatar}" alt="${v.name}" style="width:40px; height:40px; border-radius:50%; object-fit:cover; border:1px solid var(--border);">
            <div>
              <strong style="color:var(--text-main); font-size:0.9rem;">${v.name}</strong>
              <div style="font-size:0.75rem; color:var(--primary);">${v.badge}</div>
            </div>
          </div>
        </td>
        <td>${v.category}</td>
        <td>📍 ${v.location}</td>
        <td><strong>${v.ordersCompleted || 0} orders</strong></td>
        <td style="color:var(--secondary); font-weight:700;">★ ${v.rating} (${v.reviews || 0})</td>
        <td><span class="status-badge ok-stock">Active / Verified</span></td>
      </tr>
    `).join('');
  }

  // Populate Vendor Select in Add Product Modal
  function populateVendorDropdown() {
    if (!vendorSelect) return;
    const vendors = marketStore.vendors;
    vendorSelect.innerHTML = vendors.map(v => `<option value="${v.name}">${v.name}</option>`).join('');
  }

  // Add Product Modal Handlers
  if (openAddModalBtn && addProductModal) {
    openAddModalBtn.addEventListener('click', () => {
      populateVendorDropdown();
      addProductModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeAddModalBtn && addProductModal) {
    closeAddModalBtn.addEventListener('click', () => {
      addProductModal.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  if (addProductForm) {
    addProductForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('newProdTitle').value;
      const vendor = document.getElementById('newProdVendor').value;
      const category = document.getElementById('newProdCategory').value;
      const price = parseFloat(document.getElementById('newProdPrice').value);
      const stock = parseInt(document.getElementById('newProdStock').value);
      const unit = document.getElementById('newProdUnit').value;
      const badge = document.getElementById('newProdBadge').value;
      const image = document.getElementById('newProdImage').value;
      const desc = document.getElementById('newProdDesc').value;

      const newProduct = marketStore.addProduct({
        title,
        vendor,
        category,
        price,
        stock,
        unit,
        badge,
        badgeText: badge === 'organic' ? '100% Organic' : badge === 'artisan' ? 'Handmade' : 'Best Seller',
        image,
        description: desc
      });

      addProductForm.reset();
      addProductModal.classList.remove('open');
      document.body.style.overflow = '';

      showToast(`Published "${newProduct.title}" to marketplace!`, "toast-success", "🎉");
      renderInventoryTable();
      refreshKPIs();
    });
  }

  // Initial render
  refreshKPIs();
  renderInventoryTable();
  renderOrdersTable();
  renderVendorsTable();
});
