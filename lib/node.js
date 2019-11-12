let Attributes = require("./attributes");

/**
 * Create a new node
 * @constructor
 * @param {String} id The node ID
 * @return {Node}
 */
class Node {
  constructor(id) {
    this._id = id;
    this._attributes = new Attributes("N");
  }

  /**
   * Set node attributes
   *
   * @param {Object} attributes The attributes Ex: {key: value}
   *
   * @example
   * let g = new Graph();
   * let n1 = g.addNode('n1');
   * n1.set({'color':'purple'}); // Sets the node's attributes
   */
  set(attributes) {
    this._attributes.set(attributes);
  }

  /**
   * Get graph attributes
   *
   * @return {Object} The current global Graph attributes
   *
   * @example
   * let g = new Graph();
   * let n1 = g.addNode('n1');
   * n1.get(); // Returns the current node's attributes
   */
  get() {
    return this._attributes.get();
  }

  /**
   * Generate the DOT script for a node
   *
   * @return {String}
   * @private
   */
  toDot() {
    let output = '"' + this._id + '"' + this._attributes.toDot();
    return output;
  }
}

module.exports = Node;
