type UpdatedWindow = Window & {
    __checkStoreExtension__: (options) => (store) => (next) => (action) => void;
    checkStoreExtensionID: string;
}

const runSelectors = (selectors, state) => {
    let result = {};
    Object.keys(selectors).forEach(key => {
        result[key] = typeof selectors[key] === "object" ?
            runSelectors(selectors[key], state) : selectors[key]({...state});
    });

    return result;
};

(window as UpdatedWindow).__checkStoreExtension__ = (options = {}) => (store) => (next) => (action) => {
    const res = next(action);
    const newStore = store.getState();
    const selectorsResult = runSelectors(options, newStore);

    window.postMessage({
        type: "check-state-action",
        action: action,
        state: newStore,
        selectorsResult: selectorsResult,
    }, "*");
    return res;
};

(window as UpdatedWindow).checkStoreExtensionID = 'edjbmeghokokegieplmnkjceacineppf';

