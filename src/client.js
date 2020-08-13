/** CLIENT CONFIGURATION - connect to the server */
import store from "./redux/store";
import {
    setClashRoll,
    setDestinationTile,
    setGameState, setMoveStatus,
    setOpponentPieces,
    setPlayerPieces,
    setSelectedPiece, setPlayerColor, setOpponentColor, setLoser
} from "./redux/actions";
import {GAME_STATE, MOVE_STATUS, NO_PIECE_SELECTED, NO_TILE_SELECTED} from "./redux/stateConstants";

const socketIOClient = require("socket.io-client");

// When deployed, connect to the hosted server, otherwise connect to local server
// Localhost port must match server
let host = process.env.NODE_ENV === 'production' ?
    "appname.herokuapp.com" : "localhost:4002"   
let socket = socketIOClient.connect(host, {secure: true});
// Checks which host we're connected to (for troubleshooting);
console.log("connected to " + host);

socket.on("initial message", msg => {
    console.log("From server: " + msg);
})


export const joinApp = () => {
    socket.emit("join", "");
}

export const sendMove = (origin, destination) => {
    socket.emit("move piece", {
        origin: origin,
        destination: destination
    })
}

socket.on("wait for opponent", msg => {
    console.log(msg);
})

socket.on("gameover", msg => {
    store.dispatch(setGameState(GAME_STATE.GAME_OVER));
    store.dispatch(setLoser(msg.loser));
    store.dispatch(setPlayerPieces(msg.playerPieces))
    store.dispatch(setOpponentPieces(msg.opponentPieces))
})

socket.on("pieces moved", msg => {
    store.dispatch(setSelectedPiece(NO_PIECE_SELECTED));
    store.dispatch(setDestinationTile(NO_TILE_SELECTED));
    store.dispatch(setMoveStatus(MOVE_STATUS.HAS_NOT_MOVED));
    store.dispatch(setPlayerColor(msg.playerColor))
    store.dispatch(setOpponentColor(msg.opponentColor))

})

socket.on("app joined", msg => {
    // console.log(msg);
    // store.dispatch(setNumClients(msg.numClients))
    // store.dispatch(addClient())
})

socket.on("joined game", msg => {
    store.dispatch(setGameState(GAME_STATE.WAITING));
});

socket.on("game full", msg => {
    // console.log(msg)
    store.dispatch(setGameState(GAME_STATE.FULL))
})

socket.on("game start", () => {
    console.log("game started");
    store.dispatch(setGameState(GAME_STATE.STARTED));
})

socket.on("opponent disconnected", () => {
    store.dispatch(setGameState(GAME_STATE.WAITING));
})

socket.on("set pieces", msg => {
    store.dispatch(setPlayerPieces(msg.playerPieces))
    store.dispatch(setOpponentPieces(msg.opponentPieces))
    store.dispatch(setPlayerColor(msg.playerColor))
    store.dispatch(setOpponentColor(msg.opponentColor))
    if (msg.hasOwnProperty("playerRoll")) {
        store.dispatch(setClashRoll(msg.playerRoll, msg.opponentRoll));
        store.dispatch(setGameState(GAME_STATE.CLASH));
    }
})


