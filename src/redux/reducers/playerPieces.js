import { SET_PLAYER_PIECES } from "../actionConstants";

const initialState = {pieces: []};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PLAYER_PIECES:
            return {...state,pieces: action.payload.pieces}
        default:
            return state;
    }
}