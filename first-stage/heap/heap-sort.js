function swap(array, a, b) {
  return [array[a], array[b]] = [array[b], array[a]];
}

function heapify(array, index, heapSize) {
  let largest = index
  const left = (2 * index) + 1
  const right = (2 * index) + 2

  if (
    left < heapSize &&
    array[left] > array[index]
  ) {
    largest = left
  }

  if (
    right < heapSize &&
    array[right] > array[largest]
  ) {
    largest = right
  }

  if (largest !== index) {
    swap(array, index, largest)
    heapify(array, largest, heapSize)
  }
}

function buildMaxHeap(array) {
  for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
    heapify(array, i, array.length)
  }

  return array
}

function heapSort(array) {
  let heapSize = array.length

  buildMaxHeap(array)

  while (heapSize > 1) {
    swap(array, 0, --heapSize)
    heapify(array, 0, heapSize)
  }

  return array
}

// test 
const arr = [7, 6, 3, 5, 4, 1, 2]

console.log(heapSort(arr));