## Description
A simple utility to help organize table groupings, ensuring that employees who sit together are less likely to be paired together in the future.

## Motivation
Organizing seating for large events can be maddening. Let SeatMeister do the organizing for you!

## Tech Stack
Just good ol' fashioned Node.js

## Usage
### Setup
All input takes place via the command line. To set up, simply download the app and navigate to its root directory.  
No additional modules are required.

### Creating a session
`./lunchgrouper.sh create_session (sessionId) (minGroupSize) (maxGroupSize)`  
ex: ./lunchgrouper.sh create_session abcd 2 3  
- **sessionId**: Any string of 8 or fewer characters. Represents a unique session ID which tracks which users set next to each other.
- **minGroupSize**: Any integer. Represents the minimum amount of attendees that may be assigned to a group.
- **maxGroupSize**: Any integer. Represents the maximum amount of attendees that may be assigned to a group.

### Grouping attendees
`./lunchgrouper.sh group (sessionId) (...names)`  
ex: ./lunchgrouper.sh group abcd Allen Billy Jimmy Donny Sandra  
- **sessionId**: Must match a previously created session ID.
- **{names}**: Any amount of space-delimited names.

### Demo mode
`./lunchgrouper.sh demo`  
ex: ./lunchgrouper.sh demo  

Creates a session with ID "demo", already populated with 9 names.  

## Approach
- Attendees' seating histories with one another are tracked via a graph.
- When a list of attendees is given, they are incrementally assigned to groups based on who they have previously sat with.
- Once a round of seating is complete, the session's seating history is updated to avoid any repeats in the future.


## Roadmap
- Add a UI! This implementation was solely to show off Node.js, but if this app were to be realistically used it would need a UI.
- Implement improved graph persistence using Neo4j.
- Ability to modify a session's minimum & maximum group size after creating it. Easy fix, not included per instruction.
- Improved handling for impossible seating combinations.
- More interesting group constraints. Mixing genders, ensuring new attendees aren't all assigned to one table, etc.
