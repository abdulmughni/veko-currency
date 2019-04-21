import actions from './actions';

const initState = {users: [], total: 0, skip: 0, limit: 0};

export default function userReducer(state = initState, action) {
    switch (action.type) {
        case actions.CREATE_USER_SUCCESS: {
            return Object.assign({}, state, {users: [...state.users, action.user]})
        }
        case actions.FIND_USER_SUCCESS: {
            return Object.assign({}, state, {
                users: action.payload.data,
                total: action.payload.total,
                skip: action.payload.skip,
                limit: action.payload.limit
            })
        }
        case actions.PATCH_USER_SUCCESS: {
            let users = state.users.map(user => {
                if (user._id === action.user._id) {
                    return Object.assign({}, user, action.user)
                } else {
                    return user
                }
            })
            return Object.assign({}, state, {users: users})
        }
        case actions.LOCAL_PATCH_USER: {
            let users = state.users.map(user => {
                if (user._id === action.user._id) {
                    return Object.assign({}, user, action.user)
                } else {
                    return user
                }
            })
            return Object.assign({}, state, {users: users});
        }
        default:
            return state;
    }
}
