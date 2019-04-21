import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import actions from './actions';
import {app} from '../../settings/index';
import {notification} from '../../components'

export function* createUserRequest() {
    yield takeEvery('CREATE_USER', function* (data) {
        try {
            const user = yield call(create, data.payload);
            yield put({
                type: actions.CREATE_USER_SUCCESS,
                user
            });
            notification('success', 'Account has been created successfully!')
            yield put(push('/signin'));
        } catch (error) {
            notification('error', error.message)
        }
    });
}

export function* findUserRequest() {
    yield takeEvery('FIND_USER', function* (data) {
        try {
            const users = yield call(find, data.payload);
            yield put({
                type: actions.FIND_USER_SUCCESS,
                payload: users
            });
        } catch (error) {
            notification('error', error.message)
        }
    });
}

export function* updateUserRequest() {
    yield takeEvery('UPDATE_USER', function* (data) {
        try {
            const users = yield call(update, data.payload);
            yield put({
                type: actions.UPDATE_USER_SUCCESS,
                users
            });
        } catch (error) {
            notification('error', error.message)
        }
    });
}

export function* pathUserRequest() {
    yield takeEvery('PATCH_USER', function* (data) {
        try {
            const user = yield call(patch, data.payload);
            yield put({
                type: actions.PATCH_USER_SUCCESS,
                user
            });
            yield put({
                type: 'UPDATE_AUTH_PROFILE',
                profile: user
            });
        } catch (error) {
            notification('error', error.message)
        }
    });
}

function find(payload) {
    return app.service('users').find(payload);
}

function create(payload) {
    return app.service('users').create(payload);
}

function update(payload) {
    return app.service('users').update(payload);
}

function patch(payload) {
    return app.service('users').patch(payload.id, payload.data, {});
}


export default function* rootSaga() {
    yield all([
        fork(createUserRequest),
        fork(findUserRequest),
        fork(updateUserRequest),
        fork(pathUserRequest)
    ]);
}
