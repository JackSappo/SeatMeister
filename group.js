const fs = require('fs');
const util = require('./util/util.js');

let sessionId = process.argv[2];
let names = util.uniques(process.argv.slice(3));


//Calculate how large each group should be
function getGroupCounts(session, names) {
  let groupCounts = [];
  let namesLen = names.length;

  // Fills out groupCounts (finalVal adjusted later if needed)
  while (namesLen > session.maxGroupSize) {
    groupCounts.push(session.maxGroupSize);
    namesLen -= session.maxGroupSize;
  }
  groupCounts.push(namesLen);

  let finalVal = groupCounts[groupCounts.length - 1];

  // Adjusts finalVal if < minGroup
  if (finalVal < session.minGroupSize) {
    for (let idx = groupCounts.length - 2; idx >= 0; idx--) {
      let needed = session.minGroupSize - finalVal;
      let available = groupCounts[idx] - session.minGroupSize;
      if (available >= needed) {
        groupCounts[idx] -= needed;
        finalVal += needed;
        break;
      } else {
        groupCounts[idx] -= available;
        finalVal += available;
      }
    }
  }

  //Error handling: Seating arrangement impossible
  if (finalVal < session.minGroupSize) {
    return null;
  }

  groupCounts[groupCounts.length - 1] = finalVal;
  // console.log('groupCounts', groupCounts);
  return groupCounts;
}


//Fill groups with provided names
function assignSeats(session, names, groupCounts) {
  let namesCopy = names.slice();

  //Create the groups
  let groups = groupCounts.map(size => {
    let newGroup = []; //Group array to replace the count value
    let randomNameIdx = Math.floor(Math.random() * namesCopy.length);
    newGroup.push(namesCopy.splice(randomNameIdx, 1)[0]); //First name

    //Fill group's table
    while (newGroup.length < size) {
      let addedName, addedIdx, addedCount = 0;

      //Iterate through our list of names we're grouping
      for (let i = 0; i < namesCopy.length; i++) {
        let checkedName = namesCopy[i];
        let seatHistory = 0;

        //Iterate through the names already seated in this group
        for (let j = 0; j < newGroup.length; j++) {
          let groupedName = newGroup[j];
          seatHistory += session.edgeCount(checkedName, groupedName);
        }

        //Check if current name should be seated in group
        if (!addedName || seatHistory < addedCount) {
          addedName = checkedName;
          addedIdx = i;
          addedCount = seatHistory;
        }
      }

      newGroup.push(addedName); //Add name to table
      namesCopy.splice(addedIdx, 1); //Make name unavailable for this round
    }

    // console.log('returning', newGroup);
    return newGroup; //Replace size with our completed group
  });


  //Add edges to graph to track seating history
  groups.forEach(table => {
    session.connectTable(table);
  });
  session = JSON.stringify(session);
  fs.writeFile('./sessions/' + sessionId + '.txt', session, (err) => {
    if (err) throw err;
    util.displayResults(groups);
    return groups;
  });
}


//Combine above functions to create group
function createGroup(session, ...names) {
  names = names[0];
  let groupCounts = getGroupCounts(session, names);
  if (!groupCounts) {
    let errorText = 'Solution not possible. Cannot fit ' + names.length +
      ' names into groups of size ' + session.minGroupSize + '-' + session.maxGroupSize + '.';
    console.log(errorText);
    return errorText;
  }
  return assignSeats(session, names, groupCounts);
}


//Invoke functions
fs.readFile('./sessions/' + sessionId + '.txt', (err, sessionInfo) => {
  names = names.map(name => name.toLowerCase());
  if (names.length === 0) throw new Error('No names entered.')
  if (err) throw err;

  let session = util.parseSession(sessionInfo);

  //Add all names as nodes to graph
  names.forEach(name => {
    session.addNode(name);
  });

  createGroup(session, names);
});
