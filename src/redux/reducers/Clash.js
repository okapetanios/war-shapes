import {SET_CLASH_ROLL} from "../actionConstants";
import {NO_CLASH} from "../stateConstants";

const initialState = {
    playerRoll: NO_CLASH,
    opponentRoll: NO_CLASH
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CLASH_ROLL:
            return {
                ...state,
                playerRoll: action.payload.playerRoll,
                opponentRoll: action.payload.opponentRoll
            }
        default:
            return state;
    }
}