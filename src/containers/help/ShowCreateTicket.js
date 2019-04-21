import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import PageHeader from "../../components/utility/pageHeader";
import ShowTicketForm from '../../components/help/CreateTickets';
import { connect } from "react-redux";
import ticketActions from "../../redux/help/actions";
import IntlMessages from '../../components/utility/intlMessages';
import { Row, Col, message } from 'antd';

const { createTicket } = ticketActions;

class AllTicketCategories extends Component {

  submitTicket = (values) => {
    const { createTicket } = this.props;
    createTicket(values);
  }
  render() {
    return(
      <div>
        <LayoutContentWrapper>
            <PageHeader><IntlMessages id="sidebar.createTicket" /></PageHeader>
            <Row type={'flex'} justify={'center'} gutter={32} style={{width: '100%'}}>
               <Col lg={18} md={22} sm={24} xs={24}>
                  <LayoutContent>
                      <ShowTicketForm submit={this.submitTicket} />
                  </LayoutContent>
                </Col>
            </Row>
        </LayoutContentWrapper>
      </div>
    );
  }
}

export default connect(null, { createTicket })(AllTicketCategories);
