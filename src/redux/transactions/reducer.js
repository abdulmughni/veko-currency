import actions from './actions';

const initState = {transactions: [], myTransaction: {}};

export default function transactionReducer(state = initState, action) {
    switch (action.type) {
        case actions.CREATE_TRANSACTION_SUCCESS: {
            return Object.assign({}, state, {transactions: [...state.transactions, action.transaction]})
        }
        case actions.FIND_TRANSACTION_SUCCESS: {
            return Object.assign({}, state, {
                transactions: action.payload.data, total: action.payload.total, skip: action.payload.skip,
                limit: action.payload.limit
            })
        }
        case actions.PATCH_TRANSACTION_SUCCESS: {
            return Object.assign({}, state, {transactions: [...state.transactions, action.transaction]})
        }
        case actions.UPDATE_TRANSACTION_SUCCESS: {
            return Object.assign({}, state, {transactions: [...state.transactions, action.transaction]})
        }
        default:
            return state;
    }
}