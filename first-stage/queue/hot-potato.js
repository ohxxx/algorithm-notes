// 队列
class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {}
  }

  // 入队
  enqueue(element) {
    this.items[this.count] = element
    this.count++
  }

  // 出队
  dequeue() {
    const temp = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return temp
  }

  // 队列长度
  size() {
    return this.count - this.lowestCount
  }
}

function HotPotato(elementsList, num) {
  // 初始化队列
  const queue = new Queue()
  // 淘汰名单
  const eliminatedList = []

  for (let i = 0; i < elementsList.length; i++) {
    queue.enqueue(elementsList[i])
  }

  while (queue.size() > 1) {
    for (let i = 0; i < num; i++) {
      /**
       * 关键点：因为要围成一个圈
       */
      queue.enqueue(queue.dequeue())
    }
    eliminatedList.push(queue.dequeue())
  }

  return {
    eliminated: eliminatedList,
    winner: queue.dequeue()
  }
}

// test
const names = ['A', 'B', 'C', 'D', 'E', 'F', 'H']
const result = HotPotato(names, 6)

result.eliminated.forEach(ele => {
  console.log(`${ele}在击鼓传花中淘汰`)
})

console.log(`在击鼓传花中${result.winner}获得了胜利`);