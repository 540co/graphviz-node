let Node = require("./node");
let HTMLNode = require("./html-node");
let Edge = require("./edge");
let Attributes = require("./attributes");

let fs = require("fs");

/**
 * Create a new graph
 * @constructor
 * @param {String} [id] The graph ID
 * @return {Graph}
 *
 * @example
 * let g = new Graph();
 */
class Graph {
  constructor(id) {
    this._relativeGraph = null;
    this._id = id || "";
    this._type = "graph";
    this._clusters = {};
    this._nodes = {};
    this._htmlNodes = {};
    this._edges = [];
    this._graphAttributes = new Attributes("G");
    this._nodesAttributes = new Attributes("N");
    this._edgesAttributes = new Attributes("E");
  }

  /**
   * Add a subgraph to current graph
   * @param {Object} graph The graph to add as subgraph/cluster
   * @return {Graph}
   * 
   * @example
   * let g = new Graph("parent");
   * let c = new Graph("cluster0");
   * 
   * g.setSubgraph(c);
   */
  addSubgraph(graph) {
    if (!graph._type === this._type) {
      console.error("Cannot add subgraph of different type...");
      throw "Cannot add subgraph of different type...";
    }

    this._clusters[graph._id] = graph;
    graph._relativeGraph = this;

    return this._clusters[graph._id];
  }

  /**
   * Create a new node
   * @param {String} id The node ID
   * @param {Object} [attributes] Node attributes
   * @return {Node}
   *
   * @example
   * let g = new Graph();
   * let n1 = g.addNode('n1', {'color': 'blue'}); // Creates new node with color of blue
   */
  addNode(id, attributes) {
    this._nodes[id] = new Node(id);

    if (attributes) {
      this._nodes[id]._attributes.set(attributes);
    }

    return this._nodes[id];
  }

  /**
   * Create a new HTML node
   *
   * @param {String} id The node ID
   * @param {Object} [attributes] HTML table attributes
   * @return {Node}
   *
   * @example
   * let g = new Graph();
   * let n1 = g.addHTMLNode('n1', {'shape': 'none'}); // Creates new HTML node with no shape
   */
  addHTMLNode(id, attributes) {
    this._htmlNodes[id] = new HTMLNode(id);

    if (attributes) {
      this._htmlNodes[id]._attributes.set(attributes);
    }

    return this._htmlNodes[id];
  }

  /**
   * Remove a node
   *
   * @param {String} id The node ID
   * @param {Boolean} [force] Remove edges related to node
   *
   * @example
   * let g = new Graph();
   * g.removeNode('n1', true); // Removes node "n1" and edges related to node
   */
  removeNode(id, force) {
    if (force === true) {
      for (let i = 0; i < this.edges.length; ++i) {
        if (
          this.edges[i].nodeOne._id == id ||
          this.edges[i].nodeTwo._id == id
        ) {
          delete this.edges[i];
        }
      }
    }

    if (this._nodes.hasOwnProperty(id)) {
      delete this._nodes[id];
    }
  }

  /**
   * Return a node for a given ID
   *
   * @param {String} id The node ID
   * @return {Node}
   *
   * @example
   * let g = new Graph();
   * g.getNode('n1'); // Returns node "n1" object
   */
  getNode(id) {
    return this._nodes[id];
  }

  /**
   * Return the number of nodes in the current graph
   *
   * @return {Integer} Count of nodes in current graph
   *
   * @example
   * let g = new Graph();
   * g.nodeCount(); // Returns number of nodes in current Graph object
   */
  nodeCount() {
    return Object.keys(this._nodes).length;
  }

  /**
   * Create a new edge
   *
   * @param {String|Node} nodeOne The start node
   * @param {String|Node} nodeTwo The end node
   * @param {Object} [attributes] Node attributes
   * @return {Edge}
   *
   * @example
   * let g = new Graph();
   * g.addEdge('n1', 'n2', {'style': 'dotted'}); // Creates an edge between nodes "n1" and "n2" with dotted arrow
   */
  addEdge(nodeOne, nodeTwo, attributes) {
    let _nodeOne = nodeOne;
    let _nodeTwo = nodeTwo;

    if (typeof nodeOne == "string") {
      _nodeOne = this._nodes[nodeOne];

      if (_nodeOne == null) {
        _nodeOne = this.addNode(nodeOne);
      }
    }

    if (typeof nodeTwo == "string") {
      _nodeTwo = this._nodes[nodeTwo];
      if (_nodeTwo == null) {
        _nodeTwo = this.addNode(nodeTwo);
      }
    }

    let edge = new Edge(this, _nodeOne, _nodeTwo);

    if (attributes) {
      edge._attributes.set(attributes);
    }

    this._edges.push(edge);

    return edge;
  }

  /**
   * Return the number of edges in the current graph
   *
   * @return {Integer} Count of edges in the current graph
   *
   * @example
   * let g = new Graph();
   * g.edgeCount(); // Returns number of edges in current node
   */
  edgeCount() {
    return this._edges.length;
  }

  /**
   * Set graph attributes
   *
   * @param {Object} attributes Graph attributes
   *
   * @example
   * let g = new Graph();
   * g.set({'padding': '5'}); // Sets the global Graph attributes
   */
  set(attributes) {
    this._graphAttributes.set(attributes);
  }

  /**
   * Get graph attributes
   *
   * @return {Attributes} Graph attributes
   *
   * @example
   * let g = new Graph();
   * g.get(); // Returns the global Graph attributes
   */
  get() {
    return this._graphAttributes.get();
  }

  /**
   * Set a global node attribute
   *
   * @param {Object} attributes The attributes
   *
   * @example
   * let g = new Graph();
   * g.setNodesAttributes({'shape': 'star'}); // Sets the global Nodes attributes
   */
  setNodesAttributes(attributes) {
    this._nodesAttributes.set(attributes);
  }

  /**
   * Get a global node attribute
   *
   * @return {Attributes} The current global node attributes
   *
   * @example
   * let g = new Graph();
   * g.getNodesAttributes(); // Returns the global Nodes attributes
   */
  getNodesAttributes() {
    return this._nodesAttributes.get();
  }

  /**
   * Set a global edge attribute
   *
   * @param {Object} attributes The attributes
   *
   * @example
   * let g = new Graph();
   * g.setEdgesAttributes({'style': 'dotted'}); // Sets the global Edges attributes
   */
  setEdgesAttributes(attributes) {
    this._edgesAttributes.set(attributes);
  }

  /**
   * Get a global edge attribute
   *
   * @return {Attributes} The current global edge attributes
   *
   * @example
   * let g = new Graph();
   * g.getEdgesAttributes(); // Returns the global Edges attributes
   */
  getEdgesAttributes() {
    return this._edgesAttributes.get();
  }

  /**
   * Generate the GraphViz script
   *
   * @return {String} Verbatim DOT source code string to be rendered by Graphviz.
   *
   * @example
   * let g = new Graph();
   * g.toDot(); // Create DOT source code string
   */
  toDot() {
    let dotScript = "";
    let spacer = "";

    if (!this._relativeGraph) {
      spacer = "  ";
      dotScript = this._type + ' "' + this._id + '" {\n';
    } else {
      spacer = "    ";
      dotScript = '  subgraph' + ' "' + this._id + '" {\n';
    }

    // Graph attributes
    if (this._graphAttributes.length() > 0) {
      dotScript = dotScript +  spacer + "graph" + this._graphAttributes.toDot() + ";\n";
    }

    // Node attributes
    if (this._nodesAttributes.length() > 0) {
      dotScript = dotScript + spacer + "node" + this._nodesAttributes.toDot() + ";\n";
    }

    // Edge attributes
    if (this._edgesAttributes.length() > 0) {
      dotScript = dotScript + spacer + "edge" + this._edgesAttributes.toDot() + ";\n";
    }

     // Each cluster
     for (let [key] of Object.entries(this._clusters)) {
      if (this._clusters.hasOwnProperty(key)) {
        dotScript = dotScript + this._clusters[key].toDot() + "\n";
      }
    }

    // Each node
    for (let [key] of Object.entries(this._nodes)) {
      if (this._nodes.hasOwnProperty(key)) {
        dotScript = dotScript + spacer + this._nodes[key].toDot() + ";\n";
      }
    }

    // Each HTML node
    for (let [key] of Object.entries(this._htmlNodes)) {
      if (this._htmlNodes.hasOwnProperty(key)) {
        dotScript = dotScript + spacer +  this._htmlNodes[key].toDot() + ";\n";
      }
    }

    // Each edge
    for (let i = 0; i < this._edges.length; i++) {
      dotScript = dotScript + spacer + this._edges[i].toDot() + ";\n";
    }

    if (this._relativeGraph) {
      dotScript += "  }";
    } else {
      dotScript += "}\n";
    }

    return dotScript;
  }

  /**
   * Generate the Graphviz dot file
   *
   * @param {String} [filename=out] The optional name for the dot file
   *
   * @example
   * let g = new Graph();
   * g.render("example"); // Create DOT file and name it "example.dot". Defaults to
   */
  render(filename) {
    let dotScript = this.toDot();
    let file = "out.dot";
    if (filename) {
      file = filename + ".dot";
    }

    fs.writeFile(file, dotScript, err => {
      // throws an error, you could also catch it here
      if (err) throw err;

      // success case, the file was saved
      console.log("Dot file saved to " + file);
    });
  }
}

module.exports = Graph;