export enum Actions {
    AddAction = "actions/addAction",
    ClearActions = "actions/clearActions",
    SelectAction = "actions/selectAction",
    SelectSelector = "actions/selectSelector",
    UnselectSelectors = "actions/unselectSelectors",
}

export type Action = {
    id: number;
    type: string;
    active: boolean;
    action: ReduxAction;
    state?: Object;
    selectorsResult?: SelectorsResult;
}

export type SelectorsResult = {
    [key: string]: Selector;
};

export type Selector = {
    id?: number;
    active: boolean;
    value: Object | boolean | string | number;
};

export type ReduxAction = {
    type: string,
    payload?: any,
}

export type ActionsType = Action[];

export type state = {
    actions: ActionsType,
}