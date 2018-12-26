import {
    Action,
    Actions,
} from "../types";

export const addAction = (action: Action) => ({
    type: Actions.AddAction,
    payload: action,
});

export const clearActions = () => ({
    type: Actions.ClearActions,
});

export const selectAction = (id: number) => ({
    type: Actions.SelectAction,
    payload: id,
});

export const selectSelector = (selectorId: number, actionId: number) => ({
    type: Actions.SelectSelector,
    payload: {
        selectorId,
        actionId
    },
});

export const unselectSelectors = () => ({
    type: Actions.UnselectSelectors,
});
