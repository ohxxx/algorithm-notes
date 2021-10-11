const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
}

const defaultCompare = (a, b) => {
  if (a === b) return Compare.EQUALS;
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

const findMaxValue = (array, compareFn = defaultCompare) => {
  if (array && array.length > 0) {
    let max = array[0]
    for (let i = 1; i < array.length; i++) {
      if (compareFn(max, array[i]) === Compare.LESS_THAN) {
        max = array[i]
      }
    }
    return max
  }
  return undefined
}

const countingSort = (array) => {
  if (array.length < 2) return array;

  const maxValue = findMaxValue(array)
  let sortedIndex = 0
  const counts = new Array(maxValue + 1)

  array.forEach(element => {
    if (!counts[element]) {
      counts[element] = 0
    }
    counts[element]++
  });

  counts.forEach((element, i) => {
    while (element > 0) {
      array[sortedIndex++] = i
      element--
    }
  })
  return array
}

// test
const arr = [5, 4, 3, 2, 1]

console.log('计数排序前 = ', arr);
countingSort(arr)
console.log('计数排序后 = ', arr);
