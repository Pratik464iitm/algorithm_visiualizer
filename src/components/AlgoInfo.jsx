// AlgoInfo.jsx — Displays algorithm description, complexity, and live feedback
//
// Props:
//   algorithm   — 'bubble' | 'insertion' | 'selection'
//   currentStep — { comparing, swapping, sorted, ... }
//   isDone      — boolean, true when sorting is complete

import React from 'react'
import './AlgoInfo.css'

// Static data for each algorithm
const INFO = {
  bubble: {
    icon:  '⬡',
    name:  'BUBBLE SORT',
    desc:  'Repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The largest unsorted element "bubbles up" to its correct position after each full pass.',
    best:  { label: 'Best',    value: 'O(n)',   quality: 'good' },
    avg:   { label: 'Average', value: 'O(n²)',  quality: 'bad'  },
    worst: { label: 'Worst',   value: 'O(n²)',  quality: 'bad'  },
    space: { label: 'Space',   value: 'O(1)',   quality: 'good' },
  },
  insertion: {
    icon:  '⬡',
    name:  'INSERTION SORT',
    desc:  'Builds a sorted subarray one element at a time. Takes each new element (the "key") and finds its correct position in the already-sorted portion by shifting larger elements to the right.',
    best:  { label: 'Best',    value: 'O(n)',   quality: 'good' },
    avg:   { label: 'Average', value: 'O(n²)',  quality: 'bad'  },
    worst: { label: 'Worst',   value: 'O(n²)',  quality: 'bad'  },
    space: { label: 'Space',   value: 'O(1)',   quality: 'good' },
  },
  selection: {
    icon:  '⬡',
    name:  'SELECTION SORT',
    desc:  'Divides the array into sorted and unsorted parts. On each pass, finds the minimum element from the unsorted part and swaps it to the correct position in the sorted part.',
    best:  { label: 'Best',    value: 'O(n²)',  quality: 'bad'  },
    avg:   { label: 'Average', value: 'O(n²)',  quality: 'bad'  },
    worst: { label: 'Worst',   value: 'O(n²)',  quality: 'bad'  },
    space: { label: 'Space',   value: 'O(1)',   quality: 'good' },
  },
}

// Generate a human-readable feedback message based on current step state
function getFeedback(algorithm, currentStep, isDone) {
  if (isDone) return '✓ Sort complete — all elements in order!'

  const { comparing, swapping, sorted, key } = currentStep

  if (swapping.length === 2) {
    return `Swapping elements at indices ${swapping[0]} and ${swapping[1]}`
  }
  if (algorithm === 'insertion' && key >= 0) {
    return `Inserting key element into its sorted position`
  }
  if (comparing.length === 2) {
    return `Comparing indices ${comparing[0]} and ${comparing[1]}`
  }
  if (comparing.length === 1) {
    return `Scanning from index ${comparing[0]}`
  }
  if (sorted && (Array.isArray(sorted) ? sorted.length : sorted.size) > 0) {
    const sortedCount = Array.isArray(sorted) ? sorted.length : sorted.size
    return `${sortedCount} element${sortedCount !== 1 ? 's' : ''} sorted so far`
  }
  return 'Ready — press START to begin'
}

function AlgoInfo({ algorithm, currentStep, isDone }) {
  const info = INFO[algorithm]
  const feedback = getFeedback(algorithm, currentStep, isDone)

  return (
    <div className="algo-info">
      {/* Header */}
      <div className="algo-info-header">
        <span className="algo-info-icon">{info.icon}</span>
        <span className="algo-info-name neon-text">{info.name}</span>
      </div>

      {/* Description */}
      <p className="algo-info-desc">{info.desc}</p>

      {/* Complexity badges */}
      <div className="complexity-row">
        {[info.best, info.avg, info.worst, info.space].map((item) => (
          <div key={item.label} className={`complexity-badge ${item.quality}`}>
            <span className="badge-label">{item.label}</span>
            <span className="badge-value">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Live feedback ticker */}
      <div className="live-feedback">
        <span className="fb-label">›</span>
        {feedback}
        {!isDone && <span className="cursor" />}
      </div>
    </div>
  )
}

export default AlgoInfo
