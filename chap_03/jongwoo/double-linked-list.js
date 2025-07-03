class Node {
  // private로 설정하면 DoubleLinkedList 클래스에서 접근할 수 없으므로 관용적으로 사용하지 말라는 _ prefix 사용
  _data;
  _next;
  _prev;

  constructor(data) {
    this._data = data;
    this._next = null;
    this._prev = null;
  }
}

class DoubleLinkedList {
  #head;
  #tail;
  #size;

  constructor() {
    this.#head = null;
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

    if (this.empty()) {
      this.#head = this.#tail = newNode;
      ++this.#size;
      return;
    }

    newNode._next = this.#head;
    this.#head._prev = newNode;
    this.#head = newNode;
    ++this.#size;
  }

  pushBack(data) {
    const newNode = new Node(data);

    if (this.empty()) {
      this.#head = this.#tail = newNode;
      ++this.#size;
      return;
    }

    newNode._prev = this.#tail;
    this.#tail._next = newNode;
    this.#tail = newNode;
    ++this.#size;
  }

  popFront() {
    if (this.empty()) {
      throw new Error("리스트가 비어 있습니다.");
    }

    const ret = this.#head._data;

    if (this.size() === 1) {
      this.#head = this.#tail = null;
    } else {
      this.#head = this.#head._next;
      this.#head._prev = null;
    }
    --this.#size;

    return ret;
  }

  popBack() {
    if (this.empty()) {
      throw new Error("리스트가 비어 있습니다.");
    }

    const ret = this.#tail._data;

    if (this.size() === 1) {
      this.#head = this.#tail = null;
    } else {
      this.#tail = this.#tail._prev;
      this.#tail._next = null;
    }
    --this.#size;

    return ret;
  }

  find(data) {
    for (let node = this.#head; node != null; node = node._next) {
      if (node._data === data) {
        return node;
      }
    }

    return null;
  }

  insert(beforeNode, data) {
    if (!beforeNode) {
      return;
    }

    const newNode = new Node(data);
    newNode._next = beforeNode._next;
    if (beforeNode._next) {
      beforeNode._next._prev = newNode;
    }
    newNode._prev = beforeNode;
    beforeNode._next = newNode;
    if (beforeNode === this.#tail) {
      this.#tail = newNode;
    }

    ++this.#size;
  }

  delete(targetNode) {
    if (!targetNode) {
      return;
    }

    if (targetNode === this.#head) {
      this.popFront();
    } else if (targetNode === this.#tail) {
      this.popBack();
    } else {
      const beforeNode = targetNode._prev;
      beforeNode._next = targetNode._next;
      if (targetNode._next) {
        targetNode._next._prev = beforeNode;
      }
      --this.#size;
    }
  }

  toArray() {
    const arr = [];
    for (let node = this.#head; node != null; node = node._next) {
      arr.push(node._data);
    }
    return arr;
  }
}

const doubleLinkedList = new DoubleLinkedList();
doubleLinkedList.pushBack(10); // 10
doubleLinkedList.pushFront(9); // 9 10
doubleLinkedList.pushFront(8); // 8 9 10
doubleLinkedList.popFront(); // 9 10
console.log(doubleLinkedList.toArray());
doubleLinkedList.popBack(); // 9
doubleLinkedList.pushFront(7); // 7 9
console.log(doubleLinkedList.toArray());
doubleLinkedList.popBack(); // 7
doubleLinkedList.popFront(); //
console.log(doubleLinkedList.empty()); // true
doubleLinkedList.pushFront(1); // 1
console.log(doubleLinkedList.toArray());
doubleLinkedList.insert(doubleLinkedList.find(1), 999); // 1 999
doubleLinkedList.insert(doubleLinkedList.find(1), 555); // 1 555 999
doubleLinkedList.insert(doubleLinkedList.find(999), 1000); // 1 555 999 1000
doubleLinkedList.delete(doubleLinkedList.find(555)); // 1 999 1000
console.log(doubleLinkedList.toArray());
doubleLinkedList.delete(doubleLinkedList.find(1)); // 999 1000
console.log(doubleLinkedList.toArray());
doubleLinkedList.delete(doubleLinkedList.find(1000)); // 999
console.log(doubleLinkedList.toArray());
doubleLinkedList.delete(doubleLinkedList.find(999)); //
console.log(doubleLinkedList.toArray());
