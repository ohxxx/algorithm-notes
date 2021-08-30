// 双端队列 - 为空判断暂时不加
class Deque {
  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  // 前端-出队
  removeFront() {
    if (this.isEmpty()) return null;

    const temp = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return temp
  }

  // 后端-入队
  addBack(element) {
    this.items[this.count] = element
    this.count++
  }

  // 后端-出队
  removeBack() {
    if (this.isEmpty()) return null;

    this.count--
    const temp = this.items[this.count]
    delete this.items[this.count]
    return temp
  }

  // 双端队列长度
  size() {
    return this.count - this.lowestCount
  }

  // 双端队列是否为空
  isEmpty() {
    return this.size() === 0
  }
}

function PalindromeChecker(aString) {

  if (
    aString === undefined ||
    aString === null ||
    (aString !== null && aString.length === 0)
  ) {
    return false;
  }

  const deque = new Deque()
  const lowerString = aString.toLocaleLowerCase().split(' ').join('')

  for (let i = 0; i < lowerString.length; i++) {
    // 入队
    deque.addBack(lowerString.charAt(i))
  }

  while (deque.size() > 1) {
    /**
     * 关键点：
     *  双端进行出队操作，如果值不相同则不是回文，否则是的
     */
    if (deque.removeFront() !== deque.removeBack()) {
      return false
    }
  }

  return true

}

// test
console.log('a', PalindromeChecker('a'));
console.log('aa', PalindromeChecker('aa'))
console.log('madam', PalindromeChecker('madam'));
console.log('racecar', PalindromeChecker('racecar'))
console.log('hello', PalindromeChecker('hello'))
console.log('he  eh', PalindromeChecker('he  eh'))