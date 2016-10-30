## Description
A simple utility to help organize table groupings, ensuring that employees who sit together are less likely to be paired together in the future.

## Motivation
Organizing seating for large events can be maddening. Let SeatMeister do the organizing for you!

## Tech Stack
Node.js

## Usage
### Setup
All input takes place via the command line. To set up, simply download the app and navigate to its root directory.  
No additional modules are required.
### Creating a session
`./lunchgrouper.sh sessionId minGroupSize maxGroupSize`
- **sessionId**: Any string of 8 or fewer characters. Represents a unique session ID which tracks which users set next to each other.
- **minGroupSize**: Any integer. Represents the minimum amount of attendees that may be assigned to a group
- **maxGroupSize**: Any integer. Represents the maximum amount of attendees that may be assigned to a group  
### Demo mode
`./lunchgrouper.sh demo`
Creates a session with ID "demo", already populated with 9 names.  
### Grouping attendees
`./lunchgrouper.sh sessionId {names}`
- **sessionId**: Must match a previously created session ID.
- **{names}**: Any amount of space-delimited names.

## Approach
- Attendees' seating histories with one another are tracked via a graph.
- When a list of attendees is given, they are incrementally assigned to groups based on who they have previously sat with.
- Once a round of seating is complete, the session's seating history is updated to avoid any repeats in the future.


## Roadmap
- Add a UI! This implementation was solely to show off Node.js, but if this app were to be realistically used it would need a UI.
- Ability to modify a session's minimum & maximum group size after creating it. Easy fix, not included per instruction.
- Improved handling for impossible seating combinations.
- More interesting group constraints. Mixing genders, ensuring new attendees aren't all assigned to one table, etc.
