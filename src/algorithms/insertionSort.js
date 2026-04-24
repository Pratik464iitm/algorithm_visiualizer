// algorithms/insertionSort.js
// Returns an array of steps for Insertion Sort visualization.
//
// How Insertion Sort works:
//   - Start from index 1
//   - Pick the current element (the "key")
//   - Shift all larger elements one position to the right
//   - Insert the key into its correct position
//
// Each step: { array, comparing, swapping, sorted, key }
//   key — the index of the element currently being inserted (shown differently)

export function getInsertionSortSteps(inputArray) {
  const arr = [...inputArray]
  const steps = []
  const sorted = new Set([0])  // index 0 is "sorted" by default (1-element subarray)

  const n = arr.length

  for (let i = 1; i < n; i++) {
    const keyValue = arr[i]   // the element we're trying to place correctly
    let j = i - 1

    // Step: show which element we're about to insert
    steps.push({
      array:     [...arr],
      comparing: [i],
      swapping:  [],
      sorted:    [...sorted],
      key:       i,
    })

    // Shift elements that are greater than keyValue one position right
    while (j >= 0 && arr[j] > keyValue) {
      // Step: comparing current key against arr[j]
      steps.push({
        array:     [...arr],
        comparing: [j, j + 1],
        swapping:  [],
        sorted:    [...sorted],
        key:       j + 1,
      })

      // Shift arr[j] one spot to the right
      arr[j + 1] = arr[j]

      // Step: show the shift (treated as a swap visually)
      steps.push({
        array:     [...arr],
        comparing: [],
        swapping:  [j, j + 1],
        sorted:    [...sorted],
        key:       j,
      })

      j--
    }

    // Place the key in its correct position
    arr[j + 1] = keyValue

    // Mark everything up to i as sorted
    for (let k = 0; k <= i; k++) sorted.add(k)

    // Step: key placed, show updated sorted region
    steps.push({
      array:     [...arr],
      comparing: [],
      swapping:  [],
      sorted:    [...sorted],
      key:       j + 1,
    })
  }

  // Final step: fully sorted
  steps.push({
    array:     [...arr],
    comparing: [],
    swapping:  [],
    sorted:    new Set(arr.map((_, idx) => idx)),
    key:       -1,
  })

  return steps
}
