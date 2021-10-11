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

const selectionSort = (array, compareFn = defaultCompare) => {
  const { length } = array
  let indexMin

  for (let i = 0; i < length - 1; i++) {
    indexMin = i

    for (let j = i; j < length; j++) {
      if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) {
        indexMin = j
      }
    }
    if (i !== indexMin) swap(array, i, indexMin);
  }

  return array
}

// test
const arr = [5, 4, 3, 2, 1]

console.log('选择排序前 = ', arr);
selectionSort(arr)
console.log('选择排序后 = ', arr);