/*
 * @file: Redux.js
 * @description: Defined Generic Redux Methods
 * @date: -
 * @author: Sagar Pawar
 */


const DEFAULT = 'DEFAULT';

const READY = 'READY';

const LOADING = 'LOADING';

const SUCCESS = 'SUCCESS';

const ERROR = 'ERROR';

export const restTypes = [READY, LOADING, SUCCESS, ERROR];

export const getActionType = (action = 'redux', type = DEFAULT) =>
    `@${action}/${type}`.toUpperCase();

export const getActionTypes = (action, types = restTypes) => {
    return types.reduce(
        (result, type) => ({
            [type.toUpperCase()]: getActionType(action, type),
            ...result
        }),
        {}
    );
};

export const getActionCreator = type => {
    return payload => ({
        type,
        payload
    });
};

export const getActionCreators = types => {
    return Object.keys(types).reduce(
        (result, type) => ({
            [type.toLowerCase()]: getActionCreator(types[type]),
            ...result
        }),
        {}
    );
};

export const getReducer = (initialState, handlers) => {
    return (state = initialState, action) => {
        return handlers.hasOwnProperty(action.type) ? handlers[action.type](state, action) : state;
    };
};

export const AppLoad = getActionType(LOADING);

export const restMiddleware = store => next => async action => {
    const defaultFn = () => true;
    const { types, callAPI, shouldCallAPI = defaultFn, handleAction = defaultFn } = action;

    if (!types) return next(action);

    const typeKeys = Object.keys(types);

    if (
        !Array.isArray(typeKeys) ||
        typeKeys.length <= 3 ||
        !typeKeys.every(type => typeof type === 'string')
    ) {
        throw new Error('Expected an array of three string types.');
    }

    if (typeof callAPI !== 'function') {
        throw new Error('Expected callAPI to be a function.');
    }

    store.dispatch({ type: types.READY });
    handleAction({ type: types.READY, store });

    if (!shouldCallAPI(store.getState())) return;

    store.dispatch({ type: types.LOADING });
    store.dispatch({ type: AppLoad, payload: true });
    handleAction({ type: types.LOADING, store });
    let data = null;
    try {
        let response = await callAPI();
        data = response.data || (await (await response).json()).data;
        store.dispatch({ type: types.SUCCESS, payload: data });
        store.dispatch({ type: AppLoad, payload: false });
        handleAction({ type: types.SUCCESS, payload: data, store });
    } catch (err) {
        console.log('Error-> ' + types.ERROR + ' ' + JSON.stringify(err));
        // let errorData = (e.response && e.response.data) || e;
        store.dispatch({ type: types.ERROR, payload: err });
        store.dispatch({ type: AppLoad, payload: false });
        handleAction({ type: types.ERROR, payload: err, store });
    }
};
