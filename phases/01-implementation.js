class KeyValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

class HashTable { // get O(1), set O(1), deleteKey O(1)

  constructor(numBuckets = 8) {
    // Initialize your buckets here
    this.capacity = numBuckets;
    this.data = new Array(this.capacity).fill(null);
    this.count = 0;
  }

  hash(key) {
    let hashValue = 0;

    for (let i = 0; i < key.length; i++) {
      hashValue += key.charCodeAt(i);
    }

    return hashValue;
  }

  hashMod(key) {
    // Get index after hashing
    return this.hash(key) % this.capacity;
  }


  insert(key, value) {
    const loadFactor = this.count / this.capacity;
    if (loadFactor > 0.7) {
      this.resize()
    }

    const index = this.hashMod(key);
    const keyPair = new KeyValuePair(key, value);

    if (!this.data[index]) {
      this.data[index] = keyPair;
    } else {
      let current = this.data[index];
      while (current) {
        if (current.key === key) {
          current.value = value;
          return;
        }

        current = current.next;
      }

      keyPair.next = this.data[index];
      this.data[index] = keyPair;
    };

    this.count++;
  }


  read(key) {
    const index = this.hashMod(key);

    let current = this.data[index];
    while (current) {
      if (current.key === key) {
        return current.value;
      }

      current = current.next;
    };

    return undefined;
  }


  resize() {
    const copyData = this.data.slice();

    this.capacity *= 2;

    this.data = new Array(this.capacity).fill(null);

    this.count = 0;

    for (const keyPair of copyData) {
      let current = keyPair;
      while (current) {
        this.insert(current.key, current.value);
        current = current.next;
      }
    };

  }


  delete(key) {
    const index = this.hashMod(key);
    //prev.next -> current.next
    //prev = current
    let current = this.data[index];
    let prev = null;

    while (current) {
      if (current.key === key) {
        if (prev === null) {
          this.data[index] = current.next;
        } else {
          prev.next = current.next;
        };

        this.count--;
        return undefined;
      }

      prev = current;
      current = current.next
    };

    return "Key not found"
  }
}


module.exports = HashTable;
