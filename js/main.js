/* ==========================================================================
   TownSquare Local Market - Main & Shared JavaScript Engine
   Covers LPU CA1 Syllabus Modules:
   1. Dynamic Product Catalog & Inventory in localStorage
   2. Local Vendors Registry in localStorage
   3. Persistent Shopping Cart & Promo Coupons Engine
   4. Secure Digital Payment Simulation & Order Placement
   5. Order Tracking & Delivery Status System
   6. Customer Reviews & Ratings System
   7. Price Comparison System
   8. Toast Notifications, Drawers & Modals
   ========================================================================== */

// Default Seed Catalog
const DEFAULT_PRODUCTS = [
  {
    id: 1,
    title: "Woodfired Sourdough Batard",
    vendor: "Mama Rosa's Hearth Bakery",
    category: "bakery",
    price: 180.00,
    unit: "per loaf (500g)",
    stock: 14,
    rating: 4.9,
    reviewsCount: 38,
    badge: "artisan",
    badgeText: "Artisan Baker",
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=700&q=80",
    description: "Naturally leavened for 36 hours using organic heritage stoneground wheat flour and baked in a traditional wood-fired brick oven. Crispy crust with an airy, moist crumb.",
    vendorStory: "Mama Rosa has been baking traditional rustic breads for over 14 years."
  },
  {
    id: 2,
    title: "Fresh Handpicked Heirloom Strawberries",
    vendor: "Sunbeam Organic Farm",
    category: "produce",
    price: 160.00,
    unit: "250g box",
    stock: 22,
    rating: 5.0,
    reviewsCount: 52,
    badge: "organic",
    badgeText: "100% Organic",
    distance: "3.5 km",
    image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=700&q=80",
    description: "Sun-ripened, pesticide-free fresh strawberries harvested at dawn from our family-run eco farm. Bursting with sweet natural aroma.",
    vendorStory: "Sunbeam Farm uses regenerative agriculture practices and natural organic compost."
  },
  {
    id: 3,
    title: "Raw Wildflower Honeycomb Jar",
    vendor: "Hometown Apiary & Honey",
    category: "pantry",
    price: 450.00,
    unit: "500g jar",
    stock: 8,
    rating: 4.8,
    reviewsCount: 29,
    badge: "best",
    badgeText: "Best Seller",
    distance: "4.1 km",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=700&q=80",
    description: "Unfiltered, unpasteurized honey harvested straight from local floral meadows, featuring a generous slice of edible raw honeycomb.",
    vendorStory: "Third-generation local beekeepers preserving native pollinators across regional reserves."
  },
  {
    id: 4,
    title: "Hand-Thrown Ceramic Coffee Mug",
    vendor: "Copper & Clay Pottery",
    category: "crafts",
    price: 499.00,
    unit: "350ml mug",
    stock: 6,
    rating: 4.9,
    reviewsCount: 19,
    badge: "artisan",
    badgeText: "Handmade",
    distance: "0.8 km",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=700&q=80",
    description: "Hand-thrown stoneware mug dipped in a custom sage green and speckled iron glaze. Microwave and dishwasher safe.",
    vendorStory: "Ceramic artist Maya crafts small-batch functional tableware in her community studio."
  },
  {
    id: 5,
    title: "Cold-Pressed Herb Infused Olive & Mustard Oil",
    vendor: "Valley View Grove",
    category: "pantry",
    price: 380.00,
    unit: "500ml bottle",
    stock: 12,
    rating: 4.7,
    reviewsCount: 22,
    badge: "organic",
    badgeText: "Single-Estate",
    distance: "5.2 km",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=700&q=80",
    description: "Extra virgin cold-pressed oil steeped with freshly picked local rosemary, mountain thyme, and roasted garlic cloves.",
    vendorStory: "Estate-grown crops nurtured under sustainable irrigation in the sun-drenched foothills."
  },
  {
    id: 6,
    title: "Organic Rainbow Baby Carrots",
    vendor: "Sunbeam Organic Farm",
    category: "produce",
    price: 60.00,
    unit: "per bunch (500g)",
    stock: 25,
    rating: 4.8,
    reviewsCount: 31,
    badge: "organic",
    badgeText: "Crisp & Sweet",
    distance: "3.5 km",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=700&q=80",
    description: "Vibrant yellow, purple, and orange heritage carrots washed and bunched with leafy greens intact. Crisp and sweet.",
    vendorStory: "Freshly pulled from rich soil, delivered to TownSquare within 6 hours of harvest."
  },
  {
    id: 7,
    title: "French Butter Croissants (Pack of 4)",
    vendor: "Mama Rosa's Hearth Bakery",
    category: "bakery",
    price: 240.00,
    unit: "4-pack box",
    stock: 15,
    rating: 5.0,
    reviewsCount: 44,
    badge: "best",
    badgeText: "Daily Special",
    distance: "1.2 km",
    image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=700&q=80",
    description: "Laminated over three days with 100% cultured pure butter for unforgettable flaky honeycomb pockets. Baked fresh at 5 AM daily.",
    vendorStory: "Authentic pastry made following classical lamination methods with zero artificial preservatives."
  },
  {
    id: 8,
    title: "Lavender & Oat Gentle Goat Milk Soap",
    vendor: "Willow Creek Herbals",
    category: "living",
    price: 199.00,
    unit: "125g bar",
    stock: 18,
    rating: 4.9,
    reviewsCount: 26,
    badge: "artisan",
    badgeText: "Chemical Free",
    distance: "2.1 km",
    image: "https://images.unsplash.com/photo-1607006310452-9b2f2939634e?auto=format&fit=crop&w=700&q=80",
    description: "Cold-processed botanical bar soap crafted with raw farm goat milk, colloidal oats, and pure lavender essential oils.",
    vendorStory: "Handmade on a family homestead dedicated to herbal wellness and zero-waste packaging."
  },
  {
    id: 9,
    title: "Hand-Poured Soy Amber Candle",
    vendor: "Amber & Ember Goods",
    category: "living",
    price: 450.00,
    unit: "200g jar",
    stock: 9,
    rating: 4.8,
    reviewsCount: 35,
    badge: "vegan",
    badgeText: "Eco Soy",
    distance: "1.5 km",
    image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=700&q=80",
    description: "100% natural soy wax infused with cedarwood, vanilla, and bergamot with a crackling wooden wick. 40+ hours clean burn.",
    vendorStory: "Small batch home fragrance studio operating right in the city craft district."
  },
  {
    id: 10,
    title: "Small-Batch Blackberry Preserves Jam",
    vendor: "Valley View Grove",
    category: "pantry",
    price: 220.00,
    unit: "250g jar",
    stock: 16,
    rating: 4.9,
    reviewsCount: 18,
    badge: "artisan",
    badgeText: "Low Sugar",
    distance: "5.2 km",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=700&q=80",
    description: "Wild hill blackberries simmered in copper kettles with organic cane sugar. Sublime with warm rotis and toasted sourdough.",
    vendorStory: "Cooked in batches of only 20 jars to preserve whole fruit texture and bright tartness."
  },
  {
    id: 11,
    title: "Woven Cotton Market Tote Bag",
    vendor: "Copper & Clay Pottery",
    category: "crafts",
    price: 299.00,
    unit: "each",
    stock: 20,
    rating: 4.7,
    reviewsCount: 14,
    badge: "artisan",
    badgeText: "Sustainable",
    distance: "0.8 km",
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=80",
    description: "Heavyweight 12oz unbleached organic cotton canvas tote with double reinforced handles and screen-printed botanical motif.",
    vendorStory: "Screenprinted with eco-friendly water-based inks on certified organic cotton canvas."
  },
  {
    id: 12,
    title: "Heirloom Vine-Ripened Cherry Tomatoes",
    vendor: "Sunbeam Organic Farm",
    category: "produce",
    price: 80.00,
    unit: "250g pack",
    stock: 30,
    rating: 4.9,
    reviewsCount: 27,
    badge: "organic",
    badgeText: "Farm Fresh",
    distance: "3.5 km",
    image: "https://images.unsplash.com/photo-1546470427-e26264be0b11?auto=format&fit=crop&w=700&q=80",
    description: "Assorted sweet cherry tomatoes picked fresh on the vine with intensely sweet, candy-like natural flavor.",
    vendorStory: "Grown without synthetic pesticides in open greenhouse polyhouses."
  }
];

const DEFAULT_VENDORS = [
  {
    id: "mama-rosa",
    name: "Mama Rosa's Hearth Bakery",
    category: "Artisan Bakery",
    badge: "Master Baker",
    avatar: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80",
    banner: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80",
    location: "West End Market Stall #4",
    distance: "1.2 miles",
    rating: 4.9,
    reviews: 142,
    status: "Verified",
    ordersCompleted: 268,
    bio: "Baking traditional sourdoughs, golden croissants, and focaccia since 2010. We use stoneground heritage grain and zero artificial dough conditioners.",
    specialties: ["Sourdough", "French Pastries", "Artisan Focaccia", "Gluten-Friendly Bakes"]
  },
  {
    id: "sunbeam-farm",
    name: "Sunbeam Organic Farm",
    category: "Organic Produce",
    badge: "Certified Organic",
    avatar: "https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=300&q=80",
    banner: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    location: "Riverdale Eco Valley",
    distance: "3.5 miles",
    rating: 5.0,
    reviews: 215,
    status: "Verified",
    ordersCompleted: 340,
    bio: "Family-run regenerative farm supplying our neighborhood with fresh strawberries, heirloom tomatoes, microgreens, and crisp root vegetables.",
    specialties: ["Heirloom Berries", "Baby Carrots", "Microgreens", "Seasonal Greens"]
  },
  {
    id: "hometown-honey",
    name: "Hometown Apiary & Honey",
    category: "Beekeeping & Pantry",
    badge: "Raw & Unfiltered",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    banner: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=800&q=80",
    location: "Pine Hill Orchards",
    distance: "4.1 miles",
    rating: 4.8,
    reviews: 88,
    status: "Verified",
    ordersCompleted: 112,
    bio: "Ethical beekeepers caring for over 60 pollinator hives across native meadows. Pure raw honey, honeycomb, propolis, and beeswax balms.",
    specialties: ["Raw Honeycomb", "Clover Honey", "Beeswax Candles", "Pollen Flakes"]
  },
  {
    id: "copper-clay",
    name: "Copper & Clay Pottery",
    category: "Handmade Crafts",
    badge: "Local Artisan",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80",
    banner: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80",
    location: "Downtown Arts District",
    distance: "0.8 miles",
    rating: 4.9,
    reviews: 64,
    status: "Verified",
    ordersCompleted: 94,
    bio: "Independent potter creating functional tableware, mugs, and plant pots inspired by natural geological textures and earth tones.",
    specialties: ["Ceramic Mugs", "Pasta Bowls", "Planters", "Screenprinted Totes"]
  },
  {
    id: "valley-view",
    name: "Valley View Grove & Preserves",
    category: "Pantry & Preserves",
    badge: "Small-Batch",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    banner: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
    location: "Sunny Ridge Foothills",
    distance: "5.2 miles",
    rating: 4.7,
    reviews: 53,
    status: "Verified",
    ordersCompleted: 78,
    bio: "Specializing in cold-pressed olive oils, balsamic reductions, and copper kettle fruit preserves made from heirloom orchards.",
    specialties: ["Infused Olive Oil", "Artisan Jams", "Apple Cider Vinegar", "Pickled Veggies"]
  },
  {
    id: "willow-creek",
    name: "Willow Creek Herbals",
    category: "Home & Wellness",
    badge: "Eco Homestead",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    banner: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80",
    location: "North Hills Homestead",
    distance: "2.1 miles",
    rating: 4.9,
    reviews: 79,
    status: "Verified",
    ordersCompleted: 85,
    bio: "Farmstead wellness products created from fresh goat milk, hand-harvested lavender, and pure botanical botanicals with zero synthetic fragrances.",
    specialties: ["Goat Milk Soap", "Herbal Salves", "Bath Soaks", "Lip Balms"]
  }
];

// Initial Seed Orders
const DEFAULT_ORDERS = [
  {
    id: "TS-1081",
    customerName: "Aarav Sharma",
    customerPhone: "+91 98765 43210",
    address: "Flat 402, Green Valley Apartments, Model Town",
    date: "2026-11-04 08:30 AM",
    items: [
      { id: 1, title: "Woodfired Sourdough Batard", qty: 2, price: 180.00 },
      { id: 2, title: "Fresh Handpicked Heirloom Strawberries", qty: 1, price: 160.00 }
    ],
    subtotal: 520.00,
    discount: 52.00,
    delivery: 0.00,
    total: 468.00,
    paymentMethod: "UPI / QR Code",
    paymentStatus: "Paid",
    status: "Out for Delivery",
    courier: "Vikram (Eco Bike Courier #12)",
    courierPhone: "+91 98111 22334",
    estimatedArrival: "Within 25 mins"
  },
  {
    id: "TS-1080",
    customerName: "Priya Patel",
    customerPhone: "+91 98222 33445",
    address: "House 18, Lake View Road, Phase 2",
    date: "2026-11-04 07:15 AM",
    items: [
      { id: 3, title: "Raw Wildflower Honeycomb Jar", qty: 1, price: 450.00 },
      { id: 5, title: "Cold-Pressed Herb Infused Olive & Mustard Oil", qty: 1, price: 380.00 }
    ],
    subtotal: 830.00,
    discount: 0.00,
    delivery: 0.00,
    total: 830.00,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    status: "Delivered",
    courier: "Sameer (Electric Van #4)",
    courierPhone: "+91 98333 44556",
    estimatedArrival: "Delivered at 08:45 AM"
  },
  {
    id: "TS-1079",
    customerName: "Rohan Verma",
    customerPhone: "+91 98444 55667",
    address: "Block C-12, Arts Studio Colony",
    date: "2026-11-03 04:50 PM",
    items: [
      { id: 4, title: "Hand-Thrown Ceramic Coffee Mug", qty: 2, price: 499.00 }
    ],
    subtotal: 998.00,
    discount: 50.00,
    delivery: 0.00,
    total: 948.00,
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Preparing Order",
    courier: "Assigning Courier",
    courierPhone: "Pending",
    estimatedArrival: "Today, by 12:30 PM"
  }
];

const ACTIVE_PROMOS = {
  "LOCALLOVE10": { type: "percent", value: 10, label: "10% Off Neighborhood Special" },
  "FREESHIP": { type: "shipping", value: 49.00, label: "Free Local Courier Delivery" },
  "WELCOME20": { type: "flat", value: 50.00, label: "₹50 Off Community Welcome Gift" }
};

// Demo One-Tap Accounts for Customer, Admin, and Vendor
const DEMO_ACCOUNTS = {
  customer: {
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    phone: "+91 98765 43210",
    address: "Flat 402, Green Valley Apartments, Model Town",
    role: "customer",
    roleLabel: "Customer",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
  },
  admin: {
    name: "Market Administrator",
    email: "admin@townsquare.in",
    phone: "+91 98000 00000",
    address: "TownSquare Headquarters, Suite 102",
    role: "admin",
    roleLabel: "Admin",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80"
  },
  vendor: {
    name: "Mama Rosa",
    email: "rosa@hearthbakery.in",
    phone: "+91 98111 22334",
    address: "West End Market Stall #4",
    role: "vendor",
    roleLabel: "Vendor",
    stall: "Mama Rosa's Hearth Bakery",
    avatar: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=150&q=80"
  }
};

// ==========================================================================
// Centralized Data & State Store
// ==========================================================================

class MarketStore {
  constructor() {
    this.products = this.loadData('townsquare_products_v2', DEFAULT_PRODUCTS);
    this.vendors = this.loadData('townsquare_vendors', DEFAULT_VENDORS);
    this.orders = this.loadData('townsquare_orders_v2', DEFAULT_ORDERS);
    this.cart = this.loadData('townsquare_cart', []);
    this.wishlist = this.loadData('townsquare_wishlist', []);
    this.comparisonList = this.loadData('townsquare_comparison', []);
    this.appliedPromo = this.loadData('townsquare_applied_promo', null);
    this.currentUser = this.loadData('townsquare_user', null);
    this.oneTapDismissed = sessionStorage.getItem('townsquare_onetap_dismissed') === 'true';
  }

  // One-Tap Authentication System
  loginAs(roleKey, customName = null) {
    let account = DEMO_ACCOUNTS[roleKey] ? { ...DEMO_ACCOUNTS[roleKey] } : { ...DEMO_ACCOUNTS.customer };
    if (customName && customName.trim()) {
      account.name = customName.trim();
      account.email = `${customName.toLowerCase().replace(/[^a-z0-9]/g, '')}@localmail.in`;
    }
    this.currentUser = account;
    this.saveData('townsquare_user', this.currentUser);
    this.renderAuthUI();
    showToast(`Logged in as ${account.name} (${account.roleLabel})!`, "toast-success", account.role === 'admin' ? "🛡️" : "👤");

    // Pre-fill checkout form if open
    const nameInput = document.getElementById('checkoutName');
    const phoneInput = document.getElementById('checkoutPhone');
    const addrInput = document.getElementById('checkoutAddress');
    if (nameInput) nameInput.value = account.name;
    if (phoneInput && account.phone) phoneInput.value = account.phone;
    if (addrInput && account.address) addrInput.value = account.address;
  }

  logout() {
    this.currentUser = null;
    this.saveData('townsquare_user', null);
    this.renderAuthUI();
    showToast("Signed out of TownSquare.", "toast-info", "👋");
  }

  renderAuthUI() {
    const slots = document.querySelectorAll('.auth-nav-slot');
    const user = this.currentUser;

    slots.forEach(slot => {
      if (!user) {
        slot.innerHTML = `
          <button class="btn btn-outline btn-sm open-auth-btn" style="font-size:0.8rem; padding:0.45rem 0.85rem; border-radius:var(--radius-full);">
            👤 Sign In
          </button>
        `;
      } else {
        slot.innerHTML = `
          <div class="user-nav-wrapper">
            <div class="user-nav-profile user-profile-toggle">
              <img src="${user.avatar}" alt="${user.name}" class="user-nav-avatar">
              <span class="user-nav-name">${user.name.split(' ')[0]}</span>
              <span class="user-role-pill role-${user.role}">${user.role}</span>
              <span style="font-size:0.7rem; color:var(--text-light);">▾</span>
            </div>

            <div class="user-nav-dropdown">
              <div class="user-nav-dropdown-header">
                <div class="user-dropdown-name">${user.name}</div>
                <div class="user-dropdown-email">${user.email}</div>
              </div>

              ${user.role === 'admin' ? `
                <a href="dashboard.html" class="user-dropdown-item">
                  <span>🛡️</span> Admin Dashboard
                </a>
              ` : `
                <button class="user-dropdown-item switch-role-btn" data-role="admin">
                  <span>🛡️</span> 1-Tap Switch to Admin
                </button>
              `}

              ${user.role !== 'customer' ? `
                <button class="user-dropdown-item switch-role-btn" data-role="customer">
                  <span>👤</span> 1-Tap Switch to Customer
                </button>
              ` : ''}

              <button class="user-dropdown-item track-orders-nav-btn">
                <span>📦</span> Track My Orders
              </button>

              <button class="user-dropdown-item signout user-signout-btn">
                <span>🚪</span> Sign Out
              </button>
            </div>
          </div>
        `;
      }
    });

    // Attach listeners
    document.querySelectorAll('.open-auth-btn').forEach(btn => {
      btn.addEventListener('click', openAuthModal);
    });

    document.querySelectorAll('.user-profile-toggle').forEach(toggle => {
      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const dropdown = toggle.nextElementSibling;
        if (dropdown) dropdown.classList.toggle('show');
      });
    });

    document.querySelectorAll('.switch-role-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        this.loginAs(btn.dataset.role);
        document.querySelectorAll('.user-nav-dropdown').forEach(d => d.classList.remove('show'));
      });
    });

    document.querySelectorAll('.track-orders-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openOrderTrackingModal();
        document.querySelectorAll('.user-nav-dropdown').forEach(d => d.classList.remove('show'));
      });
    });

    document.querySelectorAll('.user-signout-btn').forEach(btn => {
      btn.addEventListener('click', () => this.logout());
    });

    // Floating widget visibility
    const floatingWidget = document.getElementById('googleOneTapPrompt');
    if (floatingWidget) {
      if (!user && !this.oneTapDismissed) {
        floatingWidget.style.display = 'flex';
      } else {
        floatingWidget.style.display = 'none';
      }
    }
  }

  loadData(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  saveData(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error saving ${key}:`, e);
    }
  }

  // Products & Inventory Management
  saveProducts() {
    this.saveData('townsquare_products_v2', this.products);
  }

  addProduct(productData) {
    const newId = this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    const newProd = {
      id: newId,
      title: productData.title,
      vendor: productData.vendor,
      category: productData.category,
      price: parseFloat(productData.price) || 0,
      unit: productData.unit || "per item",
      stock: parseInt(productData.stock) || 10,
      rating: 5.0,
      reviewsCount: 1,
      badge: productData.badge || "artisan",
      badgeText: productData.badgeText || "Local Fresh",
      distance: productData.distance || "1.0 miles",
      image: productData.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=700&q=80",
      description: productData.description || "Fresh local handmade specialty.",
      vendorStory: productData.vendorStory || "Crafted with passion by a neighborhood creator."
    };
    this.products.unshift(newProd);
    this.saveProducts();
    return newProd;
  }

  updateStock(productId, newStock) {
    const p = this.products.find(item => item.id === parseInt(productId));
    if (p) {
      p.stock = Math.max(0, parseInt(newStock));
      this.saveProducts();
    }
  }

  deleteProduct(productId) {
    this.products = this.products.filter(item => item.id !== parseInt(productId));
    this.saveProducts();
  }

  // Vendors
  saveVendors() {
    this.saveData('townsquare_vendors', this.vendors);
  }

  addVendor(vendorData) {
    const newId = vendorData.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newVendor = {
      id: newId,
      name: vendorData.name,
      category: vendorData.category,
      badge: "Pending Review",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      banner: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
      location: vendorData.region || "Local District",
      distance: "2.0 miles",
      rating: 5.0,
      reviews: 0,
      status: "Active",
      ordersCompleted: 0,
      bio: vendorData.story,
      specialties: [vendorData.category, "Small-Batch", "Local Seller"]
    };
    this.vendors.unshift(newVendor);
    this.saveVendors();
    return newVendor;
  }

  // Orders Management
  saveOrders() {
    this.saveData('townsquare_orders_v2', this.orders);
  }

  createOrder(orderData) {
    const orderId = "TS-" + (Math.floor(1000 + Math.random() * 9000));
    const newOrder = {
      id: orderId,
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      address: orderData.address,
      date: new Date().toLocaleString(),
      items: [...this.cart],
      subtotal: this.getCartSubtotal(),
      discount: orderData.discount || 0,
      delivery: orderData.deliveryFee || 0,
      total: orderData.total || this.getCartSubtotal(),
      paymentMethod: orderData.paymentMethod || "Digital UPI",
      paymentStatus: orderData.paymentMethod === "Cash on Delivery" ? "Pending" : "Paid",
      status: "Order Confirmed",
      courier: "Local Bike Courier #07",
      courierPhone: "+91 98700 11223",
      estimatedArrival: "Within 45-60 mins"
    };

    // Deduct stock for each item ordered
    this.cart.forEach(cartItem => {
      const prod = this.products.find(p => p.id === cartItem.id);
      if (prod) {
        prod.stock = Math.max(0, prod.stock - cartItem.qty);
      }
    });
    this.saveProducts();

    this.orders.unshift(newOrder);
    this.saveOrders();

    // Clear cart and promo
    this.cart = [];
    this.appliedPromo = null;
    this.saveCart();
    this.saveData('townsquare_applied_promo', null);

    return newOrder;
  }

  updateOrderStatus(orderId, newStatus) {
    const ord = this.orders.find(o => o.id === orderId);
    if (ord) {
      ord.status = newStatus;
      this.saveOrders();
    }
  }

  // Cart Handlers
  saveCart() {
    this.saveData('townsquare_cart', this.cart);
    this.updateBadges();
    this.renderCartDrawer();
  }

  addToCart(productId, qty = 1) {
    const prod = this.products.find(p => p.id === parseInt(productId));
    if (!prod) return;

    if (prod.stock <= 0) {
      showToast(`Sorry, "${prod.title}" is currently out of stock.`, "toast-info", "⚠️");
      return;
    }

    const existingIndex = this.cart.findIndex(item => item.id === prod.id);
    if (existingIndex > -1) {
      if (this.cart[existingIndex].qty + qty > prod.stock) {
        showToast(`Only ${prod.stock} units available in stock.`, "toast-info", "⚠️");
        this.cart[existingIndex].qty = prod.stock;
      } else {
        this.cart[existingIndex].qty += qty;
      }
    } else {
      this.cart.push({
        id: prod.id,
        title: prod.title,
        vendor: prod.vendor,
        price: prod.price,
        unit: prod.unit,
        image: prod.image,
        qty: Math.min(qty, prod.stock)
      });
    }

    this.saveCart();
    showToast(`Added "${prod.title}" to your basket!`, "toast-success", "🛒");

    const badge = document.querySelector('.header-cart-badge');
    if (badge) {
      badge.classList.remove('cart-bounce');
      void badge.offsetWidth;
      badge.classList.add('cart-bounce');
    }
  }

  removeFromCart(productId) {
    const item = this.cart.find(i => i.id === parseInt(productId));
    this.cart = this.cart.filter(item => item.id !== parseInt(productId));
    this.saveCart();
    if (item) {
      showToast(`Removed "${item.title}" from basket.`, "toast-info", "🗑️");
    }
  }

  updateQuantity(productId, delta) {
    const item = this.cart.find(i => i.id === parseInt(productId));
    const prod = this.products.find(p => p.id === parseInt(productId));
    if (!item) return;

    const targetQty = item.qty + delta;
    if (targetQty <= 0) {
      this.removeFromCart(productId);
      return;
    }

    if (prod && targetQty > prod.stock) {
      showToast(`Only ${prod.stock} items left in stall inventory.`, "toast-info", "⚠️");
      return;
    }

    item.qty = targetQty;
    this.saveCart();
  }

  applyPromoCode(code) {
    const cleanCode = code.trim().toUpperCase();
    if (ACTIVE_PROMOS[cleanCode]) {
      this.appliedPromo = { code: cleanCode, ...ACTIVE_PROMOS[cleanCode] };
      this.saveData('townsquare_applied_promo', this.appliedPromo);
      this.saveCart();
      showToast(`Promo applied: ${this.appliedPromo.label}!`, "toast-success", "🏷️");
      return true;
    } else {
      showToast(`Invalid promo coupon. Try "LOCALLOVE10" or "FREESHIP"`, "toast-info", "⚠️");
      return false;
    }
  }

  removePromoCode() {
    this.appliedPromo = null;
    this.saveData('townsquare_applied_promo', null);
    this.saveCart();
    showToast(`Promo code removed.`, "toast-info", "🏷️");
  }

  getCartTotalCount() {
    return this.cart.reduce((total, item) => total + item.qty, 0);
  }

  getCartSubtotal() {
    return this.cart.reduce((total, item) => total + (item.price * item.qty), 0);
  }

  calculateCheckoutSummary() {
    const subtotal = this.getCartSubtotal();
    let deliveryFee = subtotal >= 499 || subtotal === 0 ? 0.00 : 49.00;
    let discount = 0;

    if (this.appliedPromo && subtotal > 0) {
      if (this.appliedPromo.type === 'percent') {
        discount = (subtotal * this.appliedPromo.value) / 100;
      } else if (this.appliedPromo.type === 'shipping') {
        deliveryFee = 0.00;
        discount = 49.00;
      } else if (this.appliedPromo.type === 'flat') {
        discount = Math.min(subtotal, this.appliedPromo.value);
      }
    }

    const finalTotal = Math.max(0, subtotal + deliveryFee - (this.appliedPromo?.type === 'shipping' ? 0 : discount));

    return {
      subtotal,
      deliveryFee,
      discount,
      finalTotal
    };
  }

  // Wishlist Handlers
  saveWishlist() {
    this.saveData('townsquare_wishlist', this.wishlist);
    this.updateBadges();
  }

  toggleWishlist(productId) {
    const id = parseInt(productId);
    const prod = this.products.find(p => p.id === id);
    const index = this.wishlist.indexOf(id);

    if (index > -1) {
      this.wishlist.splice(index, 1);
      showToast(`Removed from saved favorites.`, "toast-info", "🤍");
    } else {
      this.wishlist.push(id);
      showToast(`Saved "${prod ? prod.title : 'item'}" to your favorites!`, "toast-heart", "❤️");
    }

    this.saveWishlist();
    document.querySelectorAll(`.btn-wishlist[data-id="${id}"]`).forEach(btn => {
      btn.classList.toggle('active', this.wishlist.includes(id));
      btn.innerHTML = this.wishlist.includes(id) ? '❤️' : '🤍';
    });
  }

  isWishlisted(productId) {
    return this.wishlist.includes(parseInt(productId));
  }

  // Price & Quality Comparison Handlers
  toggleComparison(productId) {
    const id = parseInt(productId);
    const prod = this.products.find(p => p.id === id);
    const index = this.comparisonList.indexOf(id);

    if (index > -1) {
      this.comparisonList.splice(index, 1);
      showToast(`Removed from comparison.`, "toast-info", "⚖️");
    } else {
      if (this.comparisonList.length >= 3) {
        showToast(`You can compare up to 3 items at a time.`, "toast-info", "⚖️");
        return;
      }
      this.comparisonList.push(id);
      showToast(`Added "${prod ? prod.title : 'item'}" to comparison table!`, "toast-success", "⚖️");
    }

    this.saveData('townsquare_comparison', this.comparisonList);
    this.updateComparisonPill();
  }

  updateComparisonPill() {
    const pill = document.getElementById('comparisonFloatPill');
    const countEl = document.getElementById('comparisonCount');
    if (pill && countEl) {
      countEl.textContent = this.comparisonList.length;
      pill.style.display = this.comparisonList.length > 0 ? 'inline-flex' : 'none';
    }
  }

  // Reviews System
  addReview(productId, reviewData) {
    const prod = this.products.find(p => p.id === parseInt(productId));
    if (!prod) return;

    prod.reviewsCount = (prod.reviewsCount || 0) + 1;
    const newRating = ((prod.rating * (prod.reviewsCount - 1)) + reviewData.rating) / prod.reviewsCount;
    prod.rating = parseFloat(newRating.toFixed(1));
    this.saveProducts();
    showToast(`Thank you! Your verified feedback was posted for "${prod.title}".`, "toast-success", "⭐");
  }

  // Update Header Badges
  updateBadges() {
    const cartBadges = document.querySelectorAll('.header-cart-badge');
    const count = this.getCartTotalCount();
    cartBadges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'inline-flex' : 'none';
    });

    const wishBadges = document.querySelectorAll('.header-wishlist-badge');
    const wishCount = this.wishlist.length;
    wishBadges.forEach(b => {
      b.textContent = wishCount;
      b.style.display = wishCount > 0 ? 'inline-flex' : 'none';
    });
  }

  // Slide-out Cart Renderer
  renderCartDrawer() {
    const container = document.getElementById('cartItemsContainer');
    const subtotalEl = document.getElementById('cartSubtotal');
    const deliveryEl = document.getElementById('cartDelivery');
    const discountRow = document.getElementById('cartDiscountRow');
    const discountEl = document.getElementById('cartDiscount');
    const totalEl = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('cartCheckoutBtn');
    const promoWrap = document.getElementById('cartPromoWrap');

    if (!container) return;

    if (this.cart.length === 0) {
      container.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">🧺</div>
          <h4 style="margin-bottom: 0.5rem; font-weight: 700;">Your basket is empty</h4>
          <p style="color: var(--text-muted); font-size: 0.875rem; margin-bottom: 1.5rem;">Explore artisan treats, fresh organic produce, and handmade goods from neighborhood sellers!</p>
          <a href="shop.html" class="btn btn-primary btn-sm close-cart-link">Browse Marketplace</a>
        </div>
      `;
      if (subtotalEl) subtotalEl.textContent = '₹0';
      if (deliveryEl) deliveryEl.textContent = '₹0';
      if (discountRow) discountRow.style.display = 'none';
      if (totalEl) totalEl.textContent = '₹0';
      if (checkoutBtn) {
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = '0.6';
      }
      return;
    }

    const { subtotal, deliveryFee, discount, finalTotal } = this.calculateCheckoutSummary();

    if (subtotalEl) subtotalEl.textContent = `₹${subtotal.toFixed(2)}`;
    if (deliveryEl) deliveryEl.textContent = deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`;

    if (discountRow && discountEl) {
      if (discount > 0) {
        discountRow.style.display = 'flex';
        discountEl.textContent = `-₹${discount.toFixed(2)}`;
      } else {
        discountRow.style.display = 'none';
      }
    }

    if (totalEl) totalEl.textContent = `₹${finalTotal.toFixed(2)}`;
    if (checkoutBtn) {
      checkoutBtn.disabled = false;
      checkoutBtn.style.opacity = '1';
    }

    // Render Promo Box
    if (promoWrap) {
      if (this.appliedPromo) {
        promoWrap.innerHTML = `
          <div style="background:#d8f3dc; border:1px solid var(--primary-light); padding:0.5rem 0.85rem; border-radius:var(--radius-sm); display:flex; align-items:center; justify-content:space-between; font-size:0.8rem; margin-bottom:1rem;">
            <span>🏷️ <strong>${this.appliedPromo.code}</strong> applied (${this.appliedPromo.label})</span>
            <button id="removePromoBtn" style="color:#e63946; font-weight:700; cursor:pointer;">✕</button>
          </div>
        `;
        document.getElementById('removePromoBtn')?.addEventListener('click', () => this.removePromoCode());
      } else {
        promoWrap.innerHTML = `
          <div style="display:flex; gap:0.5rem; margin-bottom:1rem;">
            <input type="text" id="promoCodeInput" placeholder="Promo code (e.g. LOCALLOVE10)" style="flex-grow:1; padding:0.45rem 0.75rem; font-size:0.8rem; border:1px solid var(--border); border-radius:var(--radius-sm); text-transform:uppercase;">
            <button id="applyPromoBtn" class="btn btn-outline btn-sm" style="padding:0.45rem 0.85rem; font-size:0.8rem;">Apply</button>
          </div>
        `;
        document.getElementById('applyPromoBtn')?.addEventListener('click', () => {
          const input = document.getElementById('promoCodeInput');
          if (input && input.value) {
            this.applyPromoCode(input.value);
          }
        });
      }
    }

    let html = '';
    this.cart.forEach(item => {
      const lineTotal = (item.price * item.qty).toFixed(2);
      html += `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.title}" class="cart-item-img">
          <div class="cart-item-info">
            <span class="cart-item-vendor">${item.vendor}</span>
            <h5 class="cart-item-title">${item.title}</h5>
            <span class="cart-item-price">₹${item.price.toFixed(2)} / each</span>
          </div>
          <div class="cart-item-actions">
            <div class="cart-qty-ctrl">
              <button class="cart-qty-btn cart-minus-btn" data-id="${item.id}" aria-label="Decrease quantity">−</button>
              <span class="cart-qty-val">${item.qty}</span>
              <button class="cart-qty-btn cart-plus-btn" data-id="${item.id}" aria-label="Increase quantity">+</button>
            </div>
            <span style="font-weight:700; font-size:0.85rem;">₹${lineTotal}</span>
            <button class="cart-remove-btn" data-id="${item.id}">Remove</button>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    container.querySelectorAll('.cart-plus-btn').forEach(btn => {
      btn.addEventListener('click', () => this.updateQuantity(btn.dataset.id, 1));
    });

    container.querySelectorAll('.cart-minus-btn').forEach(btn => {
      btn.addEventListener('click', () => this.updateQuantity(btn.dataset.id, -1));
    });

    container.querySelectorAll('.cart-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => this.removeFromCart(btn.dataset.id));
    });

    container.querySelectorAll('.close-cart-link').forEach(link => {
      link.addEventListener('click', () => closeCartDrawer());
    });
  }
}

// Global Store Instance
const marketStore = new MarketStore();
// Expose products list for external modules
let MARKET_PRODUCTS = marketStore.products;
let MARKET_VENDORS = marketStore.vendors;

// ==========================================================================
// Toast Notification System
// ==========================================================================

function showToast(message, type = 'toast-success', icon = '✓') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span style="font-size:1.15rem;">${icon}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 20);

  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

// ==========================================================================
// Drawer & Modal Controls
// ==========================================================================

function openCartDrawer() {
  const overlay = document.getElementById('cartDrawerOverlay');
  if (overlay) {
    marketStore.renderCartDrawer();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeCartDrawer() {
  const overlay = document.getElementById('cartDrawerOverlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function openQuickView(productId) {
  const prod = marketStore.products.find(p => p.id === parseInt(productId));
  if (!prod) return;

  const modalOverlay = document.getElementById('quickViewModal');
  if (!modalOverlay) return;

  const imgEl = modalOverlay.querySelector('.modal-img');
  const vendorEl = modalOverlay.querySelector('.modal-vendor-tag');
  const titleEl = modalOverlay.querySelector('.modal-title');
  const priceEl = modalOverlay.querySelector('.modal-price');
  const unitEl = modalOverlay.querySelector('.modal-unit');
  const ratingEl = modalOverlay.querySelector('.modal-rating-text');
  const descEl = modalOverlay.querySelector('.modal-description');
  const storyEl = modalOverlay.querySelector('.modal-vendor-story-text');
  const addBtn = modalOverlay.querySelector('.modal-add-btn');
  const qtyInput = modalOverlay.querySelector('.modal-qty-val');
  const stockEl = modalOverlay.querySelector('.modal-stock-tag');

  if (imgEl) imgEl.src = prod.image;
  if (vendorEl) vendorEl.textContent = `📍 Stall: ${prod.vendor} • ${prod.distance}`;
  if (titleEl) titleEl.textContent = prod.title;
  if (priceEl) priceEl.textContent = `₹${prod.price.toFixed(2)}`;
  if (unitEl) unitEl.textContent = prod.unit;
  if (ratingEl) ratingEl.innerHTML = `★ ${prod.rating} <span style="color:var(--text-light); font-weight:400;">(${prod.reviewsCount} verified reviews)</span>`;
  if (descEl) descEl.textContent = prod.description;
  if (storyEl) storyEl.textContent = prod.vendorStory;

  if (stockEl) {
    if (prod.stock <= 0) {
      stockEl.textContent = "Out of Stock";
      stockEl.style.color = "#dc2626";
    } else if (prod.stock < 10) {
      stockEl.textContent = `⚡ Only ${prod.stock} units left in stall!`;
      stockEl.style.color = "#d97706";
    } else {
      stockEl.textContent = `✓ In Stock (${prod.stock} available)`;
      stockEl.style.color = "var(--primary)";
    }
  }

  if (qtyInput) qtyInput.textContent = '1';

  if (addBtn) {
    addBtn.disabled = prod.stock <= 0;
    addBtn.textContent = prod.stock <= 0 ? 'Out of Stock' : 'Add to Basket 🛒';
    addBtn.onclick = () => {
      const q = parseInt(qtyInput ? qtyInput.textContent : '1') || 1;
      marketStore.addToCart(prod.id, q);
      modalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    };
  }

  // Hook up Review submission inside modal
  const reviewForm = modalOverlay.querySelector('#modalReviewForm');
  if (reviewForm) {
    reviewForm.onsubmit = (e) => {
      e.preventDefault();
      const stars = parseInt(reviewForm.querySelector('select[name="rating"]')?.value || '5');
      const comment = reviewForm.querySelector('textarea[name="comment"]')?.value || '';
      marketStore.addReview(prod.id, { rating: stars, comment });
      reviewForm.reset();
      openQuickView(prod.id); // re-render updated rating
    };
  }

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modalOverlay = document.getElementById('quickViewModal');
  if (modalOverlay) {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Digital Payment & Checkout Modal
function openCheckoutModal() {
  closeCartDrawer();
  const modal = document.getElementById('checkoutModal');
  if (!modal) return;

  const { subtotal, deliveryFee, discount, finalTotal } = marketStore.calculateCheckoutSummary();

  document.getElementById('checkoutSummarySubtotal').textContent = `₹${subtotal.toFixed(2)}`;
  document.getElementById('checkoutSummaryDelivery').textContent = deliveryFee === 0 ? 'FREE' : `₹${deliveryFee.toFixed(2)}`;
  document.getElementById('checkoutSummaryDiscount').textContent = `-₹${discount.toFixed(2)}`;
  document.getElementById('checkoutSummaryTotal').textContent = `₹${finalTotal.toFixed(2)}`;

  // Auto-fill user credentials if logged in
  const user = marketStore.currentUser;
  if (user) {
    const nameInput = document.getElementById('checkoutName');
    const phoneInput = document.getElementById('checkoutPhone');
    const addrInput = document.getElementById('checkoutAddress');
    if (nameInput) nameInput.value = user.name;
    if (phoneInput && user.phone) phoneInput.value = user.phone;
    if (addrInput && user.address) addrInput.value = user.address;
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Order Tracking Modal
function openOrderTrackingModal(orderId) {
  const modal = document.getElementById('orderTrackingModal');
  if (!modal) return;

  const orders = marketStore.orders;
  let targetOrder = null;

  if (orderId) {
    targetOrder = orders.find(o => o.id.toUpperCase() === orderId.toUpperCase().trim());
  } else if (orders.length > 0) {
    targetOrder = orders[0]; // view most recent
  }

  if (!targetOrder) {
    showToast(`Order ID not found in market registry.`, "toast-info", "⚠️");
    return;
  }

  document.getElementById('trackOrderId').textContent = targetOrder.id;
  document.getElementById('trackOrderDate').textContent = targetOrder.date;
  document.getElementById('trackCustomer').textContent = `${targetOrder.customerName} (${targetOrder.customerPhone})`;
  document.getElementById('trackAddress').textContent = targetOrder.address;
  document.getElementById('trackCourier').textContent = `${targetOrder.courier} • ${targetOrder.courierPhone}`;
  document.getElementById('trackEta').textContent = targetOrder.estimatedArrival;
  document.getElementById('trackTotal').textContent = `₹${targetOrder.total.toFixed(2)} (${targetOrder.paymentMethod})`;

  // Progress Bar Steps
  const steps = ['Order Confirmed', 'Preparing Order', 'Out for Delivery', 'Delivered'];
  const currentIdx = steps.indexOf(targetOrder.status);

  document.querySelectorAll('.track-step').forEach((stepEl, idx) => {
    if (idx <= (currentIdx === -1 ? 0 : currentIdx)) {
      stepEl.classList.add('completed');
    } else {
      stepEl.classList.remove('completed');
    }
  });

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeOrderTrackingModal() {
  const modal = document.getElementById('orderTrackingModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Price Comparison Modal
function openComparisonModal() {
  const modal = document.getElementById('comparisonModal');
  const container = document.getElementById('comparisonTableContainer');
  if (!modal || !container) return;

  const items = marketStore.comparisonList.map(id => marketStore.products.find(p => p.id === id)).filter(Boolean);

  if (items.length === 0) {
    showToast(`Select items using the "⚖️ Compare" button first.`, "toast-info", "⚖️");
    return;
  }

  let html = `
    <div style="overflow-x:auto;">
      <table style="width:100%; border-collapse:collapse; text-align:left; font-size:0.9rem;">
        <thead>
          <tr style="background:var(--bg-subtle); border-bottom:2px solid var(--border);">
            <th style="padding:1rem;">Feature</th>
            ${items.map(item => `
              <th style="padding:1rem; min-width:180px;">
                <img src="${item.image}" alt="${item.title}" style="width:100%; height:110px; object-fit:cover; border-radius:var(--radius-sm); margin-bottom:0.5rem;">
                <h4 style="font-size:0.95rem; font-weight:700;">${item.title}</h4>
                <button class="cart-remove-btn remove-comp-btn" data-id="${item.id}">Remove ✕</button>
              </th>
            `).join('')}
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom:1px solid var(--border-light);">
            <td style="padding:0.75rem 1rem; font-weight:700; color:var(--text-muted);">Price / Unit</td>
            ${items.map(item => `<td style="padding:0.75rem 1rem; font-weight:800; color:var(--primary-dark); font-size:1.1rem;">₹${item.price.toFixed(2)} <span style="font-size:0.75rem; color:var(--text-muted); font-weight:400;">${item.unit}</span></td>`).join('')}
          </tr>
          <tr style="border-bottom:1px solid var(--border-light);">
            <td style="padding:0.75rem 1rem; font-weight:700; color:var(--text-muted);">Local Vendor Stall</td>
            ${items.map(item => `<td style="padding:0.75rem 1rem; color:var(--primary); font-weight:600;">📍 ${item.vendor}</td>`).join('')}
          </tr>
          <tr style="border-bottom:1px solid var(--border-light);">
            <td style="padding:0.75rem 1rem; font-weight:700; color:var(--text-muted);">Distance from You</td>
            ${items.map(item => `<td style="padding:0.75rem 1rem;">⚡ ${item.distance}</td>`).join('')}
          </tr>
          <tr style="border-bottom:1px solid var(--border-light);">
            <td style="padding:0.75rem 1rem; font-weight:700; color:var(--text-muted);">Community Rating</td>
            ${items.map(item => `<td style="padding:0.75rem 1rem; color:var(--secondary); font-weight:700;">★ ${item.rating} (${item.reviewsCount} reviews)</td>`).join('')}
          </tr>
          <tr style="border-bottom:1px solid var(--border-light);">
            <td style="padding:0.75rem 1rem; font-weight:700; color:var(--text-muted);">Stall Inventory</td>
            ${items.map(item => `<td style="padding:0.75rem 1rem; font-weight:600;">${item.stock > 0 ? `${item.stock} in stock` : '<span style="color:#e63946;">Out of Stock</span>'}</td>`).join('')}
          </tr>
          <tr style="border-bottom:1px solid var(--border-light);">
            <td style="padding:0.75rem 1rem; font-weight:700; color:var(--text-muted);">Badge Certification</td>
            ${items.map(item => `<td style="padding:0.75rem 1rem;"><span class="badge badge-${item.badge}">${item.badgeText}</span></td>`).join('')}
          </tr>
          <tr>
            <td style="padding:1rem;">Action</td>
            ${items.map(item => `
              <td style="padding:1rem;">
                <button class="btn btn-primary btn-sm btn-add-cart" data-id="${item.id}" style="width:100%;">
                  + Add to Basket
                </button>
              </td>
            `).join('')}
          </tr>
        </tbody>
      </table>
    </div>
  `;

  container.innerHTML = html;

  container.querySelectorAll('.remove-comp-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      marketStore.toggleComparison(btn.dataset.id);
      openComparisonModal();
    });
  });

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeComparisonModal() {
  const modal = document.getElementById('comparisonModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ==========================================================================
// Product Card HTML Generator with Stock & Compare Buttons
// ==========================================================================

function createProductCardHTML(p) {
  const isWished = marketStore.isWishlisted(p.id);
  const isCompared = marketStore.comparisonList.includes(p.id);
  const isOutOfStock = p.stock <= 0;
  const isLowStock = p.stock > 0 && p.stock < 10;

  return `
    <article class="product-card" data-category="${p.category}" data-id="${p.id}">
      <div class="product-thumb">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        <div class="product-badges">
          <span class="badge badge-${p.badge}">${p.badgeText}</span>
          ${isOutOfStock ? `<span class="badge" style="background:#fee2e2; color:#991b1b;">Out of Stock</span>` : ''}
          ${isLowStock ? `<span class="badge" style="background:#fef3c7; color:#92400e;">Only ${p.stock} Left!</span>` : ''}
        </div>
        <button class="btn-wishlist ${isWished ? 'active' : ''}" data-id="${p.id}" aria-label="Save to favorites">
          ${isWished ? '❤️' : '🤍'}
        </button>
        <button class="quick-view-overlay-btn" data-id="${p.id}">
          Quick View 👁️
        </button>
      </div>

      <div class="product-details">
        <span class="product-vendor">📍 ${p.vendor}</span>
        <h4 class="product-title">${p.title}</h4>
        
        <div class="product-meta">
          <div class="product-rating">
            <span>★</span> ${p.rating} <span class="count">(${p.reviewsCount})</span>
          </div>
          <span class="product-distance">⚡ ${p.distance} away</span>
        </div>

        <div class="product-footer">
          <div class="product-price-box">
            <span class="product-price">₹${p.price.toFixed(2)}</span>
            <span class="product-unit">${p.unit}</span>
          </div>
          <div style="display:flex; gap:0.4rem; align-items:center;">
            <button class="btn-compare-icon ${isCompared ? 'active' : ''}" data-id="${p.id}" title="Compare item" style="padding:0.45rem; border:1px solid var(--border); border-radius:var(--radius-sm); font-size:0.8rem; background:${isCompared ? 'var(--primary-subtle)' : '#fff'};">
              ⚖️
            </button>
            <button class="btn-add-cart" data-id="${p.id}" ${isOutOfStock ? 'disabled style="opacity:0.6; cursor:not-allowed;"' : ''}>
              ${isOutOfStock ? 'Sold Out' : '+ Add'}
            </button>
          </div>
        </div>
      </div>
    </article>
  `;
}

// One-Tap Authentication Modal Controls
function openAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// ==========================================================================
// Vendor Card HTML Generator
// ==========================================================================

function createVendorCardHTML(v) {
  return `
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
            <span>★</span> ${v.rating} <span style="color:var(--text-light); font-weight:400;">(${v.reviews || 0} reviews)</span>
          </div>
          <a href="shop.html" class="btn btn-primary btn-sm">
            Shop Stall ➔
          </a>
        </div>
      </div>
    </article>
  `;
}

// ==========================================================================
// Global Event Listeners & Modals Initialization
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  marketStore.updateBadges();
  marketStore.updateComparisonPill();
  marketStore.renderAuthUI();

  // Populate Home Featured Products dynamically if container exists
  const homeProdGrid = document.getElementById('homeFeaturedGrid');
  if (homeProdGrid) {
    const featured = marketStore.products.slice(0, 6);
    homeProdGrid.innerHTML = featured.map(p => createProductCardHTML(p)).join('');
  }

  // Populate Home Featured Vendors dynamically if container exists
  const homeVendGrid = document.getElementById('homeVendorsGrid');
  if (homeVendGrid) {
    const featuredVendors = marketStore.vendors.slice(0, 3);
    homeVendGrid.innerHTML = featuredVendors.map(v => createVendorCardHTML(v)).join('');
  }

  // Header scroll detection
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) header?.classList.add('scrolled');
    else header?.classList.remove('scrolled');
  });

  // Mobile menu toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.textContent = isOpen ? '✕' : '☰';
    });
  }

  // Cart Drawer Events
  document.getElementById('openCartBtn')?.addEventListener('click', openCartDrawer);
  document.getElementById('closeCartBtn')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cartDrawerOverlay')?.addEventListener('click', (e) => {
    if (e.target.id === 'cartDrawerOverlay') closeCartDrawer();
  });

  // Quick View Modal Events
  document.getElementById('modalCloseBtn')?.addEventListener('click', closeQuickView);
  document.getElementById('quickViewModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'quickViewModal') closeQuickView();
  });

  // Quantity Stepper in Modal
  document.getElementById('modalMinus')?.addEventListener('click', () => {
    const valEl = document.getElementById('modalQtyVal');
    let curr = parseInt(valEl?.textContent || '1');
    if (curr > 1 && valEl) valEl.textContent = curr - 1;
  });

  document.getElementById('modalPlus')?.addEventListener('click', () => {
    const valEl = document.getElementById('modalQtyVal');
    let curr = parseInt(valEl?.textContent || '1');
    if (curr < 20 && valEl) valEl.textContent = curr + 1;
  });

  // Checkout Button (Inside Cart Drawer)
  document.getElementById('cartCheckoutBtn')?.addEventListener('click', openCheckoutModal);
  document.getElementById('checkoutModalCloseBtn')?.addEventListener('click', closeCheckoutModal);

  // Checkout Form Submission (Digital Payment Simulation)
  const checkoutForm = document.getElementById('checkoutForm');
  if (checkoutForm) {
    checkoutForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('checkoutName')?.value || 'Customer';
      const phone = document.getElementById('checkoutPhone')?.value || '';
      const address = document.getElementById('checkoutAddress')?.value || '';
      const payMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value || 'Digital UPI';

      const summary = marketStore.calculateCheckoutSummary();

      const order = marketStore.createOrder({
        customerName: name,
        customerPhone: phone,
        address: address,
        paymentMethod: payMethod,
        discount: summary.discount,
        deliveryFee: summary.deliveryFee,
        total: summary.finalTotal
      });

      closeCheckoutModal();
      showToast(`🎉 Order ${order.id} placed successfully! Local courier dispatched.`, "toast-success", "📦");
      openOrderTrackingModal(order.id);
    });
  }

  // Track Order Prompt Buttons
  document.getElementById('openTrackOrderBtn')?.addEventListener('click', () => openOrderTrackingModal());
  document.getElementById('trackModalCloseBtn')?.addEventListener('click', closeOrderTrackingModal);
  document.getElementById('trackLookupBtn')?.addEventListener('click', () => {
    const input = document.getElementById('trackOrderSearchInput');
    if (input && input.value) {
      openOrderTrackingModal(input.value.trim());
    }
  });

  // Comparison Pill & Modal
  document.getElementById('comparisonFloatPill')?.addEventListener('click', openComparisonModal);
  document.getElementById('compModalCloseBtn')?.addEventListener('click', closeComparisonModal);

  // Delegated Click Handlers
  document.addEventListener('click', (e) => {
    // Add to cart
    const addBtn = e.target.closest('.btn-add-cart');
    if (addBtn && !addBtn.disabled) {
      e.preventDefault();
      marketStore.addToCart(addBtn.dataset.id, 1);
      return;
    }

    // Wishlist
    const wishBtn = e.target.closest('.btn-wishlist');
    if (wishBtn) {
      e.preventDefault();
      marketStore.toggleWishlist(wishBtn.dataset.id);
      return;
    }

    // Quick View
    const qvBtn = e.target.closest('.quick-view-overlay-btn');
    if (qvBtn) {
      e.preventDefault();
      openQuickView(qvBtn.dataset.id);
      return;
    }

    // Compare button
    const compBtn = e.target.closest('.btn-compare-icon');
    if (compBtn) {
      e.preventDefault();
      marketStore.toggleComparison(compBtn.dataset.id);
      compBtn.classList.toggle('active', marketStore.comparisonList.includes(parseInt(compBtn.dataset.id)));
      return;
    }
  });

  // Newsletter form
  document.querySelector('.newsletter-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input[type="email"]');
    if (input && input.value) {
      showToast(`Subscribed! Enjoy ₹50 off your next order with code WELCOME20!`, "toast-success", "💌");
      input.value = '';
    }
  });

  // One-Tap Auth Modal Listeners
  document.getElementById('closeAuthModalBtn')?.addEventListener('click', closeAuthModal);
  document.getElementById('authModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'authModal') closeAuthModal();
  });

  document.querySelectorAll('.role-pick-card').forEach(card => {
    card.addEventListener('click', () => {
      const role = card.dataset.role;
      marketStore.loginAs(role);
      closeAuthModal();
    });
  });

  document.getElementById('customQuickLoginForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('customUserNameInput');
    if (input && input.value) {
      marketStore.loginAs('customer', input.value.trim());
      closeAuthModal();
    }
  });

  // Floating One-Tap prompt events
  document.getElementById('closeOneTapPromptBtn')?.addEventListener('click', () => {
    const prompt = document.getElementById('googleOneTapPrompt');
    if (prompt) prompt.style.display = 'none';
    sessionStorage.setItem('townsquare_onetap_dismissed', 'true');
    marketStore.oneTapDismissed = true;
  });

  document.getElementById('oneTapQuickCustomerBtn')?.addEventListener('click', () => {
    marketStore.loginAs('customer');
  });

  document.getElementById('oneTapQuickAdminLink')?.addEventListener('click', (e) => {
    e.preventDefault();
    marketStore.loginAs('admin');
  });

  // Global document click to close user profile dropdown
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-nav-wrapper')) {
      document.querySelectorAll('.user-nav-dropdown').forEach(d => d.classList.remove('show'));
    }
  });

  // Global Escape Key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeQuickView();
      closeCheckoutModal();
      closeOrderTrackingModal();
      closeComparisonModal();
      closeAuthModal();
    }
  });
});
