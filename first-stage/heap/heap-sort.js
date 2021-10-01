const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
}

function defaultCompare(a, b) {
  if (a === b) {
    return Compare.EQUALS;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

function swap(array, a, b) {
  return [array[a], array[b]] = [array[b], array[a]];
}

function heapify(array, index, heapSize, compareFn) {
  let largest = index
  const left = (2 * index) + 1
  const right = (2 * index) + 2

  if (left < heapSize && compareFn(array[left], array[index]) > 0) {
    largest = left
  }

  if (right < heapSize && compareFn(array[right], array[largest]) > 0) {
    largest = right
  }

  if (largest !== index) {
    swap(array, index, largest)
    heapify(array, largest, heapSize, compareFn)
  }
}

function buildMaxHeap(array, compareFn) {
  for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
    heapify(array, i, array.length, compareFn)
  }

  return array
}

function heapSort(array, compareFn = defaultCompare) {
  let heapSize = array.length

  buildMaxHeap(array, compareFn)

  while (heapSize > 1) {
    swap(array, 0, --heapSize)
    heapify(array, 0, heapSize, compareFn)
  }

  return array
}

// test 
const arr = [7, 6, 3, 5, 4, 1, 2]

console.log(heapSort(arr));