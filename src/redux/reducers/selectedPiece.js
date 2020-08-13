import { SET_SELECTED_PIECE } from "../actionConstants";
import {NO_PIECE_SELECTED} from "../stateConstants";

const initialState = {
    selected: NO_PIECE_SELECTED
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_SELECTED_PIECE:
            return {...state,selected: action.payload.selected}
        default:
            return state;
    }
}