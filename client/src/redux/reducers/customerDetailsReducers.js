import {
    USER_DETAIL_FAILURE,
    USER_DETAIL_RECEIVE,
    USER_DETAIL_REQUEST
} from '../actions/customerDetailsAction';

const initialState = {
    isLoading: true,
    isFailure: false,
    CustomerDataList: []
};

const userDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailure: false
            };
        case USER_DETAIL_RECEIVE:
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                CustomerDataList: action.payload
            };
        case USER_DETAIL_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFailure: true
            };
        default:
            return state;
    }
};

export default userDataReducer;
