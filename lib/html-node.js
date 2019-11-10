let Node = require("./node");

/**
 * Create a new HTML node
 * @constructor
 * @extends Node
 * @param {String} id The node ID
 * @return {Node}
 */
class HTMLNode extends Node {
  constructor(id) {
    super(id);
    this._isHTML = true;
    this._rows = [];
    this._tableAttributes = {};
  }

  /**
   * Add a table row
   * @param {Array.<Object>} cellData An array of cell data and attributes (supports 1 to many)
   *
   * @example
   * let g = new Graph();
   * let n1 = g.addHTMLNode('n1');
   * n1.addRow([
   *  {
   *      "data": "a",
   *      "attributes": {"port": "port0", "bgcolor":"lightgrey"}
   *  }
   * ]);
   */
  addRow(cellData) {
    let tableRow = "<tr>";
    let separator = "";

    cellData.forEach(key => {
      let cellAttributes = key.attributes;
      if (Object.keys(cellAttributes).length > 0) {
        tableRow = tableRow + "<td ";

        Object.entries(cellAttributes).forEach(([key, value]) => {
          tableRow = tableRow + separator + key + "=" + '"' + value + '"';
          separator = " ";
        });

        tableRow = tableRow + ">";
        separator = "";
      } else {
        tableRow = tableRow + "<td>";
      }

      tableRow = tableRow + key.data + "</td>";
    });

    tableRow = tableRow + "</tr>";

    this._rows.push(tableRow);
    return tableRow;
  }

  /**
   * Set HTML table element attributes
   *
   * @param {Object} attributes Object of attributes to set for the <table> element
   *
   * @example
   * let g = new Graph();
   * let n1 = g.addHTMLNode('n1');
   * n1.setTableAttributes({'border': '2'});
   */
  setTableAttributes(attributes) {
    this._tableAttributes = attributes;
  }

  /**
   * Generate the HTML table elements
   *
   * @return {String}
   * @private
   */
  generateTable() {
    let output = "";
    let separator = "";
    if (Object.keys(this._tableAttributes).length > 0) {
      output = output + "<table ";

      Object.entries(this._tableAttributes).forEach(([key, value]) => {
        output = output + separator + key + "=" + '"' + value + '"';
        separator = " ";
      });

      output = output + ">";
    } else {
      output = output + "<table>";
    }

    this._rows.forEach(value => {
      output = output + value;
    });

    output = output + "</table>";

    return output;
  }

  /**
   * Generate the DOT script for an HTML node
   *
   * @return {String}
   * @private
   */
  toDot() {
    this._attributes._items.label = "<" + this.generateTable() + ">";
    let output = '"' + this._id + '"' + this._attributes.toDot();
    return output;
  }
}

module.exports = HTMLNode;
