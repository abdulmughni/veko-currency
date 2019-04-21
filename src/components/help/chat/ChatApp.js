import React, { Component } from 'react';
import ChatInput from './ChatInput';
import Messages from './Messages';
import { ChatWrapper } from './chat.style';
import { connect } from 'react-redux';

class ChatApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: []
    }
  }

  chatInputHandler = (username, message, files, date, keys) => {
    const messageObject = {
      username,
      message,
      date,
      files,
      keys
    };
    if(messageObject.username === this.props.user._id) {
      messageObject.fromMe = true;
    } else {
      messageObject.fromMe = false;
    }

    this.addMessage(messageObject);
  }

  addMessage = (message) => {
    const messages = this.state.messages;
    messages.push(message);
    this.setState({ messages });
  }
  render() {
    return(
      <ChatWrapper>
        <Messages urlId={this.props.urlId} messages={this.state.messages} />
        <ChatInput urlId={this.props.urlId} onSend={this.chatInputHandler} />
      </ChatWrapper>
    );
  }
}

export default connect(state => ({
   tickets: state.Tickets.tickets,
   user: state.Auth.profile
}))(ChatApp);
