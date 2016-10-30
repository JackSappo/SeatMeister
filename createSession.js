const fs = require('fs');

//args
let sessionId = process.argv[2];
let minGroupSize = process.argv[3];
let maxGroupSize = process.argv[4];

//Error handling
if (sessionId.length > 8) throw new Error('SessionId too long. Please reduce to 8 or fewer characters.');

//Create new session
let session = {
  sessionId,
  minGroupSize,
  maxGroupSize,
}
session = JSON.stringify(session);

//Write session to file
fs.writeFile('sessions/' + sessionId + '.txt', session, {flag: 'wx'}, (err) => {
  if (err) throw err;
  console.log('File saved');
});
