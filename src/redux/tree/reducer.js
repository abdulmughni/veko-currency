import actions from './actions'

const initialState = {tree: [], loading: false, selectedMember: undefined};

export default function treeReducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_TREE_SUCCESS: {
            return Object.assign({}, state, {tree: action.tree});
        }
        case action.SET_LOADING: {
            return Object.assign({}, state, {loading: action.loading});
        }
        case actions.SELECTED_MEMBER: {
            return Object.assign({}, state, {selectedMember: action.id})
        }
        default:
            return state;

    }
}