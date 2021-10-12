const sequentialSearch = (array, value) => {
  for (let i = 0; i < array.length; i++) {
    if (value === array[i]) return i;
  }
  return -1;
}

// test
const arr = [5, 4, 3, 2, 1]

console.log(sequentialSearch(arr, 3));