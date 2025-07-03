class Node {
  // private로 설정하면 SingleLinkedList 클래스에서 접근할 수 없으므로 관용적으로 사용하지 말라는 _ prefix 사용
  _data;
  _next;

  constructor(data) {
    this._data = data;
    this._next = null;
  }
}

class SingleLinkedList {
  #head;
  #size;

  constructor() {
    this.#head = null;
    this.#size = 0;
  }

  size() {
    return this.#size;
  }

  empty() {
    return this.#size === 0;
  }

  push(data) {
    const newNode = new Node(data);

    if (!this.#head) {
      this.#head = newNode;
    } else {
      newNode._next = this.#head;
      this.#head = newNode;
    }

    ++this.#size;
  }

  pop() {
    if (this.empty()) {
      throw new Error("리스트가 비어 있습니다.");
    }

    const ret = this.#head._data;
    this.#head = this.#head._next;
    --this.#size;

    return ret;
  }

  find(data) {
    for (let node = this.#head; node != null; node = node._next) {
      if (node._data === data) {
        return node;
      }
    }
  }

  insert(beforeNode, data) {
    if (!beforeNode) {
      return;
    }

    for (let node = this.#head; node != null; node = node._next) {
      if (node === beforeNode) {
        const newNode = new Node(data);
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

    if (this.#head === targetNode) {
      this.#head = this.#head._next;
      --this.#size;
    } else {
      for (let node = this.#head; node._next != null; node = node._next) {
        if (node._next === targetNode) {
          node._next = node._next._next;
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

    let curNode = null;
    let prevNode = null;
    for (curNode = this.#head; curNode != null; ) {
      const nextNode = curNode._next;
      curNode._next = prevNode;
      prevNode = curNode;
      curNode = nextNode;
    }

    this.#head = prevNode;
  }

  toArray() {
    const arr = [];
    for (let node = this.#head; node != null; node = node._next) {
      arr.push(node._data);
    }
    return arr;
  }
}

singleLinkedList = new SingleLinkedList();
singleLinkedList.push(10); // 10
singleLinkedList.push(9); // 9 10
singleLinkedList.push(8); // 8 9 10
singleLinkedList.pop(); // 9 10
singleLinkedList.pop(); // 10
singleLinkedList.push(7); // 7 10
singleLinkedList.insert(singleLinkedList.find(7), 8); // 7 8 10
singleLinkedList.push(6); // 6 7 8 10
singleLinkedList.delete(singleLinkedList.find(7)); // 6 8 10
console.log(singleLinkedList.toArray());
singleLinkedList.reverse(); // 10 8 6
console.log(singleLinkedList.toArray());
console.log(singleLinkedList.size()); // 3
singleLinkedList.delete(singleLinkedList.find(10)); // 8 6
console.log(singleLinkedList.toArray());
singleLinkedList.delete(singleLinkedList.find(8)); // 6
console.log(singleLinkedList.toArray());
singleLinkedList.delete(singleLinkedList.find(6)); //
console.log(singleLinkedList.empty()); // true
