import {
    SET_SELECTED_PIECE,
    SET_PLAYER_PIECES,
    SET_PLAYER_COLOR,
    SET_OPPONENT_COLOR,
    SET_OPPONENT_PIECES, SET_GAME_STATE, SET_DESTINATION_TILE, SET_MOVE_STATUS, SET_CLASH_ROLL,
    SET_LOSER
} from "./actionConstants";
import { joinApp, sendMove } from "../client";

export const connectToApp = () => {
    return dispatch => joinApp();
}

export const sendMoveToServer = (origin, destination) => {
    return dispatch => sendMove(origin, destination);
}

export const setGameState = gameState => ({
    type: SET_GAME_STATE,
    payload: {
        gameState: gameState
    }
});

export const setLoser = loser => ({
    type: SET_LOSER,
    payload: {
        loser: loser
    }
});

export const setMoveStatus = status => ({
    type: SET_MOVE_STATUS,
    payload: {
        status: status
    }
});

export const setClashRoll = (playerRoll, opponentRoll) => ({
    type: SET_CLASH_ROLL,
    payload: {
        playerRoll: playerRoll,
        opponentRoll: opponentRoll
    }
});

export const setDestinationTile = tile => ({
    type: SET_DESTINATION_TILE,
    payload: {
        tile: tile
    }
});

export const setSelectedPiece = selected => ({
    type: SET_SELECTED_PIECE,
    payload: {
        selected: selected
    }
});

export const setPlayerPieces = pieces => ({
    type: SET_PLAYER_PIECES,
    payload: {
        pieces: pieces
    }
});

export const setOpponentPieces = pieces => ({
    type: SET_OPPONENT_PIECES,
    payload: {
        pieces: pieces
    }
});

// export const setPlayerColors = (playerColor, opponentColor) => ({
//             type: SET_PLAYER_COLORS,
//             payload: {
//                 playerColor: playerColor,
//                 opponentColor: opponentColor
//             }
// });

export const setPlayerColor = color => ({
    type: SET_PLAYER_COLOR,
    payload: {
        color: color
    }
});

export const setOpponentColor = color => ({
    type: SET_OPPONENT_COLOR,
    payload: {
        color: color
    }
});