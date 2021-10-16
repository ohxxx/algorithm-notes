const matrixChainOrder = (p, i = 1, j = p.length - 1) => {
  if (i === j) return 0;

  let min = Number.MAX_SAFE_INTEGER;

  for (let k = i; k < j; k++) {
    const count = matrixChainOrder(p, i, k) + matrixChainOrder(p, k + 1, j) + ((p[i - 1] * p[k]) * p[j]);
    if (count < min) { min = count; }
  }

  return min;
}


// test
const p = [10, 100, 5, 50, 1]

console.log(matrixChainOrder(p))

