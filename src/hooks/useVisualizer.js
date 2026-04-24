// hooks/useVisualizer.js
// A custom React Hook that manages all the visualizer state and logic.
//
// Custom hooks are a great way to extract complex stateful logic out of
// components so App.jsx stays clean and readable.
//
// What this hook manages:
//   - The array of numbers being visualized
//   - The pre-computed list of steps for the chosen algorithm
//   - The current step index (what frame we're on)
//   - Whether the animation is playing or paused
//   - Speed and array size settings

import { useState, useEffect, useRef, useCallback } from 'react'
import { getBubbleSortSteps    } from '../algorithms/bubbleSort.js'
import { getInsertionSortSteps } from '../algorithms/insertionSort.js'
import { getSelectionSortSteps } from '../algorithms/selectionSort.js'

// Map algorithm name → step generator function
const ALGORITHMS = {
  bubble:    getBubbleSortSteps,
  insertion: getInsertionSortSteps,
  selection: getSelectionSortSteps,
}

// ── Helper: generate a random array of given size ─────────────────────────
function generateArray(size) {
  return Array.from({ length: size }, () => Math.floor(Math.random() * 90) + 10)
}

// ── The Custom Hook ──────────────────────────────────────────────────────
export function useVisualizer() {
  // Settings
  const [algorithm, setAlgorithm] = useState('bubble')   // selected algo
  const [arraySize, setArraySize] = useState(20)          // number of bars
  const [speed, setSpeed]         = useState(150)         // ms per step (lower = faster)

  // Core state
  const [array, setArray]         = useState(() => generateArray(20))
  const [steps, setSteps]         = useState([])          // all animation frames
  const [stepIndex, setStepIndex] = useState(-1)          // current frame (-1 = not started)
  const [isPlaying, setIsPlaying] = useState(false)       // animation running?
  const [isDone, setIsDone]       = useState(false)       // reached last frame?

  // useRef stores the interval ID so we can clear it from any function
  const intervalRef = useRef(null)

  // ── Pre-compute steps whenever algorithm or array changes ───────────────
  // We do this once upfront so playback is just stepping through an array —
  // no heavy computation during animation.
  useEffect(() => {
    const stepFn = ALGORITHMS[algorithm]
    const computed = stepFn(array)
    setSteps(computed)
    setStepIndex(-1)    // reset to beginning
    setIsDone(false)
    setIsPlaying(false)
    clearInterval(intervalRef.current)
  }, [array, algorithm])

  // ── Auto-advance steps when playing ────────────────────────────────────
  useEffect(() => {
    if (!isPlaying) {
      clearInterval(intervalRef.current)
      return
    }

    intervalRef.current = setInterval(() => {
      setStepIndex((prev) => {
        const next = prev + 1
        if (next >= steps.length) {
          // Reached the last frame — stop
          clearInterval(intervalRef.current)
          setIsPlaying(false)
          setIsDone(true)
          return prev
        }
        return next
      })
    }, speed)

    // Cleanup: clear interval when effect re-runs or component unmounts
    return () => clearInterval(intervalRef.current)
  }, [isPlaying, speed, steps.length])

  // ── Derived: current visualization frame ───────────────────────────────
  // If stepIndex is -1, show the original unsorted array with no highlights
  const currentStep = stepIndex >= 0 && steps[stepIndex]
    ? steps[stepIndex]
    : { array, comparing: [], swapping: [], sorted: [], minIndex: -1, key: -1 }

  // ── Actions (functions components can call) ────────────────────────────

  // Generate a brand new random array
  const newArray = useCallback(() => {
    const fresh = generateArray(arraySize)
    setArray(fresh)
    setIsPlaying(false)
    setIsDone(false)
    clearInterval(intervalRef.current)
  }, [arraySize])

  // Resize: update arraySize and immediately generate array of that size
  const handleSizeChange = useCallback((size) => {
    setArraySize(size)
    const fresh = generateArray(size)
    setArray(fresh)
    setIsDone(false)
    setIsPlaying(false)
  }, [])

  // Start or resume animation
  const play = useCallback(() => {
    if (isDone) return
    if (stepIndex >= steps.length - 1) return
    setIsPlaying(true)
  }, [isDone, stepIndex, steps.length])

  // Pause the animation
  const pause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  // Step forward one frame manually
  const stepForward = useCallback(() => {
    if (stepIndex >= steps.length - 1) return
    setStepIndex((prev) => prev + 1)
    setIsPlaying(false)
  }, [stepIndex, steps.length])

  // Step backward one frame manually
  const stepBackward = useCallback(() => {
    if (stepIndex <= 0) return
    setStepIndex((prev) => prev - 1)
    setIsPlaying(false)
  }, [stepIndex])

  // Jump back to the start
  const reset = useCallback(() => {
    setStepIndex(-1)
    setIsPlaying(false)
    setIsDone(false)
    clearInterval(intervalRef.current)
  }, [])

  // Return everything the components need
  return {
    // State
    algorithm,  setAlgorithm,
    arraySize,  handleSizeChange,
    speed,      setSpeed,
    isPlaying,
    isDone,
    stepIndex,
    totalSteps: steps.length,
    currentStep,

    // Actions
    play,
    pause,
    stepForward,
    stepBackward,
    reset,
    newArray,
  }
}
