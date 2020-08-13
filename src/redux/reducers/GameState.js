import {SET_GAME_STATE, SET_LOSER} from "../actionConstants";
import {GAME_STATE} from "../stateConstants";

const initialState = {
        gameState: GAME_STATE.WAITING
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_GAME_STATE:
            return {...state, gameState: action.payload.gameState}
        case SET_LOSER:
            return {...state, loser: action.payload.loser}
        default:
            return state;
    }
}