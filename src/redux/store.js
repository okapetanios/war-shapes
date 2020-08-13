import {createStore, applyMiddleware, combineReducers} from "redux";
import thunkMiddleware from "redux-thunk";
import selectedPiece from "./reducers/selectedPiece";
import playerPieces from "./reducers/playerPieces";
import opponentPieces from "./reducers/opponentPieces";
import gameState from "./reducers/GameState";
import destinationTile from "./reducers/destinationTile";
import playerColors from "./reducers/playerColors";
import clashRoll from "./reducers/Clash";
import moveStatus from "./reducers/MoveStatus";

const rootReducer = combineReducers({
    selectedPiece: selectedPiece,
    destinationTile: destinationTile,
    playerPieces: playerPieces,
    opponentPieces: opponentPieces,
    playerColors: playerColors,
    gameState: gameState,
    clash: clashRoll,
    moveStatus: moveStatus
})

export default createStore(rootReducer, applyMiddleware(thunkMiddleware));