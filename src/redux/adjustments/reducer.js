import actions from './actions';

const initState = {adjustments: [], myAdjustments: {}};

export default function adjustmentReducer(state = initState, action) {
    switch (action.type) {
        case actions.CREATE_ADJUSTMENT_SUCCESS: {
            return Object.assign({}, state, {adjustments: [...state.adjustments, action.adjustment]})
        }
        case actions.FIND_ADJUSTMENT_SUCCESS: {
            return Object.assign({}, state, {
                adjustments: action.payload.data, total: action.payload.total, skip: action.payload.skip,
                limit: action.payload.limit
            })
        }
        case actions.PATCH_ADJUSTMENT_SUCCESS: {
            return Object.assign({}, state, {adjustments: [...state.adjustments, action.adjustment]})
        }
        case actions.UPDATE_ADJUSTMENT_SUCCESS: {
            return Object.assign({}, state, {adjustments: [...state.adjustments, action.adjustment]})
        }
        default:
            return state;
    }
}
