const quickSort = require('../sorting/quick-sort')

const binarySearch = (array, value) => {
  const sortedArray = quickSort(array);
  let low = 0;
  let high = sortedArray.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = sortedArray[mid];
    if (element < value) {
      low = mid + 1;
    } else if (element > value) {
      high = mid - 1;
    } else {
      return mid;
    }
  }
  return -1;
}

// test
const arr = [8, 7, 6, 5, 4, 3, 2, 1]

console.log(binarySearch(arr, 5));