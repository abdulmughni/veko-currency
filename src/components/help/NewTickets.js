import React, {Component} from 'react';
import { Card, Icon, Avatar, Row, Col } from 'antd';
import {
  TicketWrapper,
  Status
} from './tickets.style'

const { Meta } = Card;

class NewTickets extends Component {
  render() {
    return(
      <div>
      <TicketWrapper>
          <Row type={'flex'} justify={'space-between'} gutter={32} className="ticketFirstRow">
             <Col lg={3} md={6} sm={24} xs={24} style={{ textAlign: 'center'}}>
               <span>#fsfd343sdf</span>
               <Status new>New</Status>
             </Col>
             <Col lg={21} md={18} sm={24} xs={24}>
               <Meta
                 title="Sed eget sagittis risus, at rhoncus justo"
                 description="Proin feugiat urna mattis, placerat mauris consectetur, luctus nisi. Fusce venenatis euismod erat non mattis."
               />
             </Col>
          </Row>

          <Row type={'flex'} gutter={32} className="ticketSecondRow">
              <Col lg={8} md={12} sm={24} xs={24}>
                <Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title="Abdul Mughni"
                  description="Raised By"
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <Meta
                  avatar={<Icon type="fork" />}
                  title="Social Media"
                  description="Ticket Category"
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <Meta
                  avatar={<Icon type="clock-circle-o" />}
                  description="08-09-2018"
                  title="Post Date"
                />
              </Col>
          </Row>
      </TicketWrapper>

      <TicketWrapper>
          <Row type={'flex'} justify={'space-between'} gutter={32} className="ticketFirstRow">
             <Col lg={3} md={6} sm={24} xs={24} style={{ textAlign: 'center'}}>
               <span>#fsfd343sdf</span>
               <Status new>New</Status>
             </Col>
             <Col lg={21} md={18} sm={24} xs={24}>
               <Meta
                 title="Sed eget sagittis risus, at rhoncus justo"
                 description="Proin feugiat urna mattis, placerat mauris consectetur, luctus nisi. Fusce venenatis euismod erat non mattis."
               />
             </Col>
          </Row>

          <Row type={'flex'} gutter={32} className="ticketSecondRow">
              <Col lg={8} md={12} sm={24} xs={24}>
                <Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title="Abdul Mughni"
                  description="Raised By"
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <Meta
                  avatar={<Icon type="fork" />}
                  title="Social Media"
                  description="Ticket Category"
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <Meta
                  avatar={<Icon type="clock-circle-o" />}
                  description="08-09-2018"
                  title="Post Date"
                />
              </Col>
          </Row>
      </TicketWrapper>

      <TicketWrapper>
          <Row type={'flex'} justify={'space-between'} gutter={32} className="ticketFirstRow">
             <Col lg={3} md={6} sm={24} xs={24} style={{ textAlign: 'center'}}>
               <span>#fsfd343sdf</span>
               <Status new>New</Status>
             </Col>
             <Col lg={21} md={18} sm={24} xs={24}>
               <Meta
                 title="Sed eget sagittis risus, at rhoncus justo"
                 description="Proin feugiat urna mattis, placerat mauris consectetur, luctus nisi. Fusce venenatis euismod erat non mattis."
               />
             </Col>
          </Row>

          <Row type={'flex'} gutter={32} className="ticketSecondRow">
              <Col lg={8} md={12} sm={24} xs={24}>
                <Meta
                  avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                  title="Abdul Mughni"
                  description="Raised By"
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <Meta
                  avatar={<Icon type="fork" />}
                  title="Social Media"
                  description="Ticket Category"
                />
              </Col>
              <Col lg={8} md={12} sm={24} xs={24}>
                <Meta
                  avatar={<Icon type="clock-circle-o" />}
                  description="08-09-2018"
                  title="Post Date"
                />
              </Col>
          </Row>
      </TicketWrapper>
      </div>
    );
  }
}

export default NewTickets
