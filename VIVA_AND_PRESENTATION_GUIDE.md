# 🎓 LPU CA1 Assessment Guide: Local Market Online Store
### *Viva Preparation, Video Presentation Script, and Rubrics Breakdown*
> **Course Code:** CSE326 — Internet & Web Technologies  
> **Evaluation Breakdown:** Functionality & UI (15 Marks) + Viva (10 Marks) + Video Presentation (5 Marks) = **Total: 30 Marks**

---

## 📋 Evaluation Rubrics Alignment Matrix

| Rubric Component | Marks | How Our Implementation Satisfies It |
|---|---|---|
| **1. Implementation of Problem Statement** | 15 Marks | Complete web marketplace for neighborhood small vendors with vendor onboarding, store catalog, inventory tracking, shopping cart, digital payment, order dispatch, delivery tracking, customer reviews, promotions, price comparison, and an admin dashboard. |
| **2. Functional Correctness & Completeness** | Included in 15M | Full CRUD functionality on product catalog, real-time inventory deduction upon order placement, promo code calculations (`LOCALLOVE10`, `FREESHIP`), order status updates, and `localStorage` persistence. |
| **3. UI Design & Transitions** | Included in 15M | Modern artisan aesthetic (sage green & warm terracotta), glassmorphic sticky nav, CSS transition lifts (`translateY`), image zoom on hover (`scale(1.08)`), slide-out cart drawer, and responsive layouts across mobile, tablet, and desktop. |
| **4. Viva Performance** | 10 Marks | Detailed questions & answers below explaining DOM manipulation, event delegation, asynchronous state, and responsive architecture. |
| **5. Video Presentation** | 5 Marks | Complete step-by-step video script covering problem identification, solution demo, code walkthrough, and team contribution breakdown. |

---

## 🎤 Part 1: Viva Preparation Questions & Answers (10 Marks)

### Q1: What is the core problem statement and how does your project address it?
**Answer:**  
Local small vendors, cottage-industry bakers, organic farmers, and handmade artisans struggle to establish an online presence due to high commercial retail rents and steep distributor margins (which take 50–70% of retail sales). **TownSquare Market** provides a low-barrier, zero-upfront-cost digital storefront. It connects neighborhood households directly with local producers, incorporating local inventory tracking, digital checkout, same-day eco-courier delivery tracking, and an admin management portal.

---

### Q2: What web technologies and design architectures were used?
**Answer:**
- **HTML5 Semantic Structure:** Used `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, and `<footer>` for accessibility, SEO, and clean DOM hierarchy.
- **CSS3 Modern Layouts & Transitions:**
  - CSS Custom Properties (`--primary`, `--accent`, `--transition-bounce`) for uniform theming.
  - CSS Grid (`grid-template-columns: repeat(auto-fill, minmax(...))`) for dynamic responsiveness.
  - Smooth hardware-accelerated animations (`transform`, `opacity`, `backdrop-filter: blur(12px)`).
  - Breakpoints: `1200px`, `992px`, `768px`, and `480px`.
- **Vanilla JavaScript (ES6+):**
  - Object-Oriented Store Architecture (`class MarketStore`) to manage shared state across all pages.
  - `localStorage` API for browser persistence of products, orders, cart items, favorites, and vendor registrations.
  - Event Delegation (`document.addEventListener('click', ...)`) for dynamic product buttons.

---

### Q3: How is data shared across different pages without a backend server or database?
**Answer:**  
We used the browser's native **`localStorage` API** through a centralized JavaScript class (`MarketStore`). When a customer places an order on `index.html` or `shop.html`, the order is written to `localStorage.getItem('townsquare_orders')`. When the administrator navigates to `dashboard.html`, the dashboard script retrieves the updated orders, recalculates Gross Revenue KPIs, and updates the dispatch status in real time.

---

### Q4: How does your inventory deduction and stock management work?
**Answer:**  
Each product maintains a `stock` attribute in the product catalog.
1. When browsing, items with `stock < 10` display an orange "⚡ Low Stock" badge; items with `stock <= 0` display a red "Out of Stock" badge, and their "Add to Cart" button is disabled.
2. When the customer submits checkout, `marketStore.createOrder()` iterates through each cart item and reduces the corresponding product's `stock` count.
3. In `dashboard.html`, stall owners can view stock levels and click **"+10 Stock"** to instantly replenish inventory.

---

### Q5: How did you implement the Price & Feature Comparison tool?
**Answer:**  
On product cards, clicking the **⚖️ Compare** icon adds or removes the item's ID in `marketStore.comparisonList` (capped at 3 items). A floating pill counter appears on the screen. Clicking the pill opens a comparison modal containing a dynamic HTML table comparing Unit Price, Stall Name, Distance from Buyer, Community Rating, Stock Level, and Certifications side-by-side.

---

### Q6: How do the promotional coupons work during checkout?
**Answer:**  
The checkout engine parses codes stored in `ACTIVE_PROMOS`:
- `LOCALLOVE10`: Calculates a 10% discount on the cart subtotal.
- `FREESHIP`: Waives the $3.99 neighborhood delivery fee.
- `WELCOME20`: Deducts a flat $5.00 community welcome gift.
All calculations update subtotals, discounts, and final totals before payment confirmation.

---

## 📹 Part 2: Video Presentation Script (5 Marks)

**Duration:** 4 to 6 minutes  
**Format:** Screen recording with team members' webcams visible (or audio voiceover).

### Slide / Screen 1: Introduction (0:00 – 0:45)
- **Speaker 1:** *"Hello everyone and respected evaluator. Today our team is presenting our CSE326 CA1 Project on the topic: 'Local Market Online Store for Small Vendors', which we have built under the name **TownSquare Market**."*
- State: Project Title, Course Code (CSE326), and Registration Numbers of all team members.

### Slide / Screen 2: Problem Identification & Motivation (0:45 – 1:30)
- **Speaker 2:** *"Small neighborhood vendors like family bakers, organic growers, and studio potters face huge difficulties competing with large e-commerce giants. They cannot afford high retail rents or expensive commission platforms. Our motivation was to build an ethical digital cooperative where local producers get direct customer reach, transparent pricing, and managed neighborhood courier delivery."*

### Screen 3: Live Website Demonstration (1:30 – 3:30)
- **Speaker 1:**
  1. **Home Page (`index.html`):** Show the hero section with floating badges, categories strip, and "Weekly Harvest Picks". Click the wishlist heart and quick view modal to demonstrate smooth animations.
  2. **Marketplace (`shop.html`):** Demonstrate the live search, category filters, interactive **Price Range Slider ($3 – $30)**, and sort dropdown. Demonstrate the **⚖️ Price Comparison** tool comparing two items side-by-side.
  3. **Cart Drawer & Checkout:** Add items to cart. Open the slide-out cart drawer, enter coupon `LOCALLOVE10`, and proceed to the **Digital Payment Checkout Modal**. Fill the form and place the order.
  4. **Live Order Tracking:** Show the animated step progress bar (`Placed -> Preparing -> On the Way -> Delivered`) with courier rider details.
- **Speaker 2:**
  5. **Local Stalls (`vendors.html`):** Demonstrate the vendor directory and filter by craft.
  6. **Vendor Application (`join-vendor.html`):** Fill out the stall application form, attach a mock permit, submit, and show the success confirmation.
  7. **Admin Dashboard (`dashboard.html`):** Show live KPIs (Gross Sales, Total Orders, Low-Stock warnings). Demonstrate adding a new product and updating an order's status to "Delivered".

### Screen 4: Technologies & Team Contributions (3:30 – 4:30)
- **Speaker 1 / 2:**
  - *"We used pure HTML5 semantic elements, modular CSS3 with custom properties and responsive breakpoints, and vanilla ES6 JavaScript with localStorage state persistence."*
  - Mention each member's specific contribution (e.g., UI layout, cart & checkout logic, admin dashboard & inventory, styling & transitions).
  - Conclude: *"Thank you for your time. The code is hosted on GitHub and deployed on GitHub Pages."*

---

## 📤 Part 3: Mandatory UMS Excel Submission File
The required file **`CA1_Project_Submission_Local_Market.xlsx`** has been generated in your workspace root.
Fill in your team's details before uploading to UMS:
- **Project Name & Title:** Local Market Online Store for Small Vendors (TownSquare)
- **Team Name:** [Your Team Name]
- **Course Code:** CSE326
- **Registration Number(s):** [Your Reg No., Partner Reg No.]
- **GitHub Link:** `https://github.com/your-username/local-market-online-store`
- **Deployed Link:** `https://your-username.github.io/local-market-online-store/`
- **Video Presentation Link:** `https://youtu.be/your-video-link`
