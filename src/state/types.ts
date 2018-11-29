export type Action = {
    type: string,
    data: {
        action: ReduxAction,
        state?: any,
        selectorsResult?: any,
    }
}

export type ReduxAction = {
    type: string,
    payload?: any,
}

export type state = {
    actions: Action[],
}