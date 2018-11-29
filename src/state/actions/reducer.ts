import {
  Action,
  ReduxAction,
} from "../types";
import {
  ACTIONS__ADD_ACTION,
  ACTIONS__DELETE_ACTION,
} from "../constants";

const initialState: Action[] = [
  { type: 'test', action: { type: 'test' } },
  { type: 'test2', action: { type: 'test2' } }
];

export default function (state = initialState, action: ReduxAction) {
  console.log(action);
  switch (action.type) {
    case ACTIONS__ADD_ACTION:
      return [].concat(state, [action.payload]);
    default:
      return state;
  }
}