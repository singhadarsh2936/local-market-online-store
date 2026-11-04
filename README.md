# 🌿 TownSquare Local Market
### *Online Store & Multi-Vendor Marketplace for Neighborhood Small Vendors*
> **Course Project:** CSE326 — Internet & Web Technologies  
> **Topic:** Local Market Online Store for Small Vendors

---

## 📖 Project Overview
**TownSquare Market** is a multi-page web application connecting local neighborhood artisans, bakers, beekeepers, and organic family farms directly with local conscious buyers. Built with semantic **HTML5**, modern **CSS3** (with transitions and animations), and **vanilla JavaScript**, it provides a real-world shopping and vendor onboarding experience without third-party frameworks.

---

## 🗂️ Multi-Page Architecture
The website consists of **4 fully functional pages**:

1. **`index.html` (Home Page)**
   - Top announcement banner with free delivery alert.
   - Glassmorphic sticky navigation with live search, wishlist counter, and cart badge.
   - Hero section with animated floating seller badges, trust metrics, and dual CTAs.
   - Quick category aisle cards (Produce, Bakery, Honey & Pantry, Pottery & Crafts, Home & Living).
   - "Weekly Harvest Picks" featured product cards with hover zoom and quick add to cart.
   - Community value proposition grid (Farm-to-table, fair vendor payouts, green delivery, food safety).
   - Local vendor stall highlights & community reviews.
   - Vendor recruitment CTA banner with immediate registration link.

2. **`shop.html` (Marketplace / Catalog)**
   - Two-column layout with a live sidebar filtering engine.
   - Dynamic search filter, category picker, and interactive price range slider (₹50 – ₹1000).
   - Badge filters (100% Organic, Artisan Handmade, Best Seller, Eco/Vegan).
   - Specific local vendor stall filter (e.g., Mama Rosa, Sunbeam, Hometown Honey, Copper & Clay).
   - Dynamic sorting dropdown (Featured, Price Low-to-High, Price High-to-Low, Highest Rated).
   - Active filter chips with one-click individual chip removal and "Reset All Filters".
   - Interactive Quick View modal for detailed artisan background stories.

3. **`vendors.html` (Local Stalls Directory)**
   - Comprehensive directory of verified neighborhood small businesses and farmsteads.
   - Live stall search by name, craft, or neighborhood area (e.g., Riverdale, West End, Downtown Arts).
   - Specialty pill filters (Artisan Bakery, Organic Produce, Raw Honey, Ceramics, Herbal Wellness).
   - Vendor stall cards showcasing shop banners, verified badges, owner avatars, distances, maker bios, and specialty tags.
   - "Why Buying Directly from Stalls Matters" economic community impact cards.

4. **`join-vendor.html` (Become a Vendor & Contact)**
   - 3-column vendor perks section (0% commission intro, shared couriers, weekly bank deposits).
   - Interactive Vendor Application Form:
     - Stall name, owner name, contact email, phone.
     - Neighborhood zone and craft category selectors.
     - Sourcing and craft narrative textarea.
     - Stall permit / food safety license drag-and-drop file attachment simulator.
     - Animated submission feedback with validation and success banner.
   - Transparent pricing comparison (Starter Stall vs. Artisan Pro).
   - Interactive FAQ accordion with smooth open/close height transitions.
   - Market Headquarters contact details, direct stall helpline, and email support.

---

## ✨ CSS Animations & Transitions
- **Hover Lift & Elevation**: Cards and buttons smoothly lift (`translateY(-6px)`) with realistic elevation shadows using `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Image Scale Transition**: Product and stall thumbnails smoothly zoom (`scale(1.08)`) within overflow-hidden containers on hover.
- **Cart Badge Pop Animation**: `@keyframes badgePop` pulses and bounces when items are added to the basket.
- **Slide-Out Cart Drawer**: Smooth slide-in (`translateX(100%)` to `translateX(0)`) with backdrop blur.
- **Quick View Modal Transition**: Overlay fades in with backdrop blur while the dialog scales up into view (`scale(0.95)` to `scale(1)`).
- **FAQ Accordion Transition**: Smooth `max-height` transition and rotating chevron icon (`rotate(45deg)`).
- **Floating Hero Badges**: Continuous gentle floating keyframe animation (`@keyframes floatAnim`).
- **Toast Notifications**: Smooth horizontal slide-in from screen edge on all shopping and form actions.

---

## 🛒 Interactive Features (Vanilla JavaScript)
- **One-Tap Authentication System**:
  - Instant 1-click login for **Customer** (Aarav Sharma), **Admin** (Market Administrator), and **Vendor** (Mama Rosa).
  - Floating Google-style One-Tap sign-in prompt widget with dismiss state.
  - Header user badge with role pill (`customer`, `admin`, `vendor`) and interactive dropdown menu.
  - Automatic pre-fill of delivery name, phone, and address in checkout when signed in as customer.
  - Role switcher in the Admin Dashboard for easy evaluation during project demonstrations.
- **Shared Persistent State**: Shopping cart and saved favorites persist across pages using `localStorage`.
- **Slide-Out Shopping Cart Drawer**: Available across all pages via the top navbar cart icon. Supports adding, removing, and adjusting item quantities, plus live subtotal and delivery fee calculations.
- **Checkout Process**: One-click order simulation with instant celebratory confirmation toast.
- **URL Parameter Filtering**: Homepage search and category cards automatically link and pre-filter `shop.html` via query parameters (`?category=produce` or `?q=sourdough`).
- **Quick View Modal**: Inspect ingredients, distance from your home, batch details, and maker background before purchasing.

---

## 🚀 How to Run Locally

You can open the website in any modern web browser:

### Option 1: Direct File Open
Simply double-click `index.html` or open it with your browser (Chrome, Edge, Safari, Firefox).

### Option 2: Local HTTP Server (Recommended)
Open a terminal in the project directory and run:
```bash
python3 -m http.server 8000
```
Then visit:
```
http://localhost:8000
```
