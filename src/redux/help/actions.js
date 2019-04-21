const actions = {
    CREATE_TICKET: 'CREATE_TICKET',
    CREATE_TICKET_SUCCESS: 'CREATE_TICKET_SUCCESS',
    FIND_TICKET: 'FIND_TICKET',
    FIND_TICKET_SUCCESS: 'FIND_TICKET_SUCCESS',
    SEND_MESSAGE: 'SEND_MESSAGE',
    SEND_MESSAGE_SUCCESS: 'SEND_MESSAGE_SUCCESS',
    PATCH_TICKET: 'PATCH_TICKET',
    PATCH_TICKET_SUCCESS: 'PATCH_TICKET_SUCCESS',
    createTicket: (payload) => ({
        type: actions.CREATE_TICKET,
        payload
    }),
    sendMessage: (payload) => ({
        type: actions.SEND_MESSAGE,
        payload
    }),
    findTicket: (payload) => ({
        type: actions.FIND_TICKET,
        payload
    }),
    patchTicket: (payload) => ({
        type: actions.PATCH_TICKET,
        payload
    })
};

export default actions;
