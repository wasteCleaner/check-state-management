export type Action = {
    type: string,
    action: ReduxAction
}

export type ReduxAction = {
    type: string,
    payload?: any,
}