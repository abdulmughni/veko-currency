import React, {Component} from 'react';
import { Card, Icon, Avatar, Row, Col } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import ticketActions from "../../redux/help/actions";
import { TicketWrapper } from './tickets.style';

const { Meta } = Card;
const { findTicket } = ticketActions;

class OpenTickets extends Component {
  state = {
      query: {
          $limit: 100,
          $sort: {
              createdAt: -1
          }
      }
  };
  componentDidMount() {
    this.letFindTicket();
  }
  goToChat = (id) => {
    this.props.history.push(`ticket-chat/${id}`);
  }
  letFindTicket = () => {
      const { findTicket } = this.props
      findTicket({
          query: {
              ...this.state.query
          }
      })
  }

  render() {
    const tickets = this.props.tickets.map(data => {
      return(
        <div key={data._id}>
          {
            this.props.user._id === data.userId && data.status === 'open'
            &&
            <TicketWrapper key={data._id} onClick={() => this.goToChat(data._id)}>
                <Row type={'flex'} justify={'space-between'} gutter={32} className="ticketFirstRow">
                   <Col lg={3} md={6} sm={24} xs={24} style={{ textAlign: 'center'}}>
                     <div className={`status ${data.status === 'open' ? 'open' : 'close'}`}>{data.status}</div>
                   </Col>
                   <Col lg={21} md={18} sm={24} xs={24}>
                     <Meta
                       title={data.subject}
                       description={`${data.messages[0].content.substring(0, 200)} ...`}
                     />
                   </Col>
                </Row>

                <Row type={'flex'} gutter={32} className="ticketSecondRow">
                    <Col lg={8} md={12} sm={24} xs={24}>
                      <Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={`${data.userId}`}
                        description="Raised By"
                      />
                    </Col>
                    <Col lg={8} md={12} sm={24} xs={24}>
                      <Meta
                        avatar={<Icon type="fork" />}
                        title={data.category}
                        description="Ticket Category"
                      />
                    </Col>
                    <Col lg={8} md={12} sm={24} xs={24}>
                      <Meta
                        avatar={<Icon type="clock-circle-o" />}
                        description={<Moment format='MM-DD-YYYY - hh:mm a'>{data.createdAt}</Moment>}
                        title="Post Date"
                      />
                    </Col>
                </Row>
            </TicketWrapper>
          }
        </div>
      );
    })
    return(
      <div>
        {tickets}
      </div>
    );
  }
}

export default connect(state => ({
  tickets: state.Tickets.tickets,
  user: state.Auth.profile
}), { findTicket })(OpenTickets);
