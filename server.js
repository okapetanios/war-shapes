/** SERVER CONFIGURATION */
const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require("path");

// Choose a port, default is 4002 (could be almost anything)
const PORT = process.env.PORT || 4002;

// When on Heroku, serve the UI from the build folder
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'build')));
    app.get('*', (req, res) => {
        res.sendfile(path.join(__dirname = 'build/index.html'));
    })
}

// When on local host, server from the public folder. 
// Rule will not be written if production conditional has executed
app.get('*', (req, res) => {
    app.sendFile(path.join(__dirname + 'public/index.html'));
})

// Listen for client connections
server.listen(PORT, () => console.log(`Listening on ${PORT}`));

// Object to map client ids
const clients = {}

// player at index 0 is p1 and at index 1 is p2
let players = [];

let playerOnePieces = [0, 1, 2, 3, 4];
let playerTwoPieces = [20, 21, 22, 23, 24];
// Set less pieces for testing:
// playerOnePieces = [0];
// playerTwoPieces = [20];

let playerOneMove = null;
let playerTwoMove = null;

const resolveMove = () => {
    playerOnePieces = playerOnePieces.filter(tile => tile !== playerOneMove.origin);
    playerOnePieces.push(playerOneMove.destination);

    playerTwoPieces = playerTwoPieces.filter(tile => tile !== playerTwoMove.origin);
    playerTwoPieces.push(playerTwoMove.destination);

    io.to(players[0]).emit("set pieces", {
        playerPieces: playerOnePieces,
        playerColor: "red",
        opponentPieces: playerTwoPieces,
        opponentColor: "blue"

    });
    io.to(players[1]).emit("set pieces", {
        playerPieces: playerTwoPieces,
        playerColor: "blue",
        opponentPieces: playerOnePieces,
        opponentColor: "red"
    });
    let playerOneMessage = {}
    let playerTwoMessage = {}
    let playerOneRoll = null;
    let playerTwoRoll = null;

    for (let i = 0; i < playerOnePieces.length; i++) {
        if (playerTwoPieces.includes(playerOnePieces[i])) {
            playerOneRoll = Math.random() * 12;
            playerTwoRoll = Math.random() * 12;
            while (Math.round(playerOneRoll) === Math.round(playerTwoRoll)) {
                playerOneRoll = Math.random() * 12;
                playerTwoRoll = Math.random() * 12;
            }
            if (playerOneRoll < playerTwoRoll) {
                playerOnePieces = playerOnePieces.filter(
                    e => e !== playerOnePieces[i]
                );
                if (playerOnePieces.length === 0) {
                    io.to(players[0]).emit("gameover", { loser: "red" }
                    )

                    io.to(players[1]).emit("gameover", { loser: "red" }
                    )
                }
            } else {
                playerTwoPieces = playerTwoPieces.filter(
                    e => e !== playerOnePieces[i]
                );
                if (playerTwoPieces.length === 0) {
                    io.to(players[0]).emit("gameover", {
                        loser: "blue",
                        playerPieces: playerOnePieces,
                        playerColor: "red",
                        opponentPieces: playerTwoPieces,
                        opponentColor: "blue"
                    }
                    )

                    io.to(players[1]).emit("gameover", {
                        loser: "blue",
                        playerPieces: playerTwoPieces,
                        playerColor: "blue",
                        opponentPieces: playerOnePieces,
                        opponentColor: "red"
                    }
                    )
                }
            }
        }
    }

    playerOneMessage.playerPieces = playerOnePieces
    playerOneMessage.opponentPieces = playerTwoPieces
    if (playerOneRoll !== null) {
        playerOneMessage.playerRoll = Math.round(playerOneRoll);
        playerOneMessage.opponentRoll = Math.round(playerTwoRoll);
    }

    playerTwoMessage.playerPieces = playerTwoPieces
    playerTwoMessage.opponentPieces = playerOnePieces
    if (playerTwoRoll !== null) {
        playerTwoMessage.playerRoll = Math.round(playerTwoRoll);
        playerTwoMessage.opponentRoll = Math.round(playerOneRoll);
    }

    // if game isn't over then run these, otherwise don't
    if (playerOnePieces.length !== 0 && playerTwoPieces.length !== 0) {
        io.to(players[0]).emit("set pieces", playerOneMessage);
        io.to(players[1]).emit("set pieces", playerTwoMessage);
        playerOneMove = null;
        playerTwoMove = null;
        io.to(players[0]).emit("pieces moved", {
            playerColor: "red",
            opponentColor: "blue"
        });
        io.to(players[1]).emit("pieces moved", {
            playerColor: "blue",
            opponentColor: "red"
        });
    }
}

io.on("connection", client => {
    // Send messages to and receive messages from the client in here

    client.emit("initial message", "Hello " + client.id);

    client.on("join", () => {
        if (!Object.keys(clients).includes(client.id)) {
            client.emit("app joined", {
                numClients: Object.keys(clients).length
            });
            clients[client.id] = client.id;

            if (players.length < 2) {
                players.push(client.id);
                client.emit("joined game", players.length);
                if (players.length === 2) {
                    for (let i = 0; i < players.length; i++) {
                        io.to(players[i]).emit("game start")
                    }
                    io.to(players[0]).emit("set pieces", {
                        playerPieces: playerOnePieces,
                        playerColor: "red",
                        opponentPieces: playerTwoPieces,
                        opponentColor: "blue"
                    });
                    io.to(players[1]).emit("set pieces", {
                        playerPieces: playerTwoPieces,
                        playerColor: "blue",
                        opponentPieces: playerOnePieces,
                        opponentColor: "red"
                    })
                }
            } else {
                client.emit("game full", "the game is full");
            }
        }
    })

    client.on('move piece', msg => {
        if (client.id === players[0]) {
            playerOneMove = msg;
            if (playerTwoMove === null) {
                client.emit('wait for opponent', 'wait for opponent');
            } else {
                resolveMove();
            }
        } else if (client.id === players[1]) {
            playerTwoMove = msg;
            if (playerOneMove === null) {
                client.emit('wait for opponent', 'wait for opponent');
            } else {
                resolveMove();
            }
        }
    })

    client.on('disconnect', () => {
        if (players.includes(client.id)) {
            for (let i = 0; i < players.length; i++) {
                if (players[i] !== client.id) {
                    io.to(players[i]).emit("opponent disconnected");
                    players = [players[i]];
                    playerOnePieces = [0, 1, 2, 3, 4];
                    playerTwoPieces = [20, 21, 22, 23, 24];
                    // Set less pieces for testing:
                    // playerOnePieces = [0];
                    // playerTwoPieces = [20];
                }
            }
        }
    })
})