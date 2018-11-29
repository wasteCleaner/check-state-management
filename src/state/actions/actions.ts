import { Action } from "../types";
import { ACTIONS__ADD_ACTION } from "../constants";

export const addAction = (action: Action) => ({
  type: ACTIONS__ADD_ACTION,
  payload: action,
});