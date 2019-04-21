import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import {app} from '../../settings/index';
import {notification} from "../../components";
import {store} from '../store'

const walletService = app.service('wallets');

export const actions = {
    UPDATE_WALLETS: 'UPDATE_WALLETS',
    GET_WALLETS: 'GET_WALLETS',
    PATCH_WALLETS: 'PATCH_WALLETS',
    get: (id) => ({
        type: actions.GET_WALLETS,
        payload: id
    }),
    patched: (wallets) => ({
        type: actions.PATCH_WALLETS,
        payload: wallets
    })
};

const initialState = {cash: {balance: 0, availableBalance: 0}, veko: {balance: 0, availableBalance: 0}, special: {balance: 0, availableBalance: 0}, consumption: {balance: 0, availableBalance: 0}};

export default function walletsReducer(state = initialState, action) {
    switch (action.type) {
        case actions.UPDATE_WALLETS: {
            return Object.assign({}, state, {...action.payload});
        }
        default:
            return state;
    }
}

export function* getWallets() {
    yield takeEvery('GET_WALLETS', function* (data) {
        try {
            const wallets = yield call(getWallet, data.payload);
            yield put({
                type: actions.UPDATE_WALLETS,
                payload: wallets
            });
        } catch (error) {
            notification('error', error.message)
        }
    });
}

export function* patchWallet() {
    yield takeEvery('PATCH_WALLETS', function* (data) {
        try {
            yield put({
                type: actions.UPDATE_WALLETS,
                payload: data.payload
            });
        } catch (error) {
            //notification('error', error.message)
        }
    });
}


walletService.on('patched', wallets => {
    store.dispatch(actions.patched(wallets));
});

function getWallet(id) {
    return walletService.get(id);
}

export function* walletsSagas() {
    yield all([
        fork(patchWallet),
        fork(getWallets),
    ]);
}