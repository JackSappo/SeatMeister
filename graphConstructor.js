// Create Graph
const Graph = function() {
  this._nodes = {};
};

// Return a boolean value indicating if the value passed to contains is represented in the graph.
Graph.prototype.contains = function(node) {
  return !!this._nodes[node];
};

// Add a node to the graph, passing in the node's value.
Graph.prototype.addNode = function(node) {
  if (!this.contains(node)) {
    this._nodes[node] = {
      edges: {}
    };
  }
};

// Returns a boolean indicating whether two specified nodes are connected.  Pass in the values contained in each of the two nodes.
Graph.prototype.hasEdge = function(fromNode, toNode) {
  if (!this.contains(fromNode)) {
    return false;
  }
  return !!this._nodes[fromNode].edges[toNode];
};

// Connects two nodes in a graph by adding an edge between them.
Graph.prototype.addEdge = function(fromNode, toNode) {
  if (!this.contains(fromNode) || !this.contains(toNode)) {
    console.log('doesn\'t contain one');
    return;
  }

  // Increment times seated
  let pairHistory = this._nodes[fromNode].edges[toNode] + 1 || 1;
  this._nodes[fromNode].edges[toNode] = pairHistory;
  this._nodes[toNode].edges[fromNode] = pairHistory;
};

// Add edges to all seated at a table
Graph.prototype.connectTable = function(table) {
  //Iterate through names at table
  for (let j = 0; j < table.length; j++) {
    let seatedName = table[j];
    //Add edge between each guest
    for (let k = j + 1; k < table.length; k++) {
      let neighborName = table[k];
      this.addEdge(seatedName, neighborName);
    }
  }
  // console.log('post-connected', this._nodes);
}

// Counts edges between two nodes
Graph.prototype.edgeCount = function(fromNode, toNode) {
  if (!this.contains(fromNode) || !this.contains(toNode)) {
    return 0;
  }

  return this._nodes[fromNode].edges[toNode] || 0;
};

// Pass in a callback which will be executed on each node of the graph.
Graph.prototype.forEachNode = function(cb) {
  for (let node in this._nodes) {
    cb(node);
  }
};

module.exports = Graph;

/* CURRENTLY UNUSED METHODS

  // Removes a node from the graph.
  Graph.prototype.removeNode = function(node) {
    if (this.contains(node)) {
      // Removes edges between node to be deleted and all other connected nodes.
      for (let targetNode in this._nodes[node].edges) {
        this.removeEdge(node, targetNode);
      }
      delete this._nodes[node];
    }
  };

  // Remove an edge between any two specified (by value) nodes.
  Graph.prototype.removeEdge = function(fromNode, toNode) {
    if (!this.contains(fromNode) || !this.contains(toNode)) {
      return;
    }

    // Remove edges from each node's edge list
    delete this._nodes[fromNode].edges[toNode];
    delete this._nodes[toNode].edges[fromNode];
  };



*/
