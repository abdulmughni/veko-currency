import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import actions from './actions';
import {app} from '../../settings/index';
import {notification} from '../../components'

export function* getStatsRequest() {
    yield takeEvery('GET_STATS', function* (data) {
        try {
            //console.log(data);
            const stats = yield call(getStats, data.payload);
            //console.log(stats);
            yield put({
                type: actions.GET_STATS_SUCCESS,
                data: stats
            });
        } catch (error) {
            notification('error', error.message)
        }
    });
}

export function* getAdminStatsRequest() {
    yield takeEvery('GET_ADMIN_STATS', function* (data) {
        try {
            //console.log(data);
            const stats = yield call(getAdminStats, data.payload);
            //console.log(stats);
            yield put({
                type: actions.GET_ADMIN_STATS_SUCCESS,
                data: stats
            });
        } catch (error) {
            notification('error', error.message)
        }
    });
}

function getStats(id) {
    return app.service('stats').get(id, {query: {action: 'memberStats'}});
}

function getAdminStats(id) {
    return app.service('stats').get(id, {query: {action: 'adminStats'}});
}

export default function* rootSaga() {
    yield all([
        fork(getStatsRequest),
        fork(getAdminStatsRequest)
    ]);
}
