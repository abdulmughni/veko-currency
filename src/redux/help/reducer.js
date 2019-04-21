import actions from './actions';

const initState = {tickets: [], myTickets: {}};

export default function ticketReducer(state = initState, action) {
    switch (action.type) {
      case actions.CREATE_TICKET_SUCCESS: {
          return Object.assign({}, state, {tickets: [...state.tickets, action.ticket]})
      }
      case actions.SEND_MESSAGE_SUCCESS: {
          return Object.assign({}, state, {ticketMessages: [...state.ticketMessages, action.ticketMessage]})
      }
      case actions.FIND_TICKET_SUCCESS: {
          return Object.assign({}, state, {tickets: action.payload.data})
      }
      case actions.PATCH_TICKET_SUCCESS: {
          return Object.assign({}, state, {tickets: [...state.tickets.filter(t => t._id !== action.ticket._id,), action.ticket]})          
      }
      default:
          return state;
    }
}
