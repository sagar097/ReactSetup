import APIHelper from '../../helper/apihelper';
//import { getJwt } from '../../utils/jwtUtils';

const api = new APIHelper();

export const getCustomerApi = (params, signal) => {
    const requestOption = api.getRequestOption(
        params,
        api.Actions.View,
      //  getJwt(),
     //   signal
    );
    return api.ServerAPI(api.Resources.Customer, requestOption, response => response);
};
