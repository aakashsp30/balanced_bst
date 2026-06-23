class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (array.length === 0) return null;

    const unique_array = Array.from(new Set([...array].sort((a, b) => a - b)));

    const buildRecursive = (start, end) => {
      if (start > end) {
        return null;
      }

      const mid = Math.floor((start + end) / 2);
      const node = new Node(unique_array[mid]);

      node.left = buildRecursive(start, mid - 1);
      node.right = buildRecursive(mid + 1, end);

      return node;
    };

    return buildRecursive(0, unique_array.length - 1);
  }

  includes(value) {
    let r = this.root;
    while (r !== null) {
      if (value === r.data) {
        return true;
      } else if (value < r.data) {
        r = r.left;
      } else {
        r = r.right;
      }
    }
    return false;
  }

  insert(value) {
    if (this.root === null) return (this.root = new Node(value));
    let r = this.root;
    while (r !== null) {
      if (r.data === value) return;
      if (r.data > value && r.left !== null) {
        r = r.left;
      } else if (r.data < value && r.right !== null) {
        r = r.right;
      } else break;
    }

    if (r.data > value) r.left = new Node(value);
    else r.right = new Node(value);
  }

  deleteItem(value) {
    this.root = this.deleteRecursive(this.root, value);
  }

  deleteRecursive(node, value) {
    if (node === null) return null;

    if (value < node.data) {
      node.left = this.deleteRecursive(node.left, value);
    } else if (value > node.data) {
      node.right = this.deleteRecursive(node.right, value);
    } else {
      if (node.left === null && node.right === null) return null;
      else if (node.left === null) return node.right;
      else if (node.right === null) return node.left;
      else {
        let curr = node.right;
        while (curr !== null && curr.left !== null) curr = curr.left;
        node.data = curr.data;
        node.right = this.deleteRecursive(node.right, curr.data);
      }
    }
    return node;
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("A callback is required");
    if (this.root === null) return null;
    const queue = [];
    queue.push(this.root);
    while (queue.length !== 0) {
      const front = queue.shift();
      callback(front.data);
      if (front.left !== null) queue.push(front.left);
      if (front.right !== null) queue.push(front.right);
    }
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(tree.root);
// console.log(tree.includes(8));
// console.log("--- inserting duplicate 8 ---");
// tree.insert(8);
// prettyPrint(tree.root);

// tree.insert(100);
// console.log("--- after inserting 100 ---");
// prettyPrint(tree.root);

// tree.deleteItem(3);
// console.log("--- after deleting leaf 3 ---");
// prettyPrint(tree.root);

// tree.deleteItem(67);
// console.log("--- after deleting 67 (two children) ---");
// prettyPrint(tree.root);

// tree.deleteItem(8);
// console.log("--- after deleting root 8 ---");
// prettyPrint(tree.root);

// tree.deleteItem(999);
// console.log("--- after deleting nonexistent 999 ---");
// prettyPrint(tree.root);
const result = []
tree.levelOrderForEach((value) => result.push(value));
console.log(result);