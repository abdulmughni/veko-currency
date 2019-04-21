import vekoActions from './actions';
import {message} from "antd/lib/index";
import {Map} from "immutable";
import {Client as client} from "../../settings/index";
import {store} from "../store";


const initState = new Map({
    systemSettings: {
        EXCHANGE: {
            sellingPrice: 0,
            buyingPrice: 0,
            spread: 0,
            incrementalPrice: 0,
            currentPrice: 0,
        },
        VEKO: {
            count: 0,
            volumeThreshold: 0,
        },
        SPLIT: {
            value: 0,
            fector: 0,
        },
        ROI: {
            value: 0,
        }
    },
    exchange: {
        buyingPrice: 0,
        sellingPrice: 0,
    },
    trades: [],
    positions: [],
    priceChanges: [],
    splits: [],
    ROIs: [],
    portfolio: {vekos: 0, price: 0},
    userTrades: [],
    userPositions: [],

});
// Admin services
const roisService = client.service('rois');
const splitsService = client.service('splits');
const priceChangeService = client.service('priceChanges');

// User services
const portfolioService = client.service('portfolios');

// Common services
const tradeService = client.service('trades');
const positionsService = client.service('positions');
const systemSettingsService = client.service('systemSettings');

// Event Listeners
systemSettingsService.on('patched', realTimeVeko);
priceChangeService.on('created', realTimePriceChanges);
splitsService.on('created', realTimeSplit);
roisService.on('created', realTimeROI);
portfolioService.on('patched', realTimePortfolio);
tradeService.on('created', realTimeTrade);
//positionsService.on('created', realTimePosition);
//positionsService.on('patched', realTimePosition);


function realTimeVeko(systemSettings) {
    store.dispatch({
        type: vekoActions.UPDATE_SYSTEM_SETTINGS,
        payload: systemSettings
    });
}

function realTimePriceChanges(priceChange) {
    const priceChanges = store.getState().Veko.get('priceChanges');
    priceChanges.unshift(priceChange);
    store.dispatch({
        type: vekoActions.UPDATE_PRICE_CHANGES,
        payload: priceChanges
    });
}

function realTimeSplit(split) {
    const splits = store.getState().Veko.get('splits');
    splits.unshift(split);
    store.dispatch({
        type: vekoActions.UPDATE_SPLITS,
        payload: splits
    });
}

function realTimeROI(ROI) {
    const ROIs = store.getState().Veko.get('ROIs');
    ROIs.unshift(ROI);
    store.dispatch({
        type: vekoActions.UPDATE_ROIs,
        payload: ROIs
    });
}

function realTimePortfolio(portfolio) {
    store.dispatch({
        type: vekoActions.UPDATE_PORTFOLIO,
        payload: portfolio
    });
}

function realTimeTrade(trade) {
    const trades = store.getState().Veko.get('trades');
    // Will need this for multiple users
    // if (trade.user === user._id) {
    if (trade.type === 'sell') {
        message.success('Successfully sold veko(s)')
    }
    else if (trade.type === 'buy') {
        message.success('Successfully purchased veko(s)')
    }
    trades.unshift(trade);
    store.dispatch({
        type: vekoActions.UPDATE_TRADES,
        payload: trades
    });
    // }
}

function realTimePosition(position) {
    //debugger;
    //console.log(position);
    /*  const positions = store.getState().Veko.get('positions');
      const positionIds = positions.map((position) => position._id);
      // if (position.user === this.props.user._id) {
      const index = positionIds.indexOf(position._id);
      if (position.status === 'open' && index === -1) { // new position
          console.log('new position');
          positions.unshift(position);
      } else if (position.status === 'open') { // Patched Position
          console.log('Patched Position')
          positions.splice(index, 1);
          positions.push(position);
      } else if (position.status === 'close') {
          console.log('clear position');
          positions.splice(index, 1);
          //message.success('Position has been cleared')
      }
      store.dispatch({
          type: vekoActions.UPDATE_POSITIONS,
          payload: positions
      });

      // }*/
}

export default function vekoAdminReducer(state = initState, action) {
    switch (action.type) {
        case vekoActions.SET_SYSTEM_SETTINGS:
            return state.set('systemSettings', action.systemSettings);

        case vekoActions.UPDATE_SYSTEM_SETTINGS:
            // Update API
            const systemSettings = action.payload;
            //message.success('System settings updated!');
            // Whatever Id is passed here, it will patch all Ids (EXCHANGE, ROI, SPLIT, VEKO)
            // vekoService.patch('EXCHANGE', systemSettings)
            //     .then(() => {
            //         message.success('Saved!');
            //         // return state.set('systemSettings', systemSettings);
            //     })
            //     .catch((err) => message.error(err));
            return state.set('systemSettings', systemSettings);

        case vekoActions.UPDATE_TRADES:
            //console.log(action.payload);
            return state.set('trades', action.payload);

        case vekoActions.UPDATE_POSITIONS:
            //console.log(action.payload);
            return state.set('positions', action.payload);

        case vekoActions.UPDATE_PRICE_CHANGES:
            return state.set('priceChanges', action.payload);

        case vekoActions.UPDATE_SPLITS:
            return state.set('splits', action.payload);

        case vekoActions.UPDATE_ROIs:
            return state.set('ROIs', action.payload);

        case vekoActions.SET_USER:
            return state.set('user', action.payload);

        case vekoActions.UPDATE_WALLET:
            return state.set('wallet', action.payload);

        case vekoActions.UPDATE_PORTFOLIO:
            //console.log(action.payload);
            return state.set('portfolio', action.payload);

        case vekoActions.UPDATE_USER_POSITIONS:
            return state.set('userPositions', action.payload);

        case vekoActions.UPDATE_USER_TRADES:
            return state.set('userTrades', action.payload);

        case vekoActions.EXCHANGE_ERROR:
            //debugger;
            message.error(action.payload);
            return state;

        default:
            return state;
    }
}
