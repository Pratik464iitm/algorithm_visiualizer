// App.jsx — Root component
//
// This is deliberately lean: all logic lives in the useVisualizer() hook.
// App.jsx just:
//   1. Calls the hook to get state + actions
//   2. Passes them to the right child components
//   3. Handles layout

import React from 'react'
import { useVisualizer } from './hooks/useVisualizer.js'
import BarChart  from './components/BarChart.jsx'
import Controls  from './components/Controls.jsx'
import AlgoInfo  from './components/AlgoInfo.jsx'
import './App.css'

function App() {
  // Get everything from our custom hook
  const visualizer = useVisualizer()

  return (
    <div className="app">

      {/* ── Header ── */}
      <header className="app-header">
        <p className="header-eyebrow">// interactive learning tool</p>
        <h1 className="header-title">
          ALGO<span style={{ color: 'var(--text-muted)' }}>.</span>VISUALIZER
          <span className="blink">_</span>
        </h1>
        <p className="header-sub">Sorting algorithms rendered in real-time</p>
      </header>

      <div className="container">

        {/* ── Controls Panel (algorithm tabs + playback + sliders) ── */}
        <Controls
          algorithm={visualizer.algorithm}
          setAlgorithm={visualizer.setAlgorithm}
          arraySize={visualizer.arraySize}
          handleSizeChange={visualizer.handleSizeChange}
          speed={visualizer.speed}
          setSpeed={visualizer.setSpeed}
          isPlaying={visualizer.isPlaying}
          isDone={visualizer.isDone}
          stepIndex={visualizer.stepIndex}
          totalSteps={visualizer.totalSteps}
          play={visualizer.play}
          pause={visualizer.pause}
          stepForward={visualizer.stepForward}
          stepBackward={visualizer.stepBackward}
          reset={visualizer.reset}
          newArray={visualizer.newArray}
        />

        {/* ── Bar Chart Visualization ── */}
        <BarChart
          currentStep={visualizer.currentStep}
          stepIndex={visualizer.stepIndex}
          totalSteps={visualizer.totalSteps}
          algorithm={visualizer.algorithm}
        />

        {/* ── Algorithm Info + Live Feedback ── */}
        <AlgoInfo
          algorithm={visualizer.algorithm}
          currentStep={visualizer.currentStep}
          isDone={visualizer.isDone}
        />

        {/* ── Done Banner ── */}
        {visualizer.isDone && (
          <div className="done-banner">
            ✓ &nbsp; Array fully sorted in {visualizer.totalSteps} steps
          </div>
        )}

      </div>

      {/* ── Footer ── */}
      <footer className="app-footer">
        Built with React + Vite &nbsp;·&nbsp; Algorithm Visualizer
      </footer>
    </div>
  )
}

export default App
