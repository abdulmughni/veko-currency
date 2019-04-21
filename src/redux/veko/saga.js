import actions from './actions';
import {Client as client} from '../../settings/index';
import {message} from "antd/lib/index";

import {all, takeEvery, put, call} from 'redux-saga/effects';


const priceChangeService = client.service('priceChanges');
const TradeService = client.service('trades');
const PositionService = client.service('positions');
const PortfolioService = client.service('portfolios');
const splitService = client.service('splits');
const ROIService = client.service('rois');
const systemSettingsService = client.service('systemSettings');
const exchangeService = client.service('exchange');

export function* getSystemSettings() {
    const settings = yield call(get_systemSettings);
    //console.log(settings);
    yield put({
        type: actions.SET_SYSTEM_SETTINGS,
        systemSettings: settings
    });
}

function get_allTrades() {
    try {
        return TradeService.find({})
    } catch (e) {
        console.log('trades error', e.message);

    }

}

function get_systemSettings() {
    try {
        return systemSettingsService.find({});
    } catch (e) {
        console.log('find settings erre,', e.message);
    }


}

function get_priceChanges() {
    try {
        return priceChangeService.find({});
    } catch (e) {
        console.log('error while setting price chanes', e.message)
    }

}

function get_splits() {
    try {
        return splitService.find({});
    } catch (e) {
        console.log('find slip', e.message)
    }

}

function get_ROIs() {
    try {
        return ROIService.find({});
    } catch (e) {
        console.log('roi', e.message);
    }

}

function get_allPositions() {
    try {
        return PositionService.find({query: {$limit: -1, $sort: {createdAt: -1}}})
    } catch (e) {
        console.log('position find', e.message)
    }

}

export function* getAdminData() {
    const trades = yield call(get_allTrades)
    yield put({
        type: actions.UPDATE_TRADES,
        payload: trades
    });
    const positions = yield call(get_allPositions)
    yield put({
        type: actions.UPDATE_POSITIONS,
        payload: positions
    });
    yield put({
        type: actions.UPDATE_PRICE_CHANGES,
        payload: yield call(get_priceChanges)
    });
    yield put({
        type: actions.UPDATE_SPLITS,
        payload: yield call(get_splits)
    });
    yield put({
        type: actions.UPDATE_ROIs,
        payload: yield call(get_ROIs)
    });
}

function get_Portfolio(id) {
    return PortfolioService.get(id)
}

export function* getPortfolio(data) {
    const portfolio = yield call(get_Portfolio, data.id)
    yield put({
        type: actions.UPDATE_PORTFOLIO,
        payload: portfolio
    })
}

function get_Positions() {
    let Positions = PositionService.find({query: {$limit: -1}});
    console.log(Positions);
    return []
}

function get_Trades() {
    return TradeService.find({})
}

export function* getUserData() {
    /*const positions = yield call(get_allPositions)
    yield put({
        type: actions.UPDATE_POSITIONS,
        payload: positions
    });*/
    const trades = yield call(get_Trades)
    yield put({
        type: actions.UPDATE_TRADES,
        payload: trades
    });
}

// function* realTimeVeko(veko) {
//     yield put({
//         type: actions.UPDATE_SYSTEM_SETTINGS,
//         systemSettings: veko
//     });
// }


function* patchSystemSettings(action) {
    let systemSettings = action.payload;
    console.log('patching settings');
    yield systemSettingsService.patch('EXCHANGE', systemSettings)
}

function* changePrice(action) {
    console.log(action.payload);
    yield priceChangeService.create(action.payload);
}

function* createSplit(action) {
    yield splitService.create(action.payload);
}

function* createROI(action) {
    yield ROIService.create(action.payload);
}

function* exchange(action) {
    yield actions.exchange(action.payload);
}

function* placeTrade(action) {
    try {
        yield call(createTrade, action.trade)
    }
    catch (e) {
        message.error(e.message);
    }

}

function createTrade(trade) {
    return exchangeService.create(trade);
}

export default function* rootSaga() {
    yield all([
        yield takeEvery(actions.GET_ADMIN_DATA, getAdminData),
        yield takeEvery(actions.GET_PORTFOLIO, getPortfolio),
        yield takeEvery(actions.GET_SYSTEM_SETTINGS, getSystemSettings),
        yield takeEvery(actions.GET_USER_DATA, getUserData),
        yield takeEvery(actions.PATCH_SYSTEM_SETTINGS, patchSystemSettings),
        yield takeEvery(actions.CHANGE_PRICE, changePrice),
        yield takeEvery(actions.CREATE_SPLIT, createSplit),
        yield takeEvery(actions.CREATE_ROI, createROI),
        yield takeEvery(actions.EXCHANGE, exchange),
        yield takeEvery(actions.PLACE_TRADE, placeTrade),
    ]);
}
