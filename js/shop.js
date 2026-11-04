/* ==========================================================================
   TownSquare Local Market - Shop Page Logic
   Handles: Live filters (Category, Price, Diet, Vendor, Search), Sorting, Active Chips
   Powered by marketStore dynamic catalog
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const shopGrid = document.getElementById('shopProductsGrid');
  if (!shopGrid) return; // Not on the shop page

  // Filter state
  let currentCategory = 'all';
  let maxPrice = 1000;
  let selectedSpecialties = [];
  let selectedVendors = [];
  let currentSort = 'featured';
  let searchQuery = '';

  // DOM Elements
  const categoryFilters = document.querySelectorAll('.category-filter-item');
  const priceRange = document.getElementById('priceRange');
  const priceDisplay = document.getElementById('maxPriceDisplay');
  const specialtyCheckboxes = document.querySelectorAll('input[name="specialty"]');
  const vendorCheckboxes = document.querySelectorAll('input[name="vendor"]');
  const sortSelect = document.getElementById('sortSelect');
  const activeChipsContainer = document.getElementById('activeChipsContainer');
  const clearFiltersBtn = document.getElementById('clearFiltersBtn');
  const totalCountEl = document.getElementById('totalResultsCount');
  const searchInput = document.getElementById('shopSearchInput');

  // Check URL params
  const urlParams = new URLSearchParams(window.location.search);
  const catParam = urlParams.get('category');
  if (catParam) {
    currentCategory = catParam;
    categoryFilters.forEach(item => {
      if (item.dataset.category === catParam) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  const qParam = urlParams.get('q');
  if (qParam && searchInput) {
    searchQuery = qParam.toLowerCase();
    searchInput.value = qParam;
  }

  // Filter & Render Function
  function filterAndRender() {
    const products = marketStore.products;

    let filtered = products.filter(item => {
      // Category filter
      if (currentCategory !== 'all' && item.category !== currentCategory) {
        return false;
      }

      // Price filter
      if (item.price > maxPrice) {
        return false;
      }

      // Search Query
      if (searchQuery) {
        const matchesTitle = item.title.toLowerCase().includes(searchQuery);
        const matchesVendor = item.vendor.toLowerCase().includes(searchQuery);
        const matchesDesc = (item.description || '').toLowerCase().includes(searchQuery);
        if (!matchesTitle && !matchesVendor && !matchesDesc) return false;
      }

      // Specialty / Badge filters
      if (selectedSpecialties.length > 0) {
        if (!selectedSpecialties.includes(item.badge)) {
          return false;
        }
      }

      // Vendor filter
      if (selectedVendors.length > 0) {
        if (!selectedVendors.some(v => item.vendor.toLowerCase().includes(v.toLowerCase()))) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    if (currentSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (currentSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (currentSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else {
      filtered.sort((a, b) => a.id - b.id);
    }

    // Render to Grid
    if (filtered.length === 0) {
      shopGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #fff; border-radius: var(--radius-md); border: 1px dashed var(--border);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="font-size: 1.35rem; color: var(--primary-dark); margin-bottom: 0.5rem; font-family: var(--font-serif);">No fresh items found</h3>
          <p style="color: var(--text-muted); max-width: 420px; margin: 0 auto 1.5rem; font-size: 0.95rem;">
            Try clearing some filters or searching for another keyword to discover more local vendor products.
          </p>
          <button id="resetFromEmptyBtn" class="btn btn-outline btn-sm">Reset All Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetFromEmptyBtn');
      if (resetBtn) resetBtn.addEventListener('click', resetAllFilters);
    } else {
      shopGrid.innerHTML = filtered.map(item => createProductCardHTML(item)).join('');
    }

    // Update result count
    if (totalCountEl) {
      totalCountEl.textContent = `${filtered.length} item${filtered.length === 1 ? '' : 's'}`;
    }

    renderActiveChips();
  }

  // Render Active Filter Chips
  function renderActiveChips() {
    if (!activeChipsContainer) return;
    let chips = [];

    if (currentCategory !== 'all') {
      chips.push({ label: `Category: ${currentCategory}`, type: 'category' });
    }

    if (maxPrice < 1000) {
      chips.push({ label: `Max ₹${maxPrice}`, type: 'price' });
    }

    if (searchQuery) {
      chips.push({ label: `Search: "${searchQuery}"`, type: 'search' });
    }

    selectedSpecialties.forEach(spec => {
      chips.push({ label: `Badge: ${spec}`, type: 'specialty', val: spec });
    });

    selectedVendors.forEach(vend => {
      chips.push({ label: `Vendor: ${vend.split(' ')[0]}`, type: 'vendor', val: vend });
    });

    if (chips.length === 0) {
      activeChipsContainer.style.display = 'none';
      activeChipsContainer.innerHTML = '';
      return;
    }

    activeChipsContainer.style.display = 'flex';
    activeChipsContainer.innerHTML = `
      <span style="font-size: 0.8rem; font-weight:700; color:var(--text-muted);">Active Filters:</span>
      ${chips.map(chip => `
        <span class="filter-chip">
          ${chip.label}
          <button data-type="${chip.type}" data-val="${chip.val || ''}" aria-label="Remove filter">✕</button>
        </span>
      `).join('')}
    `;

    // Chip remove buttons
    activeChipsContainer.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.type;
        const val = btn.dataset.val;

        if (type === 'category') {
          currentCategory = 'all';
          categoryFilters.forEach(i => i.classList.toggle('active', i.dataset.category === 'all'));
        } else if (type === 'price') {
          maxPrice = 1000;
          if (priceRange) priceRange.value = 30;
          if (priceDisplay) priceDisplay.textContent = '₹1000';
        } else if (type === 'search') {
          searchQuery = '';
          if (searchInput) searchInput.value = '';
        } else if (type === 'specialty') {
          selectedSpecialties = selectedSpecialties.filter(s => s !== val);
          specialtyCheckboxes.forEach(cb => {
            if (cb.value === val) cb.checked = false;
          });
        } else if (type === 'vendor') {
          selectedVendors = selectedVendors.filter(v => v !== val);
          vendorCheckboxes.forEach(cb => {
            if (cb.value === val) cb.checked = false;
          });
        }
        filterAndRender();
      });
    });
  }

  function resetAllFilters() {
    currentCategory = 'all';
    maxPrice = 1000;
    selectedSpecialties = [];
    selectedVendors = [];
    searchQuery = '';

    categoryFilters.forEach(i => i.classList.toggle('active', i.dataset.category === 'all'));
    if (priceRange) priceRange.value = 30;
    if (priceDisplay) priceDisplay.textContent = '₹1000';
    if (searchInput) searchInput.value = '';
    specialtyCheckboxes.forEach(cb => cb.checked = false);
    vendorCheckboxes.forEach(cb => cb.checked = false);

    filterAndRender();
  }

  // Event Listeners
  categoryFilters.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      categoryFilters.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
      currentCategory = item.dataset.category || 'all';
      filterAndRender();
    });
  });

  if (priceRange) {
    priceRange.addEventListener('input', (e) => {
      maxPrice = parseFloat(e.target.value);
      if (priceDisplay) priceDisplay.textContent = `₹${maxPrice}`;
      filterAndRender();
    });
  }

  specialtyCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      selectedSpecialties = Array.from(specialtyCheckboxes)
        .filter(c => c.checked)
        .map(c => c.value);
      filterAndRender();
    });
  });

  vendorCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      selectedVendors = Array.from(vendorCheckboxes)
        .filter(c => c.checked)
        .map(c => c.value);
      filterAndRender();
    });
  });

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      filterAndRender();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      filterAndRender();
    });
  }

  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', resetAllFilters);
  }

  // Initial render
  filterAndRender();
});
