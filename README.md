# Graphviz-node

A simple node wrapper for [Graphviz](http://www.graphviz.org/).  

> **NOTE:** This is a stripped down node implementation of [Graphviz](http://www.graphviz.org/). It does not support support undirected graph  objects, clusters or subgraphs. For more bugs/issues or additional features please submit an issue.

## Documentation

To view docs run the following:

```bash
npm run generate-docs
npm run docs
```

Js docs will automatically open in your browser.

You can also view node examples in the `samples/` directory.

## Prerequisite

- [Node](https://nodejs.org/en/)
- [Graphviz](http://www.graphviz.org/)

## Installation

```
npm install graphviz-node --save
```

## Getting Started

```js
let Graph = require('../graph');

// Create new graph
let g = new Graph();

// Create nodes
let a = g.addNode("A", {"color": "blue"});
let b = g.addNode("B");
let c = g.addNode("C");

// Add edge between the two nodes
let e1 = g.addEdge(a, b);
let e2 = g.addEdge(a, c);
let e3 = g.addEdge(b, c, {'constraint': false});

// Print dot file
let dotScript = g.toDot();
console.log(dotScript);

// Genereate the dot file
g.render("example");
```

![getting-started](./.assets/getting-started.svg)

## Basic Usage

The graphviz module provides one `Graph` class.  It creates graph descriptions in the DOT language for **directed** graphs.

Create a directed graph by instantiating a new Graph object:

```js
let Graph = require('../graph');

// Create new graph
let g = new Graph("Example");

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

To directly add attritbute statements (affecting all following graph, node, or edge items within the same graph, use `set()` method with the target or pass an optional attributes object on declaration.

A full list of node, Eege, and graph attributes can be found here: http://www.graphviz.org/doc/info/attrs.html

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
e1.set({"style": "dotted"});
```

**Example Attributes**

```js
// Create new graph
let g = new Graph();
g.set({'rankdir': 'LR'});

let n1 = g.addNode("node 1");
n1.set({"shape": "note"});

let n2 = g.addNode("node 2");
n2.set({"shape": "egg"});

let e1 = g.addEdge(n1, n2);
e1.set({"color": "purple"});

console.log(g.toDot());
```

![HTML Node Table](./.assets/attributes.svg)

## HTML Nodes

HTML nodes are the same as regular nodes with embedded HTML in the label attribute. This library supports the ability to create HTML-like nodes using special methods to help build the HTML table syntax automatically.

The HTML node class `extends` the Node class with the addition of specific methods to build a table with rows for the node's label.

**Example 1**

The `addRow()` methods allows for an array of objects that define the `<td>` element data and attributes. The following example creates an HTML table with one row (`<tr>`) and three columns (`<td>`).

```js
// Create new graph
let g = new Graph();

let h1 = g.addHTMLNode('h1', {'shape':'none'});
h1.setTableAttributes({'border':'0', 'cellborder':'1', 'cellspacing':'0', 'cellpadding': '4'});
h1.addRow([
 {
     "data": "left",
     "attributes": {"port": "port0"}
 },
 {
     "data": "middle",
     "attributes": {"port": "port1"}
 },
 {
     "data": "right",
     "attributes": {"port": "port2"}
 }
]);

console.log(g.toDot());

// dot syntax that gets generated...
digraph {
  "h1" [shape=none, label=<<table border="0" cellborder="1" cellspacing="0" cellpadding="4"><tr><td port="port0">left</td><td port="port1">middle</td><td port="port2">right</td></tr></table>>];
}
```

![HTML Node Table](./.assets/html.svg)

**Example 2**

```js
// Create new graph
let g = new Graph('html');

let h1 = g.addHTMLNode('abc', {'shape':'none', 'margin':'0'});
h1.setTableAttributes({'border':'0', 'cellborder':'1', 'cellspacing':'0', 'cellpadding':'4'});
h1.addRow([{'data':'<FONT COLOR="red">hello</FONT><BR/>world','attributes':{'rowspan':'3'}}, {'data':'b', 'attributes':{'colspan':'3'}}, {'data':'g', 'attributes':{'rowspan':'3', 'bgcolor':'lightgrey'}}, {'data':'h', 'attributes':{'rowspan':'3'}}]);
h1.addRow([{'data':'c','attributes':{}}, {'data':'d', 'attributes':{'port':'here'}}, {'data':'e', 'attributes':{}}]);
h1.addRow([{'data':'f','attributes':{'colspan':'3'}}]);

console.log(g.toDot());

// Dot syntax that gets generated...
digraph "html" {
  "abc" [shape=none, margin=0, label=<<table border="0" cellborder="1" cellspacing="0" cellpadding="4"><tr><td rowspan="3"><FONT COLOR="red">hello</FONT><BR/>world</td><td colspan="3">b</td><td rowspan="3" bgcolor="lightgrey">g</td><td rowspan="3">h</td></tr><tr><td>c</td><td port="here">d</td><td>e</td></tr><tr><td colspan="3">f</td></tr></table>>];
}
```

![HTML Node Table 2](./.assets/html_2.svg)

## Attribution

This library was heavily inspired by https://github.com/glejeune/node-graphviz. Code was rewritten to support a stripped down version for specific use-cases. For a more complete set of features and support of graphviz, please consider using glejeune's implementation (Undirected graphs, clusters, subgraphs, etc.).
