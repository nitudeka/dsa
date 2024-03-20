class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  add(value) {
    const node = new Node(value);

    if (this.head) {
      this.tail.next = node;
      this.tail = node;
    } else {
      this.head = node;
      this.tail = node;
    }
  }

  dequeue() {
    if (!this.head) return;

    this.head = this.head.next;

    if (!this.head) this.tail = null;
  }
}

const queue = new Queue();

queue.add(1);
queue.add(2);
queue.add(3);
queue.add(4);
queue.add(5);
queue.add(6);
queue.add(7);

queue.dequeue();
queue.dequeue();
queue.dequeue();
queue.dequeue();
queue.dequeue();

console.log(queue);

/*
 *
 * 1 - 2 - 3 - 4 - 5 - 6 - 7 - 8
 *
 */
