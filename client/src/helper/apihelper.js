import { API_GATEWAY_URL } from './constants';


const APIHelper = function() {};

Object.defineProperty(APIHelper.prototype, 'Url', {
    value: API_GATEWAY_URL,
    writable: false
});

Object.defineProperty(APIHelper.prototype, 'Resources', {
    get() {
        return {
            Customer: this.Url + 'customers',
            
        };
    },
    readable: true
});

Object.defineProperty(APIHelper.prototype, 'Actions', {
    get() {
        return {
            View: 'View',
            Create: 'Create',
            Update: 'Update',
            Delete: 'Delete'
        };
    },
    readable: true
});

Object.defineProperty(APIHelper.prototype, 'ServerAPI', {
    get() {
        return async (url, requestOptions, callback) => {
            var response = await fetch(url, requestOptions).then(async res => {
                if (res.ok) return res.json();
                else if (res.status === 403) {
                    return res;
                } else {
                    const error = new Error(res.statusText);
                    error.response = res;
                    return error;
                }
            });
            return response;
        };
    },
    readable: true
});

Object.defineProperty(APIHelper.prototype, 'getRequestOption', {
    get() {
        return ( body, action, token, signal) => ({
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Action: action,
               // Authorization: token
            },
            body: JSON.stringify(body),
          //  signal
        });
    },
    readable: true
});


export default APIHelper;
