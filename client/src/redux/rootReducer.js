import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userDataReducer from './reducers/userProfileReducer';

export default history => {
    const reducer = combineReducers({
        router: connectRouter(history),
        UserProfileData:userDataReducer
    });

    return (state, action) => {
        // if (action.type === ResetReduxStateType) {
        //     console.log('TCL: action', action);
        //     return reducer(undefined, action);
        // }
        return reducer(state, action);
    };
};
