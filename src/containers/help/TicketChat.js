import React, { Component } from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import PageHeader from "../../components/utility/pageHeader";
import ChatOfTicket from '../../components/help/chat';

class TicketChat extends Component {
  render() {
    return(
      <LayoutContentWrapper>
          <ChatOfTicket urlId={this.props.match.params.id} />
      </LayoutContentWrapper>
    );
  }
}

export default TicketChat;
