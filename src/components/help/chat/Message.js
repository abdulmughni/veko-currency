import React, { Component } from 'react';
import Moment from 'react-moment';

class Message extends Component {
  render() {
    const currentDate = new Date();
    const filesMessage = this.props.files.map(data => {
      return(
          <div className="uploadFiles"><a href={data.url} target="_blank" rel='noopener noreferrer'>{ data.name }</a></div>
      );
    });
    const fromMe = this.props.fromMe ? 'from-me' : '';
    return(
      <div key={this.props.keyId} className={`message ${fromMe}`}>
        <div className="username">
          { this.props.username === 'admin' ? 'Support Agent' : this.props.username }
        </div>
        <div className="message-date">
          {
            this.props.date !== true
            &&
            <Moment format='MM-DD-YYYY - hh:mm a'>{this.props.date}</Moment>
          }
          {
            this.props.date === true
            &&
            <Moment format='MM-DD-YYYY - hh:mm a'>{currentDate}</Moment>
          }
        </div>
        <div className="message-body">
          <div>{ this.props.message }</div>
          {filesMessage}
        </div>
      </div>
    );
  }
}

export default Message;
