const quickSort = require('../sorting/quick-sort')

const binarySearchRecursive = (array, value, low, high) => {
  if (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const element = array[mid];
    if (element < value) {
      return binarySearchRecursive(array, value, mid + 1, high);
    }
    if (element > value) {
      return binarySearchRecursive(array, value, low, mid - 1);
    }
    return mid;
  }
  return -1;
}

const binarySearch = (array, value) => {
  const sortedArray = quickSort(array);
  const low = 0;
  const high = sortedArray.length - 1;
  return binarySearchRecursive(array, value, low, high);
}


// test
const arr = [8, 7, 6, 5, 4, 3, 2, 1]

console.log(binarySearch(arr, 5));