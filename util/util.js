const Graph = require('./graphConstructor.js');

exports.initialCap = function (str) {
  if (!str || typeof str !== 'string') return;
  return str[0].toUpperCase() + str.slice(1);
};

exports.parseSession = function(sessionInfo) {
  let newSession = new Graph();
  sessionInfo = JSON.parse(sessionInfo)
  newSession.sessionId = sessionInfo.sessionId;
  newSession.minGroupSize = sessionInfo.minGroupSize;
  newSession.maxGroupSize = sessionInfo.maxGroupSize;
  newSession._nodes =  sessionInfo._nodes || {};

  return newSession;
};

exports.displayResults = function(groups) {
  console.log('\n');
  groups.forEach((group, i) => {
    console.log('\tGROUP', i + 1);
    group.forEach(name => {
      console.log(exports.initialCap(name));
    });
  });
};

exports.uniques = function(names) {
  names = new Set(names);
  return [...names]
};
