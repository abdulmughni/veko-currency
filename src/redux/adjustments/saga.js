import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import actions from './actions';
import {app} from '../../settings/index';
import {notification} from '../../components'
import authActions from '../auth/actions'


export function* createAdjustmentRequest() {
    yield takeEvery('CREATE_ADJUSTMENT', function* (data) {
        try {
            const adjustment = yield call(create, data.payload);
            yield put({
                type: actions.CREATE_ADJUSTMENT_SUCCESS,
                adjustment
            });
            notification('success', 'Adjustment has been submitted!');
        } catch (error) {
            notification('error', error.message)
        }
    });
}

export function* findAdjustmentRequest() {
    yield takeEvery('FIND_ADJUSTMENT', function* (data) {
        try {
            const trans = yield call(find, data.payload);
            yield put({
                type: actions.FIND_ADJUSTMENT_SUCCESS,
                payload: trans
            });
        } catch (error) {
            notification('error', error.message)
        }
    });
}

export function* updateAdjustmentRequest() {
    yield takeEvery('UPDATE_ADJUSTMENT', function* (data) {
        try {
            const adjustment = yield call(update, data.payload);
            yield put({
                type: actions.UPDATE_ADJUSTMENT_SUCCESS,
                adjustment
            });
        } catch (error) {
            notification('error', error.message)
        }
    });
}

export function* patchAdjustmentRequest() {
    yield takeEvery('PATCH_ADJUSTMENT', function* (data) {
        try {
            const adjustment = yield call(patch, data.payload);
            yield put({
                type: actions.PATCH_ADJUSTMENT_SUCCESS,
                adjustment
            });
            notification('success', 'Adjustment has beens submitted');

        } catch (error) {
            notification('error', error.message)
        }
    });
}

function find(payload) {
    return app.service('adjustments').find(payload);
}

function create(payload) {
    return app.service('adjustments').create(payload);
}

function update(payload) {
    return app.service('adjustments').update(payload);
}

function patch(payload) {
    return app.service('adjustments').patch(payload.id, payload.data, {});
}


export default function* rootSaga() {
    yield all([
        fork(createAdjustmentRequest),
        fork(findAdjustmentRequest),
        fork(updateAdjustmentRequest),
        fork(patchAdjustmentRequest)
    ]);
}
