import { get } from "lodash";
import {
    Action,
    Actions,
    ActionsType,
    SelectorsResult,
} from "../types";

const prepareSelectors = (selectors): SelectorsResult => {
    let result = {};

    Object.keys(selectors).forEach((selectorName, i) => {
        result[selectorName] = {
            value: selectors[selectorName],
            id: 1 + i,
            active: false,
        };
    });

    return result;
};

const initialState: ActionsType = [];

const addActionReducer: Reducer<AddAction> = (state, { payload }) => {
    const selectorsResult = get(payload, "selectorsResult");
    const preparedAction: Action = {
        ...payload,
        id: state.length + 1,
        active: false,
        selectorsResult: selectorsResult ? prepareSelectors(selectorsResult) : {},
    };

    return [].concat(state, preparedAction);
};

const selectActionReducer: Reducer<SelectAction> = (state, action) => {
    return state.map(actionData => {
        actionData.active = actionData.id === action.payload;
        return actionData;
    });
};

const clearActionsReducer: Reducer<ClearActions> = (state, action) => ([]);

const selectSelectorReducer: Reducer<SelectSelector> = (state, { payload: { selectorId, actionId } }) => {
    const activeAction = state.filter(action => action.id === actionId);
    if (activeAction.length === 0) {
        return state;
    }

    for (const selectorName of Object.keys((activeAction[0].selectorsResult || {}))) {
        if (activeAction[0].selectorsResult[selectorName].id === selectorId) {
            const newSelectorsResult = {
                ...activeAction[0].selectorsResult,
                [selectorName]: {
                    ...activeAction[0].selectorsResult[selectorName],
                    active: true,
                }
            };

            return state.map(action => {
                if (action.id === actionId) {
                    return {
                        ...action,
                        selectorsResult: newSelectorsResult,
                    };
                }
                return action;
            })
        }
    }
    return state;
};

const unselectSelectors: Reducer<UnselectSelectors> = (state, action) => {
    return state.map(action => {
        const newSelectorsResult = {
            ...action.selectorsResult,
        };

        Object.keys((newSelectorsResult || {})).forEach(selectorName => {
            newSelectorsResult[selectorName].active = false;
        });

        return {
            ...action,
            selectorsResult: newSelectorsResult,
        }
    });
};

type AddAction = {
    type: Actions.AddAction;
    payload: Action;
};
type SelectAction = {
    type: Actions.SelectAction;
    payload: number;
}
type ClearActions = {
    type: Actions.ClearActions;
}
type SelectSelector = {
    type: Actions.SelectSelector;
    payload: {
        selectorId: number;
        actionId: number;
    };
}
type UnselectSelectors = {
    type: Actions.UnselectSelectors;
}
type AllActions = AddAction
    | ClearActions
    | SelectAction
    | SelectSelector
    | UnselectSelectors;
type Reducer<A> = (state: ActionsType, action: A) => ActionsType;

export default function (state = initialState, action: AllActions) {
    switch (action.type) {
        case Actions.SelectAction:
            return selectActionReducer(state, action);
        case Actions.AddAction:
            return addActionReducer(state, action);
        case Actions.ClearActions:
            return clearActionsReducer(state, action);
        case Actions.SelectSelector:
            return selectSelectorReducer(state, action);
        case Actions.UnselectSelectors:
            return unselectSelectors(state, action);
        default:
            return state;
    }
}