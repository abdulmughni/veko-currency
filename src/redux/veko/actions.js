
const actions = {
    // Admin Actions
    GET_ADMIN_DATA: 'GET_ADMIN_DATA',
    GET_SYSTEM_SETTINGS: 'GET_SYSTEM_SETTINGS',
    SET_SYSTEM_SETTINGS: 'SET_SYSTEM_SETTINGS',
    UPDATE_SYSTEM_SETTINGS: 'UPDATE_SYSTEM_SETTINGS',
    PATCH_SYSTEM_SETTINGS: 'PATCH_SYSTEM_SETTINGS',
    UPDATE_POSITIONS: 'UPDATE_POSITIONS',
    UPDATE_TRADES: 'UPDATE_TRADES',
    GET_PORTFOLIO: 'GET_PORTFOLIO',
    CHANGE_PRICE: 'CHANGE_PRICE',
    UPDATE_PRICE_CHANGES: 'UPDATE_PRICE_CHANGES',
    UPDATE_SPLITS: 'UPDATE_SPLITS',
    UPDATE_ROIs: 'UPDATE_ROIs',
    CREATE_SPLIT: 'CREATE_SPLIT',
    CREATE_ROI: 'CREATE_ROI',
    getPortfolio: (id) => ({type: actions.GET_PORTFOLIO, id}),
    initSystemSettings: () => ({type: actions.GET_SYSTEM_SETTINGS}),
    initAdminData: () => ({type: actions.GET_ADMIN_DATA}),
    // Exchange Actions
    SET_USER: 'SET_USER',
    GET_USER_DATA: 'GET_USER_DATA',
    UPDATE_WALLET: 'UPDATE_WALLET',
    UPDATE_PORTFOLIO: 'UPDATE_PORTFOLIO',
    UPDATE_USER_POSITIONS: 'UPDATE_USER_POSITIONS',
    UPDATE_USER_TRADES: 'UPDATE_USER_TRADES',
    PLACE_TRADE: 'PLACE_TRADE',
    EXCHANGE: 'EXCHANGE',
    EXCHANGE_ERROR: 'EXCHANGE_ERROR',
    initUserData: () => ({type: actions.GET_USER_DATA}),
    exchange: (data) => ({
        type: actions.PLACE_TRADE, trade: data
    })
};

export default actions;