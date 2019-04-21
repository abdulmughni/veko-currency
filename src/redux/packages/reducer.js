import actions from './actions';

const initState = {packages: [], total: 0}

export default function authReducer(state = initState, action) {
    switch (action.type) {
        case actions.CREATE_PACKAGE_SUCCESS: {
            return Object.assign({}, state, {packages: [...state.packages, action.payload]})
        }
        case actions.FIND_PACKAGE_SUCCESS: {
            return Object.assign({}, state, {packages: action.payload.data, total: action.payload.total})
        }
        case actions.REMOVE_PACKAGE_SUCCESS: {
            return Object.assign({}, state, {packages: state.packages.filter(pkg => pkg._id !== action.payload)});
        }
        case actions.UPDATE_LOCAL_PACKAGE: {
            let packages = state.packages.map(pkg => {
                if(action.package._id === pkg._id) {
                    return action.package
                }
                return pkg
            })
            return Object.assign({}, state, {packages: packages});
        }
        default:
            return state;
    }
}
