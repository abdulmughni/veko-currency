const actions = {
    GET_STATS: 'GET_STATS',
    GET_STATS_SUCCESS: 'GET_STATS_SUCCESS',
    GET_ADMIN_STATS: 'GET_ADMIN_STATS',
    GET_ADMIN_STATS_SUCCESS: 'GET_ADMIN_STATS_SUCCESS',
    stats: (payload) => ({
        type: actions.GET_STATS,
        payload,
    }),
    adminStats: (payload) => ({
        type: actions.GET_ADMIN_STATS, payload
    })
};

export default actions;