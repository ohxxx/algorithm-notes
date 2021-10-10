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
  // const temp = array[a];
  // array[a] = array[b];
  // array[b] = temp;
  [array[a], array[b]] = [array[b], array[a]];
}

const bubbleSort = (array, compareFn = defaultCompare) => {
  const { length } = array
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1; j++) {
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) {
        swap(array, j, j + 1);
      }
    }
  }
}

// test
const arr = [5, 4, 3, 2, 1]

console.log('冒泡排序前 = ', arr);
bubbleSort(arr)
console.log('冒泡排序后 = ', arr);