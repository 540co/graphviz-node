# Graphviz-node

A simple node wrapper for graphviz inspired by https://github.com/glejeune/node-graphviz. This library has a dependency of [Graphviz](http://www.graphviz.org/). 

## Documentation

To view docs run the following:

```bash
npm run generate-docs
npm run docs
```

Js docs will automatically open in your browser.

## Getting Started

```js
let Graph = require('../graph');

// Create new graph
let g = new Graph();

// Create nodes
let n1 = g.addNode("Node 1", {"color": "blue"});
let n2 = g.addNode("Node 2");

// Add edge between the two nodes
let e1 = g.addEdge(n1, n2);
e1.set({"style": "dotted"});

// Print dot file
let dotScript = g.toDot();
console.log(dotScript);

// Genereate the dot file
g.render("example");
```

## Basic Usage

The graphviz module provides one `Graph` class.  It creates graph descriptions in the DOT language for **directed** graphs.

Create a directed graph by instantiating a new Graph object:

```js
let Graph = require('../graph');

// Create new graph
let g = new Graph("The Round Table");

// New directed Graph object
console.log(g);
```

The constructor allows to set the graph's `name` for the DOT source and the rendered graph.

Add nodes and edges to the graph object using it's `addNode()` and `addEdge()` methods.

```js
// Create nodes
let n1 = g.addNode("Node 1");
let n2 = g.addNode("Node 2");

// Add edge between the two nodes
let e1 = g.addEdge(n1, n2);
```
The `addNode()` method takes a name identifier as first argument and an optional attributes object. The `addEdge()` method takes the names of start and end node and an optional attributes object. For a litst of node/edge attributes (see Graphviz docs).

Check the generated source code:

```js
console.log(g.toDot());
```

Use the `render()` method to save the source code and render it with the default layout program (dot, see below for using other layout commands).

```js
g.render("test-output");
```

### Styling

Use the `set()`, `setNodesAttributes()` and `setEdgesAttributes()` methods to change the default appearance of your graph, nodes, and edges.

```js
let graphAttributes = {
    "rankdir":"LR",
    "nodesep":"0.5",
    "ranksep": "1",
    "labeljust":"l"
};

let nodesAttributes = {
    "shape": "note",
    "margin": ".2",
    "style": "filled",
    "fillcolor": "#999999",
    "fontcolor": "white"
}

let edgesAttributes = {
    "style": "dotted"
}

// Create new graph
let g = new Graph();

// Set graph attributes
g.set(graphAttributes);
g.setNodesAttributes(nodesAttributes);
g.setEdgesAttributes(edgesAttributes);

console.log(g.toDot());
```

### Attributes

To directly add attritbute statements (affecting all following graph, node, or edge items within the same graph, use `set()` method with the target or pass an optional attributes object on declaration:

**Node Attributes**
```js
// Option 1
let attributes = {
    "shape": "note",
    "margin": ".2",
    "style": "filled",
    "fillcolor": "#999999",
    "fontcolor": "white"
}

let n1 = g.addNode("node 1", attributes);

// Option 2
let n1 = g.addNode("node 1");
n1.set({"shape": "note"});
```

**Edge Attributes**
```js
// Option 1
let attributes = {
    "style": "dotted",
    "color": "orange"
}

let e1 = g.addEdge("1", "2", attributes);

// Option 2
let e1 = g.addEdge("1", "2");
e1.set({"shape": "note"});
```



