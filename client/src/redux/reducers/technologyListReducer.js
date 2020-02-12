import {
    TECHNOLOGY_DETAIL_REQUEST,
    TECHNOLOGY_DETAIL_RECEIVE,
    TECHNOLOGY_DETAIL_FAILURE
} from '../actions/technologyListAction';

const initialState = {
    isLoading: true,
    isFailure: false,
    TechnologyDataList: []
};

const technologyDataReducer = (state = initialState, action) => {
    switch (action.type) {
        case TECHNOLOGY_DETAIL_REQUEST:
            return {
                ...state,
                isLoading: true,
                isFailure: false
            };
        case TECHNOLOGY_DETAIL_RECEIVE:
            return {
                ...state,
                isLoading: false,
                isFailure: false,
                TechnologyDataList: action.payload
            };
        case TECHNOLOGY_DETAIL_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFailure: true
            };
        default:
            return state;
    }
};

export default technologyDataReducer;
