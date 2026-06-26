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

  inOrderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("A callback is required");

    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    };

    traverse(this.root);
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("A callback is required");

    const traverse = (node) => {
      if (node === null) return;
      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    };

    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function")
      throw new Error("A callback is required");

    const traverse = (node) => {
      if (node === null) return;
      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    };

    traverse(this.root);
  }

  height(value) {
    let r = this.root;

    const heightOfNode = (node) => {
      if (node === null) {
        return -1;
      }
      return 1 + Math.max(heightOfNode(node.left), heightOfNode(node.right));
    };

    while (r !== null) {
      if (value === r.data) {
        return heightOfNode(r);
      } else if (value < r.data) {
        r = r.left;
      } else {
        r = r.right;
      }
    }
    return undefined;
  }

  depth(value) {
    let r = this.root;
    let c = 0;
    while (r !== null) {
      if (value === r.data) {
        return c;
      } else if (value < r.data) {
        r = r.left;
      } else {
        r = r.right;
      }
      c++;
    }
    return undefined;
  }

  isBalanced() {
    const checkHeight = (node) => {
      if (node === null) return -1;

      const leftHeight = checkHeight(node.left);
      const rightHeight = checkHeight(node.right);

      if (leftHeight === -2) return -2;
      if (rightHeight === -2) return -2;

      if (Math.abs(leftHeight - rightHeight) > 1) return -2;

      return 1 + Math.max(leftHeight, rightHeight);
    };

    return checkHeight(this.root) !== -2;
  }

  rebalance() {
    const values = [];
    this.inOrderForEach((v) => values.push(v));
    this.root = this.buildTree(values);
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


const randomArray = (size) =>
  Array.from({ length: size }, () => Math.floor(Math.random() * 100));

const tree = new Tree(randomArray(5));
console.log(tree.isBalanced());
prettyPrint(tree.root);

const levelOrder = [];
const preOrder = [];
const postOrder = [];
const inOrder = [];

tree.levelOrderForEach((v) => levelOrder.push(v));
tree.preOrderForEach((v) => preOrder.push(v));
tree.postOrderForEach((v) => postOrder.push(v));
tree.inOrderForEach((v) => inOrder.push(v));

console.log("levelOrder:", levelOrder);
console.log("preOrder:", preOrder);
console.log("postOrder:", postOrder);
console.log("inOrder:", inOrder);

tree.insert(200);
tree.insert(300);
tree.insert(400);
tree.insert(500);

console.log(tree.isBalanced());
prettyPrint(tree.root);

tree.rebalance();

console.log(tree.isBalanced());
prettyPrint(tree.root);

const levelOrder2 = [];
const preOrder2 = [];
const postOrder2 = [];
const inOrder2 = [];

tree.levelOrderForEach((v) => levelOrder2.push(v));
tree.preOrderForEach((v) => preOrder2.push(v));
tree.postOrderForEach((v) => postOrder2.push(v));
tree.inOrderForEach((v) => inOrder2.push(v));

console.log("levelOrder:", levelOrder2);
console.log("preOrder:", preOrder2);
console.log("postOrder:", postOrder2);
console.log("inOrder:", inOrder2);