import {Action} from "../types";
import {
    ACTIONS__ADD_ACTION,
    ACTIONS__CLEAR_ACTIONS,
} from "../constants";

export const addAction = (action: Action) => ({
    type: ACTIONS__ADD_ACTION,
    payload: action,
});

export const clearActions = () => ({
    type: ACTIONS__CLEAR_ACTIONS,
});
