# Redux CheckState (selectors testing)

![scr-1](https://user-images.githubusercontent.com/19432543/51444135-4ebf3180-1cfc-11e9-857b-52e3742dd042.png)

## Installation
 * Install chrome extension from [Google Web Store](https://chrome.google.com/webstore/detail/redux-checkstate-selector/lhhbnkkjefhgnlfjhjdbnijiikiofgbc)
 * Prepare `checkState.config.js` file in `/src` folder of your project (you need to export all your selectors from this file). Look the [example](https://github.com/wasteCleaner/check-state-example/blob/master/src/checkState.config.js)
 * Insert our middleware to your store:
```typescript
import * as selectors from "./checkState.config.js";

const checkStateMiddleware = (options = {}) => {
    return window && window["__checkStoreExtension__"] ? window["__checkStoreExtension__"](options) :
        store => next => action => next(action);
};

const store = createStore(
    reducers,
    compose(applyMiddleware(
        checkStateMiddleware(selectors),
    )),
);
```
You can see an example of implementation in our [example application](https://github.com/wasteCleaner/check-state-example/blob/master/src/index.tsx).

## Usage
This extension is need for create test cases for testing selectors in your application, so, after the implementation of middleware you need to build and run you application.
After running your application just open chrome devtools (cmd + option + i) and select `CheckState` tab here. 
Now, if application dispatched actions you will be able to see this action in this tab. You also can click on action to see more details (actual selectors results).
You need to use your application to catch as more actions as possible. When this process is done just click `Download` button (on left bar) and save test cases in `/src` folder of your project.

That's it, all tests ready to run.

## How to run tests?
For running tests you need to install [check-state CLI tool](https://www.npmjs.com/package/check-state)

Just run: `npm i check-state -g`

And after that you can run `check-state start` in your project folder. CLI tool will compile all selectors and run them with all of cases which you created used the extension.

Read more about this idea on my page: [wastecleaner.im](http://wastecleaner.im/check-state)