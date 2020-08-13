import { SET_OPPONENT_COLOR, SET_PLAYER_COLOR } from "../actionConstants";

const initialState = {
    playerColor: '',
    opponentColor: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_OPPONENT_COLOR:
            console.log("set opponent color")
            return { 
                ...state,
                opponentColor: action.payload.color }
        case SET_PLAYER_COLOR:
            console.log("set opponent color")
            return { 
                ...state,
                playerColor: action.payload.color }
        default:
            return state;
    }
}