const actions = {
    CREATE_USER: 'CREATE_USER',
    FIND_USER: 'FIND_USER',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_ERROR: 'CREATE_USER_ERROR',
    FIND_USER_SUCCESS: 'FIND_USER_SUCCESS',
    FIND_USER_ERROR: 'FIND_USER_ERROR',
    UPDATE_USER: 'UPDATE_USER',
    UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',
    PATCH_USER: 'PATCH_USER',
    LOCAL_PATCH_USER: 'LOCAL_PATCH_USER',
    PATCH_USER_SUCCESS: 'PATCH_USER_SUCCESS',
    createUser: (payload) => ({
        type: actions.CREATE_USER,
        payload
    }),
    findUser: (payload) => ({
        type: actions.FIND_USER,
        payload
    }),
    updateUser: (payload) => ({
        type: actions.UPDATE_USER, payload
    }),
    patchUser: (payload) => ({
        type: actions.PATCH_USER, payload
    }),
    localPatch: (payload) => ({
        type: actions.LOCAL_PATCH_USER, user: payload

    })
};
export default actions;
