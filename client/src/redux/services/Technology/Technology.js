import APIHelper from '../../../helper/apihelper';
import { getToken } from '../../../utils/jwtUtils';

const api = new APIHelper();

export const TechnologyListApi = (params, signal) => {
    const requestOption = api.getRequestOption(
        params,
        api.Methods.get,
        api.Actions.View,
        getToken(),
        //   signal
    );
    return api.ServerAPI(api.Resources.TechnologyList, requestOption, response => response); 
};
