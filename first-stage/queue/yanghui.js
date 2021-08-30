// 队列
class Queue {
  constructor() {
    this.count = 0
    this.lowestCount = 0
    this.items = {}
  }

  // 入队
  enqueue(element) {
    this.items[this.count] = element
    this.count++
  }

  // 出队
  dequeue() {
    if (this.isEmpty()) return null;

    const temp = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return temp
  }

  // 队列长度
  size() {
    return this.count - this.lowestCount
  }

  // 队列是否为空
  isEmpty() {
    return this.size() === 0
  }

}

function YangHui(n) {
  const queue = new Queue();

  // 先存第一行的数据
  queue.enqueue(1);

  // 第一层循环控制层数
  for (let i = 1; i <= n; i++) {
    let res = '';
    let pre = 0;
    // 第二层控制当前层的数据
    for (var j = 0; j < i; j++) {
      var item = queue.dequeue();
      // 计算下一行的值
      var count = item + pre;
      pre = item;
      res += item + ' ';
      queue.enqueue(count);
    }
    // 将每层的最后一个数值 1 存入队列中
    queue.enqueue(1);

    console.log(res);
  }
}

// test
YangHui(7)