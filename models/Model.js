class Model {
  constructor(number) {
    this.number = number;
    this.parent = null;
    this.children = [];
  }

  addChildNode(node) {
    this.children.push(node);
  }

  setParent(node) {
    this.parent = node;
  }

  isNodeRoot() {
    return this.parent === null;
  }
}

module.exports = Model;