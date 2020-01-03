import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory, createMemoryHistory } from 'history';

import createRootReducer from './rootReducer';
import { restMiddleware } from '../utils/redux';
import thunk from 'redux-thunk';

// A nice helper to tell us if we're on the server
export const isServer = !(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
);

export default (url = '/') => {
    // Create a history depending on the environment
    const history = isServer
        ? createMemoryHistory({
              initialEntries: [url]
          })
        : createBrowserHistory();

    const enhancers = [];

    // Dev tools are helpful
    //process.env.NODE_ENV === 'development' &&
    if (!isServer) {
        const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

        if (typeof devToolsExtension === 'function') {
            enhancers.push(devToolsExtension());
        }
    }
    const rootReducer = createRootReducer(history);
    const middleware = [thunk, routerMiddleware(history), restMiddleware];
    const composedEnhancers = compose(
        applyMiddleware(...middleware),
        ...enhancers
    );

    // Do we have preloaded state available? Great, save it.
    const initialState = !isServer ? window.__PRELOADED_STATE__ : {};

    // Delete it once we have it stored in a variable
    if (!isServer) {
        delete window.__PRELOADED_STATE__;
    }

    // Create the store
    const store = createStore(rootReducer, initialState, composedEnhancers);

    return {
        store,
        history
    };
};
