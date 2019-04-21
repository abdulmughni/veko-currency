import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import actions from './actions';
import {app} from '../../settings/index';
import {notification} from '../../components'
import authActions from '../auth/actions'

const {LOGOUT} = authActions;

export function* createApplicationRequest() {
    yield takeEvery('CREATE_APPLICATION', function* (data) {
        try {
            const application = yield call(create, data.payload);
            yield put({
                type: actions.CREATE_APPLICATION_SUCCESS,
                application
            });
            notification('success', 'Application has been submitted!');
            yield put({type: LOGOUT});
        } catch (error) {
            notification('error', error.message)
        }
    });
}

export function* findApplicationRequest() {
    yield takeEvery('FIND_APPLICATION', function* (data) {
        try {
            const apps = yield call(find, data.payload);
            yield put({
                type: actions.FIND_APPLICATION_SUCCESS,
                payload: apps
            });
        } catch (error) {
            notification('error', error.message)
        }
    });
}

export function* updateApplicationRequest() {
    yield takeEvery('UPDATE_APPLICATION', function* (data) {
        try {
            const application = yield call(update, data.payload);
            yield put({
                type: actions.UPDATE_APPLICATION_SUCCESS,
                application
            });
        } catch (error) {
            notification('error', error.message)
        }
    });
}

export function* patchApplicationRequest() {
    yield takeEvery('PATCH_APPLICATION', function* (data) {
        try {
            const application = yield call(patch, data.payload);
            yield put({
                type: actions.PATCH_APPLICATION_SUCCESS,
                application
            });
        } catch (error) {
            notification('error', error.message)
        }
    });
}

function find(payload) {
    return app.service('payments').find(payload);
}

function create(payload) {
    return app.service('payments').create(payload);
}

function update(payload) {
    return app.service('payments').update(payload);
}

function patch(payload) {
    return app.service('payments').patch(payload.id, payload.data, {});
}


export default function* rootSaga() {
    yield all([
        fork(createApplicationRequest),
        fork(findApplicationRequest),
        fork(updateApplicationRequest),
        fork(patchApplicationRequest)
    ]);
}
