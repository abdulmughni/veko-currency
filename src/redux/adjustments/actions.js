const actions = {
    CREATE_ADJUSTMENT: 'CREATE_ADJUSTMENT',
    FIND_ADJUSTMENT: 'FIND_ADJUSTMENT',
    CREATE_ADJUSTMENT_SUCCESS: 'CREATE_ADJUSTMENT_SUCCESS',
    CREATE_ADJUSTMENT_ERROR: 'CREATE_ADJUSTMENT_ERROR',
    FIND_ADJUSTMENT_SUCCESS: 'FIND_ADJUSTMENT_SUCCESS',
    FIND_ADJUSTMENT_ERROR: 'FIND_ADJUSTMENT_ERROR',
    UPDATE_ADJUSTMENT: 'UPDATE_ADJUSTMENT',
    UPDATE_ADJUSTMENT_SUCCESS: 'UPDATE_ADJUSTMENT_SUCCESS',
    PATCH_ADJUSTMENT: 'PATCH_ADJUSTMENT',
    PATCH_ADJUSTMENT_SUCCESS: 'PATCH_ADJUSTMENT_SUCCESS',
    MY_ADJUSTMENT_SUCCESS: 'MY_ADJUSTMENT_SUCCESS',
    MY_ADJUSTMENT_FIND: 'MY_ADJUSTMENT_FIND',
    createAdjustment: (payload) => ({
        type: actions.CREATE_ADJUSTMENT,
        payload
    }),
    findAdjustment: (payload) => ({
        type: actions.FIND_ADJUSTMENT,
        payload
    }),
    updateAdjustment: (payload) => ({
        type: actions.UPDATE_ADJUSTMENT, payload
    }),
    patchAdjustment: (payload) => ({
        type: actions.PATCH_ADJUSTMENT, payload
    }),
    findMyAdjustment: () => ({
        type: actions.MY_ADJUSTMENT_FIND
    })
};
export default actions;
