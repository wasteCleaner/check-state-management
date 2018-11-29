import { addAction } from "../../state/actions/actions";
import { ReduxAction } from "../../state/types";

type UpdatedWindow = Window & {
    dispatch: (action: ReduxAction) => void;
}

chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener((message) => {
        console.log(message);
        if (message.type && message.type === "check-state-action" && (window as UpdatedWindow).dispatch && message.data) {
            (window as UpdatedWindow).dispatch(addAction(message.data));
        }
    });
});