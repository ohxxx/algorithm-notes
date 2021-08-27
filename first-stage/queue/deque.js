class Deque {
  constructor() {
    this.count = 0 // 控制队列大小
    this.lowestCount = 0  // 追踪第一个元素
    this.items = {} // 队列
  }

  /** 从双端队列的前端添加元素 */
  addFront(element) {
    /**
     * 添加元素有三种情况
     *  1、队列为空
     *  2、一个元素已经被从双端队列的前端删除，也就是说lowestCount >= 1，
     *    这种情况下、我们只需要将lowestCount减 1 并将新元素的值放在这个键的位置上
     *  3、当lowestCount为0的情况。可以设置一个负值的键，同时更新用于计算双端队列的长度的逻辑，
     *    使其也能包含负键值。这种情况下，添加一个新元素的操作依然能保持最低的计算成本。
     */
    if (this.isEmpty()) {
      this.addBack(element)
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element
    } else {
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++;
      this.items[0] = element
    }
  }

  /** 在双端队列后端中添加新元素 */
  addBack(element) {
    this.items[this.count] = element
    this.count++
  }

  /** 移除双端队列中前端的第一个元素 */
  removeFront() {
    if (this.isEmpty()) return null;

    const temp = this.items[this.lowestCount];
    delete this.items[this.lowestCount]
    this.lowestCount++
    return temp
  }

  /** 移除双端队列中后端的第一个元素 */
  removeBack() {
    if (this.isEmpty()) return null;

    this.count--
    const temp = this.items[this.count]
    delete this.items[this.count]
    return temp
  }

  /** 返回双端队列中前端的第一个元素 */
  peekFront() {
    if (this.isEmpty()) return null;

    return this.items[this.lowestCount]
  }

  /** 返回双端队列中后端的第一个元素 */
  peekBack() {
    if (this.isEmpty()) return null;

    return this.items[this.count - 1]
  }

  /** 检查双端队列是否为空，并获取它的长度 */
  isEmpty() {
    return this.size() === 0
  }

  /** 查看队队列个数 */
  size() {
    return this.count - this.lowestCount
  }

  /** 清空双端队列 */
  clear() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  /** 拓展-输出当前双端队列 */
  toString() {
    if (this.isEmpty()) return '';

    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString
  }


}

// test
const xxx = new Deque()
console.log(xxx.isEmpty());
xxx.addBack('XXX1')
xxx.addBack('XXX2')
console.log(xxx.toString());
xxx.addBack('XXX3')
console.log(xxx.toString());
console.log(xxx.size());
console.log(xxx.isEmpty());
xxx.removeFront()
console.log(xxx.toString());
xxx.removeBack()
console.log(xxx.toString());
xxx.addFront('XXX1')
console.log(xxx.toString());

console.log(xxx);