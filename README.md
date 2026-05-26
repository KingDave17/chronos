# ⏳ CHRONOS | Temporal Booking Agency

Welcome to CHRONOS, my premium, futuristic E-Commerce React application. 

Instead of building a boring, standard online store that sells t-shirts or coffee mugs, I decided to build a high-end, luxury booking agency for **Time Travel Destinations**. Experience history not as it was written, but as it was lived!

## ✨ Features & UX Polish
I spent a lot of time obsessing over the UI/UX details in this project to make it feel like a truly premium product:
* **Data-Driven Architecture:** All 18 timelines (Past, Future, and Alternate) are rendered dynamically from a central `destinations.json` database. Adding a new era is as simple as adding a JSON object.
* **Waterfall Filtering & Sorting:** Users can instantly filter by "Epoch" (Era) and sort by Price. 
* **State Management:** A fully functional, glassmorphic slide-out Cart Drawer that calculates dynamic pricing, handles quantity adjustments (+/-), and clears out upon "Sequence Authorization."
* **Edge-Case Handling:** I wrote custom React `useEffect` timeout cleanups and key-remounts to perfectly handle rapid-click bugs on the "Added!" animation.
* **Custom CSS Animations:** Premium dark-mode aesthetics using glassmorphism, glowing neon borders, and custom `@keyframes` for the success modal and popups.
* **100% Responsive:** Custom `@media` queries ensure the app scales perfectly from ultra-wide monitors down to mobile phones (including a specialized, streamlined mobile nav bar).

## 📂 Project Structure

```text
time-travel-agency/
├── src/
│   ├── components/
│   │   ├── CartDrawer.jsx       # The slide-out shopping cart
│   │   ├── CartDrawer.css
│   │   ├── CheckoutModal.jsx    # Custom animated success popup
│   │   ├── CheckoutModal.css
│   │   ├── ProductCard.jsx      # Dynamic cards for each timeline
│   │   └── ProductCard.css
│   ├── data/
│   │   └── destinations.json    # The core JSON database of all eras
│   ├── App.jsx                  # Main logic, state, and rendering
│   ├── App.css                  # Global layout and responsive queries
│   ├── index.css                # CSS variables (colors, fonts) and resets
│   └── main.jsx                 # React root entry point
└── index.html
```

## 🛠️ Built With
* **React (Functional Components & Hooks)**
* **Vanilla CSS** (No Tailwind or UI libraries—every shadow, grid, and animation is custom-built)
* **Vite** (For lightning-fast development and bundling)

## 🧠 Things I Learned
While building this, I ran into (and successfully fixed) a few notorious web dev hurdles:
* **Timeout Racing:** Solved an issue where spam-clicking the "Add to Cart" button spawned multiple overlapping `setTimeout` functions. Fixed it by hooking into component lifecycles using `useEffect` return cleanups.
* **CSS Textarea Resizing:** Locked down the contact form with `resize: vertical` so users can't violently drag the textbox horizontally and destroy the flexbox grid.
* **Array Mutation Traps:** Learned how `.sort()` mutates original data arrays in React, and built a custom "waterfall" pipeline using the spread operator `[...array]` to safely create shallow copies before filtering and sorting.
* **Hover States on Disabled Elements:** Used the CSS `:not(:disabled)` pseudo-class trick to prevent hover effects from triggering on grayed-out buttons.

## 🔧 How to Run Locally
1. Clone this repository
2. Run `npm install`
3. Run `npm run dev`
4. Open the localhost link in your browser and prepare for temporal displacement!
