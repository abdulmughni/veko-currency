import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import actions from './actions';
import {app} from '../../settings/index';
import {notification} from '../../components'
import authActions from '../auth/actions'

const {LOGOUT} = authActions;

export function* createTransactionRequest() {
    yield takeEvery('CREATE_TRANSACTION', function* (data) {
        try {
            const transaction = yield call(create, data.payload);
            yield put({
                type: actions.CREATE_TRANSACTION_SUCCESS,
                transaction
            });
            notification('success', 'Transaction has been submitted!');
            yield put({type: LOGOUT});
        } catch (error) {
            notification('error', error.message)
        }
    });
}

export function* findTransactionRequest() {
    yield takeEvery('FIND_TRANSACTION', function* (data) {
        try {
            const trans = yield call(find, data.payload);
            yield put({
                type: actions.FIND_TRANSACTION_SUCCESS,
                payload: trans
            });
        } catch (error) {
            notification('error', error.message)
        }
    });
}

export function* updateTransactionRequest() {
    yield takeEvery('UPDATE_TRANSACTION', function* (data) {
        try {
            const transaction = yield call(update, data.payload);
            yield put({
                type: actions.UPDATE_TRANSACTION_SUCCESS,
                transaction
            });
        } catch (error) {
            notification('error', error.message)
        }
    });
}

export function* patchTransactionRequest() {
    yield takeEvery('PATCH_TRANSACTION', function* (data) {
        try {
            const transaction = yield call(patch, data.payload);
            yield put({
                type: actions.PATCH_TRANSACTION_SUCCESS,
                transaction
            });
            notification('success', 'Transaction has beens submitted');

        } catch (error) {
            notification('error', error.message)
        }
    });
}

function find(payload) {
    return app.service('transactions').find(payload);
}

function create(payload) {
    return app.service('transactions').create(payload);
}

function update(payload) {
    return app.service('transactions').update(payload);
}

function patch(payload) {
    return app.service('transactions').patch(payload.id, payload.data, {});
}


export default function* rootSaga() {
    yield all([
        fork(createTransactionRequest),
        fork(findTransactionRequest),
        fork(updateTransactionRequest),
        fork(patchTransactionRequest)
    ]);
}
