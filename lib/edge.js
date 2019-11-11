let Attributes = require("./attributes");

/**
 * Create a new edge
 * @constructor
 * @param {String|Node} nodeOne The first node
 * @param {String|Node} nodeTwo The second node
 * @param {Object} [attributes] The attributes object to set for the edge
 * @return {Edge}
 */
class Edge {
  constructor(nodeOne, nodeTwo, attributes) {
    this._nodeOne = {
      node: nodeOne,
      port: null,
      portDirection: null
    };
    this._nodeTwo = {
      node: nodeTwo,
      port: null,
      portDirection: null
    };
    this._attributes = new Attributes("E");

    if (attributes) {
      this._attributes = Object.entries(attributes);
    }
  }

  /**
   * Set an edge attributes
   * @param {Object} attributes The attributes for an edge
   *
   * @example
   * let g = new Graph();
   * let e1 = g.addEdge('n1', 'n2');
   * e1.set({'style': 'dotted'}); // Sets the current edge attributes
   */
  set(attributes) {
    this._attributes.set(attributes);
  }

  /**
   * Get edge attributes
   *
   * @return {Object} Edge attributes
   *
   * @example
   * let g = new Graph();
   * let e1 = g.addEdge('n1', 'n2');
   * e1.get(); // Returns the current edge attributes
   */
  get() {
    return this._attributes.get();
  }

  /**
   * Set the start node port
   *
   * @param {String} port The name of a port
   * @param {String} [portDirection] The port's compass point ("n", "ne","e", "se", "s", "sw", "w" or "nw")
   *
   * @example
   * let g = new Graph();
   * let e1 = g.addEdge('n1', 'n2');
   * e1.setNodeOnePort('port0', 's'); // Sets the start node port name and compass direction
   */
  setNodeOnePort(port, portDirection) {
    this._nodeOne.port = port;
    this._nodeOne.portDirection = portDirection;
  }

  /**
   * Set the end node port
   *
   * @param {String} port The name of a port
   * @param {String} [portDirection] The port's compass point ("n", "ne","e", "se", "s", "sw", "w" or "nw")
   *
   * @example
   * let g = new Graph();
   * let e1 = g.addEdge('n1', 'n2');
   * e1.setNodeTwoPort('port1', 'nw'); // Sets the end node port name and compass direction
   */
  setNodeTwoPort(port, portDirection) {
    this._nodeTwo.port = port;
    this._nodeTwo.portDirection = portDirection;
  }

  /**
   * Generate the DOT script for a node port
   *
   * @param {Node} node The start/end node of the current edge
   * @return {String}
   * @private
   */
  portToDot(node) {
    let output = "";

    Object.entries(node).forEach(([key, value]) => {
      if (key !== "node") {
        if (value) {
          output += ":" + value;
        }
      }
    });

    return output;
  }

  /**
   * Generate the DOT script for an edge
   *
   * @return {String}
   * @private
   */
  toDot() {
    let edgeOperator = "->";
    let output =
      '"' +
      this._nodeOne.node._id +
      '"' +
      this.portToDot(this._nodeOne) +
      " " +
      edgeOperator +
      " " +
      '"' +
      this._nodeTwo.node._id +
      '"' +
      this.portToDot(this._nodeTwo);
    output = output + this._attributes.toDot();
    return output;
  }
}

module.exports = Edge;