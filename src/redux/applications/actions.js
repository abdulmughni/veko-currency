const actions = {
    CREATE_APPLICATION: 'CREATE_APPLICATION',
    FIND_APPLICATION: 'FIND_APPLICATION',
    CREATE_APPLICATION_SUCCESS: 'CREATE_APPLICATION_SUCCESS',
    CREATE_APPLICATION_ERROR: 'CREATE_APPLICATION_ERROR',
    FIND_APPLICATION_SUCCESS: 'FIND_APPLICATION_SUCCESS',
    FIND_APPLICATION_ERROR: 'FIND_APPLICATION_ERROR',
    UPDATE_APPLICATION: 'UPDATE_APPLICATION',
    UPDATE_APPLICATION_SUCCESS: 'UPDATE_APPLICATION_SUCCESS',
    PATCH_APPLICATION: 'PATCH_APPLICATION',
    PATCH_APPLICATION_SUCCESS: 'PATCH_APPLICATION_SUCCESS',
    MY_APPLICATION_SUCCESS: 'MY_APPLICATION_SUCCESS',
    MY_APPLICATION_FIND: 'MY_APPLICATION_FIND',
    createApplication: (payload) => ({
        type: actions.CREATE_APPLICATION,
        payload
    }),
    findApplication: (payload) => ({
        type: actions.FIND_APPLICATION,
        payload
    }),
    updateApplication: (payload) => ({
        type: actions.UPDATE_APPLICATION, payload
    }),
    patchApplication: (payload) => ({
        type: actions.PATCH_APPLICATION, payload
    }),
    findMyApplication: () => ({
        type: actions.MY_APPLICATION_FIND
    })
};
export default actions;
