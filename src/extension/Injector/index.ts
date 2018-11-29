import {
    EXTENSION_IS,
    GLOBAL_MESSAGE_TYPE
} from "../../constants";

let s = document.createElement("script");
s.type = "text/javascript";

s.src = chrome.extension.getURL("listener.bundle.js");
(document.head || document.documentElement).appendChild(s);

let isConnected = false;
let connection;

const connect = () => {
    const name = "checkState";
    connection = chrome.runtime.connect(EXTENSION_IS, { name });
};

const send = (action) => {
    if (!isConnected) connect();
    connection.postMessage({ type: GLOBAL_MESSAGE_TYPE, data: action });
};

const handleMessages = (event) => {
    if (event && event.data && event.data.type && event.data.type === GLOBAL_MESSAGE_TYPE && event.data.action) {
        send({
            action: event.data.action,
            state: event.data.state,
            selectorsResult: event.data.selectorsResult,
        });
    }
};

window.addEventListener("message", handleMessages, false);
