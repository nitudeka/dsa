class Node {
  constructor(value, indx) {
    this.value = value;
    this.next = null;
    this.index = indx;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.count = 0;
  }

  add(value) {
    const node = new Node(value, this.count);

    if (this.head) {
      this.tail.next = node;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }

    this.count = this.count + 1;

    // console.log("adding to queue. total:-", this.count);
  }

  dequeue() {
    if (!this.head) {
      this.count = 0;
      return { value: null };
    }

    const temp = this.head;
    this.head = this.head.next;

    if (!this.head) this.tail = null;
    else this.count = this.count - 1;

    // console.log("dequing. total:-", this.count);
    return { value: temp.value, index: temp.index };
  }
}

module.exports = Queue;
