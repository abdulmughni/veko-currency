import {Client as client} from '../../settings/index';
import {call} from 'redux-saga/effects';

const systemSettingsService = client.service('systemSettings');
const userId = 'samibasra';

function isEmpty(obj) {
    console.log(obj);
    return obj === null || obj === undefined || Object.keys(obj).length === 0;
}

function* get_systemSettings() {
    return yield call(ApiFetch, '/systemSettings');
}

function* get_userData() {
    return yield call(ApiFetch, '/users/' + userId);
}

function* get_userPositions() {
    return yield call(ApiFetch, '/positions/' + userId);
}

function* get_userTrades() {
    return yield call(ApiFetch, '/trades/' + userId);
}

function* get_allTrades() {
    return yield call(ApiFetch, '/trades');
}

function* get_allPositions() {
    return yield call(ApiFetch, '/positions');
}

function* get_priceChanges() {
    return yield call(ApiFetch, '/priceChanges');
}

function* get_splits() {
    return yield call(ApiFetch, '/splits');
}

function* get_ROIs() {
    return yield call(ApiFetch, '/rois');
}

function* ApiFetch(url) {
    try {
        const response = yield call(fetch, url);
        return yield call([response, response.json]);
    } catch (e) {
        console.log(e);
        return null; // good to return something here
    }
}

export {
    get_systemSettings,
    get_userData,
    get_userPositions,
    get_userTrades,
    get_allTrades,
    isEmpty,
    get_allPositions,
    get_priceChanges,
    get_splits,
    get_ROIs
};
