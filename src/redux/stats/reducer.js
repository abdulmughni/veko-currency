import actions from './actions'
/*
applications: 0,
        members: 0,
        sales: 0,
        veko: 0,
        wallets: 0,
        deposits: 0,
        withdraws: 0,
 */
const initState = {
    special: 0,
    veko: 0,
    cash: 0,
    team: 0,
    teamSales: 0,
    sales: 0,
    members: 0,
    applications: 0,
    withdraws: 0,
    deposits: 0,
    wallets: 0
};

export default function statsReducer(state = initState, action) {
    switch (action.type) {
        case actions.GET_STATS_SUCCESS: {
            return Object.assign({}, state, {
                veko: action.data.veko,
                cash: action.data.cash,
                team: action.data.team,
                teamSales: action.data.teamSales
            })
        }
        case actions.GET_ADMIN_STATS_SUCCESS: {
            return Object.assign({}, state, {
                applications: action.data.applications,
                sales: action.data.sales,
                members: action.data.members,
                veko: action.data.veko,
                wallets: action.data.wallets,
                special: action.data.special,
                deposits: action.data.deposits,
                withdraws: action.data.withdraws,
            })
        }
        default:
            return state
    }

}