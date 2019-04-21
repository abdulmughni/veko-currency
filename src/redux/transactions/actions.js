const actions = {
    CREATE_TRANSACTION: 'CREATE_TRANSACTION',
    FIND_TRANSACTION: 'FIND_TRANSACTION',
    CREATE_TRANSACTION_SUCCESS: 'CREATE_TRANSACTION_SUCCESS',
    CREATE_TRANSACTION_ERROR: 'CREATE_TRANSACTION_ERROR',
    FIND_TRANSACTION_SUCCESS: 'FIND_TRANSACTION_SUCCESS',
    FIND_TRANSACTION_ERROR: 'FIND_TRANSACTION_ERROR',
    UPDATE_TRANSACTION: 'UPDATE_TRANSACTION',
    UPDATE_TRANSACTION_SUCCESS: 'UPDATE_TRANSACTION_SUCCESS',
    PATCH_TRANSACTION: 'PATCH_TRANSACTION',
    PATCH_TRANSACTION_SUCCESS: 'PATCH_TRANSACTION_SUCCESS',
    MY_TRANSACTION_SUCCESS: 'MY_TRANSACTION_SUCCESS',
    MY_TRANSACTION_FIND: 'MY_TRANSACTION_FIND',
    createTransaction: (payload) => ({
        type: actions.CREATE_TRANSACTION,
        payload
    }),
    findTransaction: (payload) => ({
        type: actions.FIND_TRANSACTION,
        payload
    }),
    updateTransaction: (payload) => ({
        type: actions.UPDATE_TRANSACTION, payload
    }),
    patchTransaction: (payload) => ({
        type: actions.PATCH_TRANSACTION, payload
    }),
    findMyTransaction: () => ({
        type: actions.MY_TRANSACTION_FIND
    })
};
export default actions;
