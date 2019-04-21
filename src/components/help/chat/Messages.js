import React, { Component } from 'react';
import Message from './Message';
import TicketDetails from './TicketDetails';

class Messages extends Component {

  render() {
    const showMessages = this.props.messages.map((message) => {
      return(
          <Message
             username={message.username}
             message={message.message}
             files={message.files}
             date={message.date}
             keyId={message.keys}
             fromMe={message.fromMe}
          />
      );
    });
    return(
      <div>
          <TicketDetails urlId={this.props.urlId} />
          <div className='messages' id='messageList'>
            {showMessages}
          </div>
      </div>
    );
  }
}

export default Messages;
