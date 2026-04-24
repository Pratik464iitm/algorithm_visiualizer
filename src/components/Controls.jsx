// Controls.jsx — All playback controls, algorithm tabs, and sliders
//
// Props: everything comes from the useVisualizer() hook via App.jsx
//   algorithm, setAlgorithm
//   arraySize, handleSizeChange
//   speed, setSpeed
//   isPlaying, isDone
//   stepIndex, totalSteps
//   play, pause, stepForward, stepBackward, reset, newArray

import React from 'react'
import './Controls.css'

// Algorithm tab definitions
const ALGOS = [
  { id: 'bubble',    label: '⬡ Bubble Sort' },
  { id: 'insertion', label: '⬡ Insertion Sort' },
  { id: 'selection', label: '⬡ Selection Sort' },
]

function Controls({
  algorithm, setAlgorithm,
  arraySize, handleSizeChange,
  speed, setSpeed,
  isPlaying, isDone,
  stepIndex, totalSteps,
  play, pause, stepForward, stepBackward, reset, newArray,
}) {
  // Progress as a percentage (0–100)
  const progress = totalSteps === 0 ? 0 : Math.round(((stepIndex + 1) / totalSteps) * 100)

  // Speed display: convert ms delay to a human-friendly label
  // Lower delay = faster, so we invert for display
  const speedLabel = speed <= 50 ? 'FAST' : speed <= 150 ? 'MED' : 'SLOW'

  return (
    <div className="controls">

      {/* ── Algorithm Selector Tabs ── */}
      <div className="algo-tabs">
        {ALGOS.map(({ id, label }) => (
          <button
            key={id}
            className={`algo-tab ${algorithm === id ? 'active' : ''}`}
            onClick={() => {
              setAlgorithm(id)   // changing algo resets the visualizer via useEffect
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ── Playback Buttons ── */}
      <div className="playback-row">
        {/* Step backward */}
        <button
          className="ctrl-btn"
          onClick={stepBackward}
          disabled={stepIndex <= 0}
          title="Step backward"
        >
          ◂◂
        </button>

        {/* Play / Pause toggle */}
        {isPlaying ? (
          <button className="ctrl-btn primary" onClick={pause}>
            ⏸ PAUSE
          </button>
        ) : (
          <button
            className="ctrl-btn primary"
            onClick={play}
            disabled={isDone || stepIndex >= totalSteps - 1}
          >
            ▶ {stepIndex < 0 ? 'START' : 'PLAY'}
          </button>
        )}

        {/* Step forward */}
        <button
          className="ctrl-btn"
          onClick={stepForward}
          disabled={stepIndex >= totalSteps - 1}
          title="Step forward"
        >
          ▸▸
        </button>

        {/* Reset to beginning */}
        <button
          className="ctrl-btn"
          onClick={reset}
          disabled={stepIndex < 0}
          title="Reset"
        >
          ↺ RESET
        </button>

        {/* Generate new random array — pushed to the right */}
        <button className="ctrl-btn new-arr" onClick={newArray}>
          ⟳ NEW
        </button>
      </div>

      {/* ── Sliders: Array Size + Speed ── */}
      <div className="sliders-row">

        {/* Array Size slider */}
        <div className="slider-group">
          <div className="slider-header">
            Array Size <span>{arraySize}</span>
          </div>
          <input
            type="range"
            min={5}
            max={60}
            step={1}
            value={arraySize}
            onChange={(e) => handleSizeChange(Number(e.target.value))}
            disabled={isPlaying}   // don't allow resizing while animating
          />
        </div>

        {/* Speed slider */}
        <div className="slider-group">
          <div className="slider-header">
            Speed <span>{speedLabel}</span>
          </div>
          {/*
            We invert the slider: moving right = faster = lower ms delay.
            max=500, min=20; the value stored in `speed` is the delay in ms.
            So we display (520 - speed) on the slider and convert back on change.
          */}
          <input
            type="range"
            min={20}
            max={500}
            step={10}
            value={520 - speed}   // invert for display
            onChange={(e) => setSpeed(520 - Number(e.target.value))}
          />
        </div>
      </div>

      {/* ── Step Progress Bar ── */}
      <div className="progress-row">
        <div className="progress-label">
          Progress <span>{progress}%</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </div>
  )
}

export default Controls
