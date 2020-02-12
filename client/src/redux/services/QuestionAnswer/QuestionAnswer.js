import APIHelper from '../../../helper/apihelper';
import { getToken } from '../../../utils/jwtUtils';

const api = new APIHelper();

export const getQuestionApi = (params, signal) => {
    const requestOption = api.getRequestOption(
        params,
        api.Methods.post,
        api.Actions.View,
        getToken(),
        //   signal
    );
    return api.ServerAPI(api.Resources.QuestionAnswer, requestOption, response => response); 
};
