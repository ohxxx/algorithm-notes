const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
  EQUALS: 0
}

const defaultCompare = (a, b) => {
  if (a === b) return Compare.EQUALS;
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

const merge = (left, right, compareFn) => {
  let i = 0;
  let j = 0;
  const result = []

  while (i < left.length && j < right.length) {
    result.push(compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]);
  }

  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}

const mergeSort = (array, compareFn = defaultCompare) => {
  if (array.length > 1) {
    const { length } = array
    const middle = Math.floor(length / 2)
    const left = mergeSort(array.slice(0, middle), compareFn)
    const right = mergeSort(array.slice(middle, length), compareFn)
    array = merge(left, right, compareFn)
  }

  return array
}


// test
const arr = [5, 4, 3, 2, 1]

console.log('归并排序前 = ', arr);
mergeSort(arr)
console.log('归并排序后 = ', arr);