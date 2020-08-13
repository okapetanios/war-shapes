# Joshua Baron and Eric Egan Fnal Project - WAR SHAPES
## Project description
War Shapes is a prototype, simultaneous turn-based game to test user interface principles for a simultaneous, turn-based game. The first player to
lose all their pieces loses.
To test all the UI aspects for this prototype, move a player's piece to a tile. Then move to the same tile with the other player. Repeat until one player loses all of their pieces.

## Instructions for running
Clone the repo, run npm install, and run npm start.
Open two tabs and navigate to localhost:3000.
Each tab will be a different player.
Any extra tabs that attempt to connect will be told
to wait with a modal as the app only supports two 
players.

## Data manipulated and displayed
Our app manipulates the amount of pieces left on the board as well as the piece locations and uses ui principles to communicate to each player their status
along with their opponent's.

## Two different users
First two players and others trying to join a game.
As we have limited the number of players to two, when a third user attempts to join (via opening a third tab and navigating to localhost:3000) they will be 
notified that two players are already playing.

## Things we did not do
It is a prototype to test the simultaneous-based mechanic. There is definitely polishing to be done for
a final product.
