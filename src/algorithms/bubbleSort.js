// algorithms/bubbleSort.js
// Returns an ARRAY OF STEPS so the visualizer can replay them one by one.
//
// Each step is an object describing what's happening at that moment:
//   { array, comparing, swapping, sorted }
//
// - array     : current state of the numbers
// - comparing : indices being compared (highlighted amber)
// - swapping  : indices being swapped  (highlighted red)
// - sorted    : indices that are in their final position (highlighted blue)

export function getBubbleSortSteps(inputArray) {
  // Work on a copy so we don't mutate the original array
  const arr = [...inputArray]
  const steps = []        // we'll push a snapshot at each meaningful moment
  const sorted = new Set()  // tracks which indices are finalized

  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {

      // ── Step: show which two elements we're comparing ──
      steps.push({
        array:     [...arr],
        comparing: [j, j + 1],
        swapping:  [],
        sorted:    [...sorted],
      })

      // ── Swap if left element is bigger ──
      if (arr[j] > arr[j + 1]) {
        // Swap in the working array
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]

        // Step: show the swap happening
        steps.push({
          array:     [...arr],
          comparing: [],
          swapping:  [j, j + 1],
          sorted:    [...sorted],
        })
      }
    }

    // After each outer loop pass, the last unsorted element is now sorted
    sorted.add(n - 1 - i)

    // Step: highlight the newly sorted element
    steps.push({
      array:     [...arr],
      comparing: [],
      swapping:  [],
      sorted:    [...sorted],
    })
  }

  // Mark the very first element as sorted too (it must be smallest by now)
  sorted.add(0)

  // Final step: everything sorted, all bars blue
  steps.push({
    array:     [...arr],
    comparing: [],
    swapping:  [],
    sorted:    [...sorted],
  })

  return steps
}
