import {all} from 'redux-saga/effects';
import authSagas from './auth/saga';
import userSagas from './users/saga'
import packageSagas from './packages/saga';
import applicationSagas from "./applications/saga";
import transactionSagas from './transactions/saga';
import adjustmentsSagas from './adjustments/saga';
import treeSagas from './tree/saga'
import statsSagas from './stats/saga'
import {walletsSagas} from "./wallets/walletRedux";
import vekoSagas from './veko/saga';
import positionSagas from './positions/saga';
import ticketsSaga from './help/saga';

export default function* rootSaga(getState) {
    yield all([
        authSagas(),
        userSagas(),
        packageSagas(),
        applicationSagas(),
        transactionSagas(),
        treeSagas(),
        statsSagas(),
        walletsSagas(),
        vekoSagas(),
        adjustmentsSagas(),
        positionSagas(),
        ticketsSaga()
    ]);
}
