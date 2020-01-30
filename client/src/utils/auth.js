import { getToken } from './jwtUtils';

export const auth = store => {
    return getToken() || false;
};