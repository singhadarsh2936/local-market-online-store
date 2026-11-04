/* ==========================================================================
   TownSquare Local Market - Vendors Directory & Onboarding JS
   Handles: Vendor search & filter, Application form validation & FAQ Accordion
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Vendors Directory Grid & Filter
  const vendorsGrid = document.getElementById('vendorsDirectoryGrid');
  const vendorSearchInput = document.getElementById('vendorSearchInput');
  const vendorCategoryPills = document.querySelectorAll('.vendor-cat-pill');

  if (vendorsGrid) {
    let currentCat = 'all';
    let searchQuery = '';

    function renderVendors() {
      const vendors = marketStore.vendors;

      const filtered = vendors.filter(v => {
        if (currentCat !== 'all' && !v.category.toLowerCase().includes(currentCat.toLowerCase())) {
          return false;
        }
        if (searchQuery) {
          const matchName = v.name.toLowerCase().includes(searchQuery);
          const matchLoc = v.location.toLowerCase().includes(searchQuery);
          const matchSpec = (v.specialties || []).some(s => s.toLowerCase().includes(searchQuery));
          if (!matchName && !matchLoc && !matchSpec) return false;
        }
        return true;
      });

      if (filtered.length === 0) {
        vendorsGrid.innerHTML = `
          <div style="grid-column: 1 / -1; text-align: center; padding: 3rem 1rem; background: #fff; border-radius: var(--radius-md); border: 1px dashed var(--border);">
            <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">👨‍🌾</div>
            <h4 style="font-size: 1.2rem; color: var(--text-main); font-family: var(--font-serif); margin-bottom: 0.5rem;">No local stalls match your criteria</h4>
            <p style="color: var(--text-muted); font-size: 0.9rem;">Try selecting "All Stalls" or clearing your search keywords.</p>
          </div>
        `;
        return;
      }

      vendorsGrid.innerHTML = filtered.map(v => `
        <article class="vendor-card">
          <div class="vendor-banner" style="background-image: url('${v.banner}');">
            <div class="vendor-banner-overlay"></div>
            <span class="vendor-badge-top">✓ ${v.badge}</span>
          </div>

          <div class="vendor-avatar-wrap">
            <img src="${v.avatar}" alt="${v.name}" class="vendor-avatar">
          </div>

          <div class="vendor-body">
            <div class="vendor-name-row">
              <h3 class="vendor-title">${v.name}</h3>
              <span class="vendor-category-tag">${v.category}</span>
            </div>

            <div class="vendor-location">
              <span>📍 ${v.location}</span>
              <span>•</span>
              <span>⚡ ${v.distance} away</span>
            </div>

            <p class="vendor-bio">${v.bio}</p>

            <div class="vendor-specialties">
              ${(v.specialties || []).map(s => `<span class="specialty-pill">${s}</span>`).join('')}
            </div>

            <div class="vendor-card-footer">
              <div class="vendor-rating-box">
                <span>★</span> ${v.rating} <span style="color:var(--text-light); font-weight:400;">(${v.reviews} reviews)</span>
              </div>
              <a href="shop.html" class="btn btn-primary btn-sm">
                Shop Stall ➔
              </a>
            </div>
          </div>
        </article>
      `).join('');
    }

    vendorCategoryPills.forEach(pill => {
      pill.addEventListener('click', () => {
        vendorCategoryPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentCat = pill.dataset.category || 'all';
        renderVendors();
      });
    });

    if (vendorSearchInput) {
      vendorSearchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        renderVendors();
      });
    }

    renderVendors();
  }

  // 2. Vendor Application Form Validation & Submission
  const vendorForm = document.getElementById('vendorApplicationForm');
  if (vendorForm) {
    const fileInput = document.getElementById('certUpload');
    const fileDropzone = document.getElementById('fileDropzone');
    const fileNameDisplay = document.getElementById('dropzoneFileName');

    if (fileDropzone && fileInput) {
      fileDropzone.addEventListener('click', () => fileInput.click());

      fileInput.addEventListener('change', () => {
        if (fileInput.files && fileInput.files[0]) {
          const file = fileInput.files[0];
          if (fileNameDisplay) {
            fileNameDisplay.textContent = `Attached: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
            fileNameDisplay.style.color = 'var(--primary)';
            fileNameDisplay.style.fontWeight = '700';
          }
        }
      });
    }

    vendorForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = vendorForm.querySelector('button[type="submit"]');
      const originalText = submitBtn ? submitBtn.innerHTML : 'Submit Application';

      const bizName = document.getElementById('bizName')?.value || 'Your Stall';
      const ownerName = document.getElementById('ownerName')?.value || '';
      const email = document.getElementById('email')?.value || '';
      const phone = document.getElementById('phone')?.value || '';
      const category = document.getElementById('category')?.value || 'Small-Batch Goods';
      const region = document.getElementById('region')?.value || 'West End';
      const story = document.getElementById('story')?.value || '';

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>⏳ Registering Your Stall...</span>`;
      }

      setTimeout(() => {
        // Register in marketStore
        marketStore.addVendor({
          name: bizName,
          owner: ownerName,
          email: email,
          phone: phone,
          category: category,
          region: region,
          story: story
        });

        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }

        vendorForm.reset();
        if (fileNameDisplay) fileNameDisplay.textContent = 'Upload Stall Permit / Kitchen License (PDF or JPG)';

        showToast(`Stall "${bizName}" submitted! Listed in Market Directory.`, "toast-success", "🎉");

        const formParent = vendorForm.parentElement;
        const successBox = document.createElement('div');
        successBox.style.cssText = `
          background: #d8f3dc;
          border: 1px solid var(--primary-light);
          padding: 1.5rem;
          border-radius: var(--radius-md);
          margin-bottom: 2rem;
          color: var(--primary-dark);
          animation: fadeInDown 0.4s ease;
        `;
        successBox.innerHTML = `
          <h4 style="font-weight: 800; font-size: 1.15rem; margin-bottom: 0.4rem;">🎉 Application & Registration Received!</h4>
          <p style="font-size: 0.95rem; line-height: 1.5; margin-bottom: 0.75rem;">
            Welcome, <strong>${bizName}</strong>! Your store profile has been created and logged in the <a href="dashboard.html" style="text-decoration:underline; font-weight:700;">Admin & Vendor Dashboard</a>.
          </p>
          <a href="dashboard.html" class="btn btn-primary btn-sm">Go to Vendor Dashboard ➔</a>
        `;

        formParent.insertBefore(successBox, vendorForm);
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 1000);
    });
  }

  // 3. FAQ Accordion Interaction
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const wasActive = item.classList.contains('active');
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        item.classList.toggle('active', !wasActive);
      });
    }
  });
});
