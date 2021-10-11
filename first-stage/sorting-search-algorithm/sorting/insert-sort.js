const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
}

const defaultCompare = (a, b) => {
  if (a === b) return Compare.EQUALS;
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

const insertionSort = (array, compareFn = defaultCompare) => {
  const { length } = array
  let temp

  for (let i = 1; i < length; i++) {
    let j = i
    temp = array[i]

    while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) {
      array[j] = array[j - 1]
      j--
    }
    array[j] = temp
  }
  return array
}

// test
const arr = [5, 4, 3, 2, 1]

console.log('插入排序前 = ', arr);
insertionSort(arr)
console.log('插入排序后 = ', arr);
