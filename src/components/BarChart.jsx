// BarChart.jsx — Renders the array as animated vertical bars
//
// Props:
//   currentStep   — { array, comparing, swapping, sorted, key, minIndex }
//   stepIndex     — current step number
//   totalSteps    — total number of steps
//   algorithm     — name of the current algo (to show/hide key legend item)

import React from 'react'
import './BarChart.css'

function BarChart({ currentStep, stepIndex, totalSteps, algorithm }) {
  const { array, comparing, swapping, sorted, key: keyIdx, minIndex } = currentStep

  // Convert arrays to Sets for O(1) lookup
  const comparingSet = new Set(comparing)
  const swappingSet  = new Set(swapping)
  const sortedSet    = new Set(typeof sorted[Symbol.iterator] === 'function' ? sorted : [])

  // Max value in array used to compute each bar's height percentage
  const maxVal = Math.max(...array, 1)

  // Show value labels only when there are few bars (otherwise too crowded)
  const showLabels = array.length <= 25

  return (
    <div className="bar-chart-wrap">

      {/* Step counter in top-right corner */}
      <div className="step-counter">
        STEP <span>{stepIndex < 0 ? 0 : stepIndex + 1}</span> / <span>{totalSteps}</span>
      </div>

      {/* ── The bars ── */}
      <div className="bar-chart">
        {array.map((value, index) => {

          // Determine which CSS class this bar gets
          // Priority: swapping > comparing > key > sorted > default
          let stateClass = ''
          if      (swappingSet.has(index))  stateClass = 'swapping'
          else if (comparingSet.has(index)) stateClass = 'comparing'
          else if (index === keyIdx)        stateClass = 'key'
          else if (index === minIndex)      stateClass = 'comparing'  // selection sort min
          else if (sortedSet.has(index))    stateClass = 'sorted'

          // Height as a percentage of the container (5% min so tiny values are visible)
          const heightPercent = Math.max(5, (value / maxVal) * 100)

          return (
            <div
              key={index}
              className={`bar ${stateClass} ${showLabels ? 'show-label' : ''}`}
              style={{ height: `${heightPercent}%` }}
              title={`Value: ${value}`}
            >
              {/* Small number label below the bar */}
              {showLabels && (
                <span className="bar-label">{value}</span>
              )}
            </div>
          )
        })}
      </div>

      {/* ── Color Legend ── */}
      <div className="legend">
        <div className="legend-item">
          <div className="legend-dot default" />
          Unsorted
        </div>
        <div className="legend-item">
          <div className="legend-dot comparing" />
          Comparing
        </div>
        <div className="legend-item">
          <div className="legend-dot swapping" />
          Swapping
        </div>
        {/* Show "Key" legend only for insertion sort */}
        {algorithm === 'insertion' && (
          <div className="legend-item">
            <div className="legend-dot key" />
            Key Element
          </div>
        )}
        <div className="legend-item">
          <div className="legend-dot sorted" />
          Sorted
        </div>
      </div>
    </div>
  )
}

export default BarChart
