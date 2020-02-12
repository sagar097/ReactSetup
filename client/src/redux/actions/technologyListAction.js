import {TechnologyListApi} from '../services/Technology/Technology';

export const TECHNOLOGY_DETAIL_REQUEST = 'TECHNOLOGY_DETAIL_REQUEST';
export const TECHNOLOGY_DETAIL_RECEIVE = 'TECHNOLOGY_DETAIL_RECEIVE';
export const TECHNOLOGY_DETAIL_FAILURE = 'TECHNOLOGY_DETAIL_FAILURE';

const requestTechnologyInfo = () => ({
    type: TECHNOLOGY_DETAIL_REQUEST
});

const receiveTechnologyInfo = payload => ({
    type: TECHNOLOGY_DETAIL_RECEIVE,
    payload
});

const failureTechnologyInfo = () => ({
    type: TECHNOLOGY_DETAIL_FAILURE
});

export const getAllTechnologyDetail = params => {
    return dispatch => {
        dispatch(requestTechnologyInfo());

        TechnologyListApi(params)
            .then(json => {
                dispatch(receiveTechnologyInfo(json.payload.data));
            })
            .catch(ex => {
                dispatch(failureTechnologyInfo());
            });
    };
};
