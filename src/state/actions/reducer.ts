import {
    Action,
    ReduxAction,
} from "../types";
import {
    ACTIONS__ADD_ACTION,
    ACTIONS__CLEAR_ACTIONS,
} from "../constants";

const initialState: Action[] = [];

export default function (state = initialState, action: ReduxAction) {
    switch (action.type) {
        case ACTIONS__ADD_ACTION:
            return [].concat(state, [action.payload]);
        case ACTIONS__CLEAR_ACTIONS:
            return [];
        default:
            return state;
    }
}