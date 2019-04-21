const actions = {
    CREATE_POSITION: 'CREATE_POSITION',
    FIND_POSITION: 'FIND_POSITION',
    CREATE_POSITION_SUCCESS: 'CREATE_POSITION_SUCCESS',
    CREATE_POSITION_ERROR: 'CREATE_POSITION_ERROR',
    FIND_POSITION_SUCCESS: 'FIND_POSITION_SUCCESS',
    FIND_POSITION_ERROR: 'FIND_POSITION_ERROR',
    UPDATE_POSITION: 'UPDATE_POSITION',
    UPDATE_POSITION_SUCCESS: 'UPDATE_POSITION_SUCCESS',
    PATCH_POSITION: 'PATCH_POSITION',
    PATCH_POSITION_SUCCESS: 'PATCH_POSITION_SUCCESS',
    MY_POSITION_SUCCESS: 'MY_POSITION_SUCCESS',
    MY_POSITION_FIND: 'MY_POSITION_FIND',
    createPosition: (payload) => ({
        type: actions.CREATE_POSITION,
        payload
    }),
    findPosition: (payload) => ({
        type: actions.FIND_POSITION,
        payload
    }),
    updatePosition: (payload) => ({
        type: actions.UPDATE_POSITION, payload
    }),
    patchPosition: (payload) => ({
        type: actions.PATCH_POSITION, payload
    }),
    findMyPosition: () => ({
        type: actions.MY_POSITION_FIND
    })
};
export default actions;
