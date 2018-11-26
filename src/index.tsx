import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
    createStore,
    applyMiddleware,
    compose,
    combineReducers
} from "redux";
import thunk from "redux-thunk";

import App from "./App";
import actions from "./actions/state/reducer";

const reducers = combineReducers({
    actions
});

const store = createStore(
    reducers,
    compose(applyMiddleware(thunk))
);

setTimeout(() => {
    const node = document.getElementById("root");
    ReactDOM.unmountComponentAtNode(node);
    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        node
    );
}, 3500);
