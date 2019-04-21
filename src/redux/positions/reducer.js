import actions from './actions';
import {Client} from "../../settings";
import {store} from "../store";

const initState = {positions: [], myApplication: {}, total: 0, limit: 0, skip: 0};

export default function positionReducer(state = initState, action) {
    switch (action.type) {
        case actions.FIND_POSITION_SUCCESS: {
            return Object.assign({}, state, {
                positions: action.payload.data,
                total: action.payload.total,
                limit: action.payload.limit,
                skip: action.payload.skip,
            })
        }
        case actions.CREATE_POSITION_SUCCESS: {
            return Object.assign({}, state, {positions: [action.position, ...state.positions]})
        }
        case actions.UPDATE_POSITION_SUCCESS: {
            let positions = state.positions.filter(a => a._id !== action.position._id)
            return Object.assign({}, state, {positions: [action.position, ...positions]})
        }
        case actions.PATCH_POSITION_SUCCESS: {
            let positions = state.positions.filter(a => a._id !== action.position._id)
            return Object.assign({}, state, {positions: [action.position, ...positions]})
        }
        default:
            return state;
    }
}


const positionsService = Client.service('positions');


positionsService.on('created', data => {

    store.dispatch({
        type: actions.UPDATE_POSITION_SUCCESS,
        position: data
    });
});
positionsService.on('update', data => {

    store.dispatch({
        type: actions.UPDATE_POSITION_SUCCESS,
        position: data
    });
});
positionsService.on('patched', data => {
    store.dispatch({
        type: actions.PATCH_POSITION_SUCCESS,
        position: data
    });
});