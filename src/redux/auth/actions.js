const actions = {
    CHECK_AUTHORIZATION: 'CHECK_AUTHORIZATION',
    LOGIN_REQUEST: 'LOGIN_REQUEST',
    LOGOUT: 'LOGOUT',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_ERROR: 'LOGIN_ERROR',
    REMOVE_PACKAGE: 'REMOVE_PACKAGE',
    REMOVE_PACKAGE_SUCCESS: 'REMOVE_PACKAGE_SUCCESS',
    UPDATE_AUTH_PROFILE: 'UPDATE_AUTH_PROFILE',
    checkAuthorization: () => ({type: actions.CHECK_AUTHORIZATION}),
    login: (payload) => ({
        type: actions.LOGIN_REQUEST,
        payload
    }),
    logout: () => ({
        type: actions.LOGOUT
    })
};
export default actions;
