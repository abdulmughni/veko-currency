import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import actions from './actions';
import {app} from '../../settings/index';
import {notification} from '../../components'
import authActions from '../auth/actions'

const {LOGOUT} = authActions;

/*
export function* createPositionRequest() {
    yield takeEvery('CREATE_POSITION', function* (data) {
        try {
            const position = yield call(create, data.payload);
            yield put({
                type: actions.CREATE_POSITION_SUCCESS,
                position
            });
            notification('success', 'Position has been submitted!');
            yield put({type: LOGOUT});
        } catch (error) {
            notification('error', error.message)
        }
    });
}
*/
export function* findPositionRequest() {
    yield takeEvery('FIND_POSITION', function* (data) {
        try {
            const apps = yield call(find, data.payload);
            yield put({
                type: actions.FIND_POSITION_SUCCESS,
                payload: apps
            });
        } catch (error) {
            notification('error', error.message)
        }
    });
}

/*
export function* updatePositionRequest() {
    yield takeEvery('UPDATE_POSITION', function* (data) {
        try {
            const position = yield call(update, data.payload);
            yield put({
                type: actions.UPDATE_POSITION_SUCCESS,
                position
            });
        } catch (error) {
            notification('error', error.message)
        }
    });
}

export function* patchPositionRequest() {
    yield takeEvery('PATCH_POSITION', function* (data) {
        try {
            const position = yield call(patch, data.payload);
            yield put({
                type: actions.PATCH_POSITION_SUCCESS,
                position
            });
        } catch (error) {
            notification('error', error.message)
        }
    });
}
*/

function find(payload) {
    return app.service('positions').find(payload);
}

function create(payload) {
    /* return app.service('positions').create(payload);*/
}

function update(payload) {
    return app.service('positions').update(payload);
}

function patch(payload) {
    return app.service('positions').patch(payload.id, payload.data, {});
}


export default function* rootSaga() {
    yield all([
        // fork(createPositionRequest),
        fork(findPositionRequest),
        //fork(updatePositionRequest),
        //fork(patchPositionRequest)
    ]);
}
