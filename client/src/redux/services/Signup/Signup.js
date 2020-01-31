import APIHelper from '../../../helper/apihelper';
//import { getJwt } from '../../utils/jwtUtils';

const api = new APIHelper();

export const SignupApi = (params, signal) => {
    const requestOption = api.getRequestOption(
        params,
        api.Methods.post,
        // api.Actions.View,
        //  getJwt(),
        //   signal
    );
    return api.ServerAPI(api.Resources.SignUp, requestOption, response => response);
};
