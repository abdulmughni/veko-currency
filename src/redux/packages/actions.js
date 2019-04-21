const actions = {
    CREATE_PACKAGE: 'CREATE_PACKAGE',
    FIND_PACKAGE: 'FIND_PACKAGE',
    CREATE_PACKAGE_SUCCESS: 'CREATE_PACKAGE_SUCCESS',
    CREATE_PACKAGE_ERROR: 'CREATE_PACKAGE_ERROR',
    FIND_PACKAGE_SUCCESS: 'FIND_PACKAGE_SUCCESS',
    FIND_PACKAGE_ERROR: 'FIND_PACKAGE_ERROR',
    REMOVE_PACKAGE: 'REMOVE_PACKAGE',
    UPDATE_LOCAL_PACKAGE: 'UPDATE_LOCAL_PACKAGE',
    REMOVE_PACKAGE_SUCCESS: "REMOVE_PACKAGE_SUCCESS",
    createPackage: (payload) => ({
        type: actions.CREATE_PACKAGE,
        data: payload
    }),
    findPackage: (payload) => ({
        type: actions.FIND_PACKAGE,
        data: payload
    }),
    removePackage: (payload) => ({
        type: actions.REMOVE_PACKAGE,
        data: payload
    }),
    updatelocal : (payload) => ({
        type: actions.UPDATE_LOCAL_PACKAGE, package: payload
    })
};
export default actions;