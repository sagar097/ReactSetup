import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import customerDetailsReducers from './reducers/customerDetailsReducers';

export default history => {
    const reducer = combineReducers({
        router: connectRouter(history),
        CustomerDetailsReducers: customerDetailsReducers,
    });

    return (state, action) => {
        // if (action.type === ResetReduxStateType) {
        //     console.log('TCL: action', action);
        //     return reducer(undefined, action);
        // }
        return reducer(state, action);
    };
};
