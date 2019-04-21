import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import actions from './actions';
import {app} from '../../settings/index';
import {notification} from '../../components/index'

export function* createPackageRequest() {
    yield takeEvery('CREATE_PACKAGE', function* (data) {
        try {
            const pkg = yield call(create, data.data);
            yield put({
                type: actions.CREATE_PACKAGE_SUCCESS,
                payload: pkg
            });
            notification('success', `${pkg.title} has been successfully created!`)
        } catch (error) {
            notification('error', error.message);
        }
    });
}

export function* createPackageSuccess() {
    yield takeEvery('CREATE_PACKAGE_SUCCESS', function* () {
        yield put(push('/admin/packages'));
    })

}

export function* removePackageRequest() {
    yield takeEvery('REMOVE_PACKAGE', function* (action) {
        try {
            //console.log(action);
            const response = yield call(remove, action.data);
            if (response) {

                yield put({type: actions.REMOVE_PACKAGE_SUCCESS, payload: action.data})
                notification('success', 'Package has been removed successfully!');
            }
        } catch (e) {
            notification('error', e.message);
        }
    })
}

function remove(id) {
    return app.service('packages').remove(id);
}

export function* findPackageRequest() {
    yield takeEvery('FIND_PACKAGE', function* (data) {
        try {
            const rawpkgs = yield call(find, data.data);
            yield put({
                type: actions.FIND_PACKAGE_SUCCESS,
                payload: rawpkgs
            });
        } catch (error) {
            notification('error', error.message);
        }
    });
}

function create(payload) {
    return app.service('packages').create(payload);
}

function find(payload) {
    return app.service('packages').find(payload);
}

export default function* rootSaga() {
    yield all([
        fork(createPackageRequest),
        fork(findPackageRequest),
        fork(createPackageSuccess),
        fork(removePackageRequest)
    ]);
}
