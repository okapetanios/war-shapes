import {SET_DESTINATION_TILE} from "../actionConstants";
import {NO_TILE_SELECTED} from "../stateConstants";

const initialState = {
    tile: NO_TILE_SELECTED
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_DESTINATION_TILE:
            return {...state,tile: action.payload.tile}
        default:
            return state;
    }
}