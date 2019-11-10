let Graph = require('../index');

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
