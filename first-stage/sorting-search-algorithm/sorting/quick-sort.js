const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
}

const defaultCompare = (a, b) => {
  if (a === b) return Compare.EQUALS;
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

const swap = (array, a, b) => {
  [array[a], array[b]] = [array[b], array[a]];
}


const partition = (array, left, right, compareFn) => {
  const pivot = array[Math.floor((right + left) / 2)]
  let i = left
  let j = right

  while (i <= j) {
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) {
      i++
    }

    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) {
      j--
    }

    if (i <= j) {
      swap(array, i, j)
      i++
      j--
    }
  }
  return i
}

const quick = (array, left, right, compareFn) => {
  let index
  if (array.length > 1) {
    index = partition(array, left, right, compareFn)
    if (left < index - 1) {
      quick(array, left, index - 1, compareFn)
    }
    if (index < right) {
      quick(array, index, right, compareFn)
    }
  }
  return array
}

const quickSort = (array, compareFn = defaultCompare) => {
  return quick(array, 0, array.length - 1, compareFn);
}

// test
const arr = [5, 4, 3, 2, 1]

console.log('快速排序前 = ', arr);
quickSort(arr)
console.log('快速排序后 = ', arr);