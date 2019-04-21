import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import {push} from 'react-router-redux';
import actions from './actions';
import {app} from '../../settings/index';
import {notification} from '../../components'
import AppActions from '../app/actions'
import {actions as walletActions} from "../wallets/walletRedux";
import {store} from '../store'

export function* loginRequest() {
    yield takeEvery('LOGIN_REQUEST', function* (payload) {
        try {
            const response = yield call(login, payload);
            //console.log(response);
            const accessToken = response.accessToken;
            const profile = response.user;
            yield put({
                type: actions.LOGIN_SUCCESS,
                accessToken,
                profile
            });
        } catch (error) {
            notification('error', error.message)
        }
    });
}

function login(payload) {
    //console.log(payload);
    return app.authenticate(payload.payload);
}

export function* loginSuccess() {
    yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
        if (!payload.profile.isVerified) {
            yield put(push('/verify'));
            yield put({
                type: walletActions.GET_WALLETS,
                payload: payload.profile._id
            });
        } else {
            yield put({
                type: walletActions.GET_WALLETS,
                payload: payload.profile._id
            });
            if (payload.profile.role === 'member')
                yield put(push('/member'));
            if (payload.profile.role === 'admin')
                yield put(push('/admin'));
            if (payload.profile.role === 'guest' || payload.profile.role === 'applicant')
                yield put(push('/home'));
        }

    });
}

app.service("users").on('patched', data => {
    store.dispatch({
        type: actions.UPDATE_AUTH_PROFILE,
        profile: data
    })
});

export function* loginError() {
    yield takeEvery(actions.LOGIN_ERROR, function* () {
        //console.log('login error')
    });
}

export function* logout() {
    yield takeEvery(actions.LOGOUT, function* () {
        yield call(logoutApp);
        yield put(push('/'));
    });
}

export function* checkAuthorization() {
    yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
        try {
            const response = yield call(authentication);
            const accessToken = response.accessToken;
            const profile = response.user;
            yield put({
                type: AppActions.APP_LOADED
            });
            yield put({
                type: actions.LOGIN_SUCCESS,
                accessToken,
                profile
            });

        } catch (error) {
            yield put({
                type: AppActions.APP_LOADED
            });
            // notification('error', error.message)
        }

    });
}

function authentication() {
    return app.authenticate()
}

function logoutApp() {
    return app.logout()
}

function bids() {
    return app.service('bidding').find()

}

export default function* rootSaga() {
    yield all([
        fork(checkAuthorization),
        fork(loginRequest),
        fork(loginSuccess),
        fork(loginError),
        fork(logout)
    ]);
}
