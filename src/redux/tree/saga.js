import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import actions from './actions';
import {app} from '../../settings/index';
import {notification} from '../../components'
import {push} from 'react-router-redux';

export function* findTreeRequest() {
    yield takeEvery('GET_TREE', function* (data) {
        try {
            yield put({
                type: actions.SET_LOADING,
                loading: true
            })
            const tree = yield call(getTree, data.id);
            //console.log(tree)
            yield put({
                type: actions.GET_TREE_SUCCESS,
                tree
            });
            yield put({
                type: actions.SET_LOADING,
                loading: false
            })
        } catch (error) {
            notification('error', error.message)
        }
    });
}

export function* pushRoute() {
    yield takeEvery('PUSH_ROUTE', function* (data) {
        yield put(push(data.route));
    });
}

function getTree(id) {
    return app.service('tree').get(id, {query: {action: 'getTree'}});
}


export default function* rootSaga() {
    yield all([
        fork(findTreeRequest),
        fork(pushRoute),
    ]);
}