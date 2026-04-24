// algorithms/selectionSort.js
// Returns steps for Selection Sort visualization.
//
// How Selection Sort works:
//   - Find the minimum element in the unsorted part
//   - Swap it with the first unsorted element
//   - Expand the sorted region by one
//
// Each step: { array, comparing, swapping, sorted, minIndex }
//   minIndex — current candidate for minimum (shown with a special marker)

export function getSelectionSortSteps(inputArray) {
  const arr = [...inputArray]
  const steps = []
  const sorted = new Set()

  const n = arr.length

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i   // assume current position is the minimum

    // Step: start of a new pass
    steps.push({
      array:     [...arr],
      comparing: [i],
      swapping:  [],
      sorted:    [...sorted],
      minIndex:  minIdx,
    })

    // Scan the rest of the array to find the true minimum
    for (let j = i + 1; j < n; j++) {
      // Step: comparing j against current minimum
      steps.push({
        array:     [...arr],
        comparing: [j, minIdx],
        swapping:  [],
        sorted:    [...sorted],
        minIndex:  minIdx,
      })

      if (arr[j] < arr[minIdx]) {
        minIdx = j   // found a new minimum

        // Step: update minimum marker
        steps.push({
          array:     [...arr],
          comparing: [j],
          swapping:  [],
          sorted:    [...sorted],
          minIndex:  minIdx,
        })
      }
    }

    // Swap minimum into position i (if it's not already there)
    if (minIdx !== i) {
      ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]

      steps.push({
        array:     [...arr],
        comparing: [],
        swapping:  [i, minIdx],
        sorted:    [...sorted],
        minIndex:  -1,
      })
    }

    // Mark position i as sorted
    sorted.add(i)

    steps.push({
      array:     [...arr],
      comparing: [],
      swapping:  [],
      sorted:    [...sorted],
      minIndex:  -1,
    })
  }

  // Last element is automatically sorted
  sorted.add(n - 1)
  steps.push({
    array:     [...arr],
    comparing: [],
    swapping:  [],
    sorted:    [...sorted],
    minIndex:  -1,
  })

  return steps
}
