import {SET_MOVE_STATUS} from "../actionConstants";
import {MOVE_STATUS} from "../stateConstants";

const initialState = {
    status: MOVE_STATUS.HAS_NOT_MOVED
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVE_STATUS:
            return {...state,status: action.payload.status}
        default:
            return state;
    }
}