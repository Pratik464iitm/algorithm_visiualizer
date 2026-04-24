# ⬡ AlgoVisualizer — Sorting Algorithm Visualizer

An interactive, real-time sorting algorithm visualizer with a retro terminal aesthetic.  
Built with **React + Vite** using custom hooks, animated bars, and step-by-step playback.

---

## 📁 Project Structure

```
AlgoVisualizer/
├── index.html                    ← HTML shell (React mounts here)
├── vite.config.js                ← Vite bundler config
├── package.json                  ← Dependencies & scripts
├── README.md                     ← You are here!
│
└── src/
    ├── main.jsx                  ← Entry point — renders <App />
    ├── index.css                 ← Global reset, CSS variables, fonts
    ├── App.jsx                   ← Root component — layout only
    ├── App.css                   ← Page layout styles
    │
    ├── assets/                   ← Images & icons go here
    │
    ├── algorithms/               ← Pure JS sorting logic (no React)
    │   ├── bubbleSort.js         ← Generates Bubble Sort animation steps
    │   ├── insertionSort.js      ← Generates Insertion Sort steps
    │   └── selectionSort.js      ← Generates Selection Sort steps
    │
    ├── hooks/
    │   └── useVisualizer.js      ← Custom hook: all state & animation logic
    │
    └── components/
        ├── BarChart.jsx          ← Animated bar visualization
        ├── BarChart.css
        ├── Controls.jsx          ← Playback buttons, sliders, algo tabs
        ├── Controls.css
        ├── AlgoInfo.jsx          ← Algorithm description + complexity cards
        └── AlgoInfo.css
```

---

##  How to Run

### 1. Install dependencies
```bash
npm install
```

### 2. Start the dev server
```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🔵 Bubble Sort | Classic compare-and-swap visualization |
| 🟡 Insertion Sort | Key element inserted into sorted subarray |
| 🔴 Selection Sort | Minimum element selected each pass |
| ▶ Play / ⏸ Pause | Auto-animate at chosen speed |
| ◂◂ / ▸▸ | Step backward and forward manually |
| ↺ Reset | Jump back to start |
| ⟳ New Array | Generate a fresh random array |
| 📏 Array Size | Adjust 5 – 60 elements |
| ⚡ Speed | Slow → Medium → Fast playback |
| 📊 Progress bar | Visual step progress |
| 🎨 Color coding | Comparing (amber) / Swapping (red) / Sorted (blue) / Key (green) |
| ℹ Info panel | Description + Big-O complexity for each algorithm |
| 💬 Live feedback | Real-time plain-English description of each step |

---

##  React Concepts Used

| Concept | Where |
|---|---|
| `useState` | useVisualizer — tracks array, steps, stepIndex, isPlaying |
| `useEffect` | useVisualizer — auto-advances steps on interval; recomputes steps on algo change |
| `useRef` | useVisualizer — stores setInterval ID so it can be cleared anytime |
| `useCallback` | useVisualizer — memoizes play/pause/reset functions |
| Custom Hook | `useVisualizer.js` — encapsulates all visualizer logic |
| Props | App → Controls, BarChart, AlgoInfo |
| Derived state | filtered/sorted array computed from steps array (no extra useState) |
| Conditional rendering | Done banner shown only when isDone is true |
| Dynamic className | Bar color state (comparing/swapping/sorted/key) |
| Dynamic style | Bar height computed from value as % of max |

---

##  Changing the Theme

Open `src/index.css` and edit `:root` variables:

```css
:root {
  --neon:   #00ff88;  /* primary green — change to any color! */
  --amber:  #ffb300;  /* comparing highlight */
  --red:    #ff4560;  /* swapping highlight */
  --blue:   #00b4d8;  /* sorted highlight */
  --bg:     #080c08;  /* page background */
}
```

---

##  Adding a New Algorithm

1. Create `src/algorithms/mySort.js` — export `getMySortSteps(array)`
2. Add it to the `ALGORITHMS` map in `src/hooks/useVisualizer.js`
3. Add a tab entry in `Controls.jsx` `ALGOS` array
4. Add info in `AlgoInfo.jsx` `INFO` object

---
