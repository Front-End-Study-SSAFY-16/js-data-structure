class Node {
  // private로 설정하면 CircularLinkedList 클래스에서 접근할 수 없으므로 관용적으로 사용하지 말라는 _ prefix 사용
  _data;
  _next;

  constructor(data) {
    this._data = data;
    this._next = null;
  }
}

class CircularLinkedList {
  #tail;
  #size;

  constructor() {
    this.#tail = null;
    this.#size = 0;
  }

  size() {
    return this.#size;
  }

  empty() {
    return this.#size === 0;
  }

  pushFront(data) {
    const newNode = new Node(data);

    if (!this.#tail) {
      this.#tail = newNode;
      this.#tail._next = this.#tail;
    } else {
      newNode._next = this.#tail._next;
      this.#tail._next = newNode;
    }

    ++this.#size;
  }

  pushBack(data) {
    const newNode = new Node(data);

    if (!this.#tail) {
      this.#tail = newNode;
      this.#tail._next = this.#tail;
    } else {
      newNode._next = this.#tail;
      this.#tail = newNode;
    }

    ++this.#size;
  }

  popFront() {
    if (this.empty()) {
      throw new Error("리스트가 비어 있습니다.");
    }

    if (this.#size === 1) {
      const ret = this.#tail._data;
      this.#tail = null;
      --this.#size;
      return ret;
    }

    const ret = this.#tail._next.data;
    this.#tail._next = this.#tail._next._next;
    --this.#size;
    return ret;
  }

  popBack() {
    if (this.empty()) {
      throw new Error("리스트가 비어 있습니다.");
    }

    if (this.#size === 1) {
      const ret = this.#tail._data;
      this.#tail = null;
      --this.#size;
      return ret;
    }

    let node = this.#tail._next;
    while (node._next != this.#tail) {
      node = node._next;
    }

    const ret = this.#tail._data;
    node._next = this.#tail._next;
    --this.#size;
    return ret;
  }

  find(data) {
    if (this.empty()) {
      return null;
    }

    if (this.#tail._data === data) {
      return this.#tail;
    }

    for (let node = this.#tail._next; node != this.#tail; node = node._next) {
      if (node._data === data) {
        return node;
      }
    }

    return null;
  }

  insert(beforeNode, data) {
    if (beforeNode === this.#tail) {
      this.pushBack(data);
      return;
    }

    const newNode = new Node(data);

    for (let node = this.#tail._next; node != this.#tail; node = node._next) {
      if (node === beforeNode) {
        newNode._next = node._next;
        node._next = newNode;
        ++this.#size;
        break;
      }
    }
  }

  delete(targetNode) {
    if (!targetNode) {
      return;
    }

    // 마지막 노드를 삭제하는 경우
    if (targetNode === this.#tail) {
      let node = this.#tail._next;
      while (node._next != this.#tail) {
        node = node._next;
      }
      node._next = this.#tail._next;
      this.#tail = node;
      --this.#size;
    }
    // 첫번째 노드를 삭제하는 경우
    else if (targetNode === this.#tail._next) {
      this.#tail._next = this.#tail._next._next;
      --this.#size;
    } else {
      for (let node = this.#tail._next; node != this.#tail; node = node._next) {
        if (node._next === targetNode) {
          node._next = targetNode._next;
          --this.#size;
          break;
        }
      }
    }
  }

  reverse() {
    if (this.#size <= 1) {
      return;
    }

    const firstNode = this.#tail._next;
    let curNode = null;
    let prevNode = null;

    for (curNode = this.#tail._next; curNode != this.#tail; ) {
      const nextNode = curNode._next;
      curNode._next = prevNode;
      prevNode = curNode;
      curNode = nextNode;
    }

    curNode._next = prevNode;
    firstNode._next = this.#tail;
    this.#tail = firstNode;
  }

  toArray() {
    const arr = [];

    if (this.empty()) {
      return arr;
    }

    for (let node = this.#tail._next; node != this.#tail; node = node._next) {
      arr.push(node._data);
    }
    arr.push(this.#tail._data);

    return arr;
  }
}

const circularLinkedList = new CircularLinkedList();
circularLinkedList.pushBack(10); // 10
circularLinkedList.pushFront(9); // 9 10
circularLinkedList.pushFront(8); // 8 9 10
circularLinkedList.popFront(); // 9 10
circularLinkedList.popFront(); // 10
circularLinkedList.pushFront(7); // 7 10
circularLinkedList.insert(circularLinkedList.find(7), 8); // 7 8 10
circularLinkedList.pushFront(6); // 6 7 8 10
circularLinkedList.delete(circularLinkedList.find(7)); // 6 8 10
console.log(circularLinkedList.toArray());
circularLinkedList.reverse(); // 10 8 6
console.log(circularLinkedList.toArray());
console.log(circularLinkedList.size()); // 3
circularLinkedList.delete(circularLinkedList.find(10)); // 8 6
console.log(circularLinkedList.toArray());
circularLinkedList.delete(circularLinkedList.find(8)); // 6
console.log(circularLinkedList.toArray());
circularLinkedList.delete(circularLinkedList.find(6)); //
console.log(circularLinkedList.empty()); // true
