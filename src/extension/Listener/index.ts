type UpdatedWindow = Window & {
    __checkStoreExtension__: (options) => (store) => (next) => (action) => void;
    checkStoreExtensionID: string;
}

(window as UpdatedWindow).__checkStoreExtension__ = (options = {}) => (store) => (next) => (action) => {
    let res = next(action);
    window.postMessage({
        type: "check-state-action",
        action: action,
    }, "*");
    return res;
};

(window as UpdatedWindow).checkStoreExtensionID = 'edjbmeghokokegieplmnkjceacineppf';

