class AppTransport {
    public subscribe = (dispatch, getState) => {
        chrome.runtime.getBackgroundPage(backgroundWindow => {
            backgroundWindow["dispatch"] = dispatch;
        })
    };
}

export const transport = new AppTransport();