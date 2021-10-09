import { AUTH_ADMIN, AUTH_ERROR } from './types';
import authapi from '../Api/heroicmindsapi';

export const register = (formProps, callback) => async dispatch => {
    try {
        const response = await authapi.post(
            '/api/v1/admin/register',
            formProps
        );

        dispatch({ type: AUTH_ADMIN, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
    }
};

export const login = (formProps, callback) => async dispatch => {
    try {
        const response = await authapi.post(
            '/api/v1/admin/login',
            formProps
        );

        dispatch({ type: AUTH_ADMIN, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid : Email or Password' });
    }
};

export const logout = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_ADMIN,
        payload: ''
    };
}