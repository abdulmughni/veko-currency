const actions = {
    GET_TREE: 'GET_TREE',
    SELECTED_MEMBER: 'SELECTED_MEMBER',
    SET_LOADING: 'SET_LOADING',
    PUSH_ROUTE: 'PUSH_ROUTE',
    GET_TREE_SUCCESS: 'GET_TREE_SUCCESS',
    getTree: (id) => ({
        type: actions.GET_TREE,
        id
    }),
    selectMember: (id) => ({
        type: actions.SELECTED_MEMBER,
        id
    }),
    pushRoute: (val) => ({
        type: actions.PUSH_ROUTE,
        route: val
    })
}

export default actions;
