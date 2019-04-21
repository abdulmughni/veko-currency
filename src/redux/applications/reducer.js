import actions from './actions';

const initState = {applications: [], myApplication: {}, total: 0, limit: 0, skip: 0};

export default function applicationReducer(state = initState, action) {
    switch (action.type) {
        case actions.CREATE_APPLICATION_SUCCESS: {
            return Object.assign({}, state, {applications: [...state.applications.filter(a => a._id !== action.application._id), action.application]})
        }
        case actions.FIND_APPLICATION_SUCCESS: {
            return Object.assign({}, state, {
                applications: action.payload.data,
                total: action.payload.total,
                limit: action.payload.limit,
                skip: 0
            })
        }
        case actions.PATCH_APPLICATION_SUCCESS: {
            return Object.assign({}, state, {applications: [...state.applications.filter(a => a._id !== action.application._id), action.application]})
        }
        case actions.UPDATE_APPLICATION_SUCCESS: {
            return Object.assign({}, state, {applications: [...state.applications.filter(a => a._id !== action.application._id,), action.application]})
        }
        default:
            return state;
    }
}