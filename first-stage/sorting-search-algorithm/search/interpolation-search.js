const interpolationSearch = (array, value) => {
  const { length } = array;
  let low = 0;
  let high = length - 1;
  let position = -1;
  let delta = -1;
  while (
    low <= high &&
    value >= array[low] &&
    value <= array[high]
  ) {
    delta = (Number(value) - Number(array[low])) / (Number(array[high]) - Number(array[low]));
    position = low + Math.floor((high - low) * delta);
    if (array[position] === value) {
      return position;
    }
    if (array[position] < value) {
      low = position + 1;
    } else {
      high = position - 1;
    }
  }
  return -1;
}


// test
const arr = [8, 7, 6, 5, 4, 3, 2, 1]

console.log(interpolationSearch(arr, 5));