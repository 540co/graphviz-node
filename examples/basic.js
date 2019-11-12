let { Digraph } = require("../index");

// Create new graph
let g = new Digraph();

// Create nodes
let a = g.addNode("A", { color: "blue", label: "A foo bar baz" });
let b = g.addNode("B");
let c = g.addNode("C");

// Add edge between the two nodes
let e1 = g.addEdge(a, b);
let e2 = g.addEdge(a, c);
let e3 = g.addEdge(b, c, { constraint: false });

// Print dot file
let dotScript = g.toDot();
console.log(dotScript);
