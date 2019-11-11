let Graph = require("./graph");

/**
 * Create a new digraph
 * @constructor
 * @extends Graph
 * @param {String} [id] The graph ID
 * @return {Graph}
 *
 * @example
 * let g = new Digraph();
 */
class Digraph extends Graph {
  constructor(id) {
    super(id);
    this._type = "digraph";
  }
}

module.exports = Digraph;