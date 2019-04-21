import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Avatar, Row, Col, Button, message, Modal } from 'antd';
import ticketActions from "../../../redux/help/actions";
import usersActions from '../../../redux/users/actions';
import Moment from 'react-moment';
import { TicketWrapper } from '../tickets.style';
import './style.css';

const { Meta } = Card;
const { findTicket, patchTicket } = ticketActions;
const { findUser } = usersActions;

class TicketDetails extends Component {

  state = {
      visible: false,
      userIdData: '',
      query: {
          $limit: 100000,
          $sort: {
              createdAt: -1
          }
      }
  };

  componentDidMount() {
    this.letFindTicket();
    this.letFindUser();
  }

  letFindUser = () => {
    const { findUser } = this.props
    findUser({
        query: {
            ...this.state.query
        }
    })
  }

  letFindTicket = () => {
        const { findTicket } = this.props
        findTicket({
            query: {
                ...this.state.query
            }
        })
    }

  patchTicket = (data) => {
      const { patchTicket } = this.props;
      if(data.status === 'open') {
        patchTicket({ id: data._id, data: {status: 'closed'} });
        message.success('Ticket has been Closed!');
      } else {
        patchTicket({ id: data._id, data: {status: 'open'} });
        message.success('Ticket has been Open!');
      }
  }

  showModal = (data) => {
    this.setState({
      visible: true,
      userIdData: data,
    });


  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const RelatedTicket = this.props.tickets.map(data => {
      return(
          this.props.urlId === data._id
          &&
          <TicketWrapper key={data._id}>
              <Row type={'flex'} justify={'space-between'} gutter={32} className="ticketFirstRow">
                 <Col lg={3} md={6} sm={24} xs={24} style={{ textAlign: 'center'}}>
                   <div className={`status ${data.status === 'open' ? 'open' : 'close'}`}>{data.status}</div>
                 </Col>
                 <Col lg={21} md={18} sm={24} xs={24}>
                   <Meta
                     title={data.subject}
                     description={`${data.messages[0].content}`}
                   />
                 </Col>
              </Row>

              <Row type={'flex'} gutter={32} className="ticketSecondRow">
                  <Col lg={6} md={12} sm={24} xs={24}>
                    <Meta
                      onClick={this.props.user.role === 'admin' ? () => this.showModal(data.userId) : ''}
                      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                      title={`${data.userId}`}
                      description="Raised By"
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    <Meta
                      avatar={<Icon type="fork" />}
                      title={data.category}
                      description="Ticket Category"
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    <Meta
                      avatar={<Icon type="clock-circle-o" />}
                      description={<Moment format='MM-DD-YYYY - hh:mm a'>{data.createdAt}</Moment>}
                      title="Post Date"
                    />
                  </Col>
                  <Col lg={6} md={12} sm={24} xs={24}>
                    {
                      this.props.user.role === 'admin'
                      &&
                      <Button
                        onClick={e => this.patchTicket({ _id: data._id, status: data.status })}>
                        { data.status === 'open' ? 'Close' : 'Open' } The Ticket
                      </Button>
                    }
                  </Col>
              </Row>
          </TicketWrapper>
      );
    })
    const userInfo = this.props.accounts.map(data => {
      return(
        this.state.userIdData === data._id
        &&
        <div className="popupUserInfo">
          <div><b>Name: </b> {`${data.firstname} ${data.lastname}`}</div>
          <div><b>Package: </b> {data.package.title}</div>
          <div><b>Status: </b> {data.role}</div>
          <div><b>Country: </b> {data.address.country}</div>
          <div><b>Membership Date: </b> <Moment format="YYYY-MM-DD">
              {data.membershipDate}
          </Moment> </div>
        </div>
      )
    })

    return(
        <div>
          {RelatedTicket}
          <Modal
            title="User Information"
            footer={false}
            visible={this.state.visible}
            onCancel={this.handleCancel}
          >
            {userInfo}
          </Modal>
        </div>
    );
  }
}

export default connect(state => ({
  tickets: state.Tickets.tickets,
  user: state.Auth.profile,
  accounts: state.Users.users
}), { findTicket, patchTicket, findUser })(TicketDetails);
