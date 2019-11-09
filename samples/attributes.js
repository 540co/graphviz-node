let Graph = require('../index');

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