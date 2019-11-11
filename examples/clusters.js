let Graph = require('../index');

// Create new graph
let g = new Graph("Subgraph Example");

// Create parent nodes
let start = g.addNode("start", {"shape": "Mdiamond"});
let end = g.addNode("end", {"shape": "Msquare"});
let a0 = g.addNode("a0");
let a1 = g.addNode("a1");
let a2 = g.addNode("a2");
let a3 = g.addNode("a3");
let b0 = g.addNode("b0");
let b1 = g.addNode("b1");
let b2 = g.addNode("b2");
let b3 = g.addNode("b3");

// Create edges
g.addEdge(start, a0);
g.addEdge(start, b0);
g.addEdge(a1, b3);
g.addEdge(b2, a3);
g.addEdge(a3, a0);
g.addEdge(a3, end);
g.addEdge(b3, end);

// Create graph and set nodes and edges
let c0 = new Graph("cluster0");
c0.set({"style":"filled", "color":"lightgrey", "label": "process #1"});
c0.setNodesAttributes({"style":"filled", "color":"white"});
c0.addEdge(a0, a1);
c0.addEdge(a1, a2);
c0.addEdge(a2, a3);

// Create graph and set nodes and edges
let c1 = new Graph("cluster1");
c1.set({"color":"blue", "label":"process #2"});
c1.setNodesAttributes({"style":"filled"});
c1.addEdge(b0, b1);
c1.addEdge(b1, b2);
c1.addEdge(b2, b3);

// Associate subgraphs
g.addSubgraph(c0);
g.addSubgraph(c1);

// Print dot file
let dotScript = g.toDot();
console.log(dotScript);