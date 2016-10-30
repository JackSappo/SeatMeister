const fs = require('fs');

//Create graph
const Graph = require('./graphConstructor.js');
let groupHistory = new Graph();

groupHistory.sessionId = 'demo';
groupHistory.minGroupSize = 3;
groupHistory.maxGroupSize = 4;

//Placeholder vars
let namesList = ['Allen', 'Dan', 'Ellen', 'Joy', 'Lisa', 'Nick', 'Omar', 'Joey', 'Ronald'];
names = namesList.map(name => name.toLowerCase());
// let names = namesList.slice(0,9); //Reduce names if want to

// Add nodes for each name
names.forEach(name => {
  groupHistory.addNode(name);
});

groupHistory = JSON.stringify(groupHistory);

fs.writeFile('sessions/demo.txt', groupHistory, (err) => {
  if (err) throw err;
  console.log('File saved');
});
