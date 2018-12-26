import { createSelector } from "reselect";
import { get } from "lodash";

export const selectActions = (state) => state.actions || [];
export const selectActiveAction = createSelector(
    selectActions,
    (actions) => {
    const action = actions.filter(action => action.active);
    return action && action.length ? action[0] : undefined;
});
export const selectActiveSelector = createSelector(selectActiveAction, action => {
    if (!action) {
        return undefined;
    }

    for (const selector of Object.keys((action.selectorsResult || {}))) {
        if (action.selectorsResult[selector].active) {
            return action.selectorsResult[selector];
        }
    }
});
export const selectPreparedSelectors = createSelector(selectActiveAction, action => {
    const selectorsResult = get(action, "selectorsResult", {});
    const selectors = [];
    Object.keys(selectorsResult).forEach(selectorName => {
        selectors.push({
            ...selectorsResult[selectorName],
            name: selectorName,
        });
    });

    return selectors;
});
