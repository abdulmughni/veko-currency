import React, { Component } from 'react';
import { connect } from 'react-redux';
import ChatApp from './ChatApp';

class Chat extends Component {

  render() {
    return(
      <div style={{ width: '100%' }}>
        <ChatApp urlId={this.props.urlId} />
      </div>
    );
  }
}

export default Chat;
