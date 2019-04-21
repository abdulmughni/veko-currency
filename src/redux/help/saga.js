import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import actions from './actions';
import {app} from '../../settings/index';
import {notification} from '../../components';

export function* createTicketRequest() {
  yield takeEvery('CREATE_TICKET', function* (data) {
    try {
      const ticket = yield call(create, data.payload);
      yield put({
        type: actions.CREATE_TICKET_SUCCESS,
        ticket
      });
      notification('success', 'Ticket has been created!');
    } catch(error) {
      notification('error', error.message);
    }
  });
}

export function* sendMessageRequest() {
  yield takeEvery('SEND_MESSAGE', function* (data) {
    try {
      const message = yield call(createMessage, data.payload);
      yield put({
        type: actions.SEND_MESSAGE_SUCCESS,
        payload: message
      });
      notification('success', 'Message send');
    } catch(error) {
      notification('error', error.message);
    }
  });
}

export function* findTicketRequest() {
  yield takeEvery('FIND_TICKET', function* (data) {
    try {
      const trans = yield call(find, data.payload);
      yield put({
        type: actions.FIND_TICKET_SUCCESS,
        payload: trans
      });
    } catch(error) {
      notification('error', error.message);
    }
  });
}

export function* patchTicketRequest() {
    yield takeEvery('PATCH_TICKET', function* (data) {
        try {
            const ticket = yield call(patch, data.payload);
            yield put({
                type: actions.PATCH_TICKET_SUCCESS,
                ticket
            });

        } catch (error) {
            notification('error', error.message)
        }
    });
}

function create(payload) {
  return app.service('tickets').create(payload);
}

function createMessage(payload) {
  return app.service('ticketMessages').create(payload);
}

function find(payload) {
  return app.service('tickets').find(payload);
}

function patch(payload) {
  return app.service('tickets').patch(payload.id, payload.data, {});
}

export default function* rootSaga() {
  yield all([
    fork(createTicketRequest),
    fork(findTicketRequest),
    fork(sendMessageRequest),
    fork(patchTicketRequest)
  ]);
}
