import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import PageHeader from "../../components/utility/pageHeader";
import ShowTicketCategories from '../../components/help/AllTickets';
import IntlMessages from '../../components/utility/intlMessages';
import { Row, Col } from 'antd';

class AllTicketCategories extends Component {
  render() {
    return(
      <div>
        <LayoutContentWrapper>
            <PageHeader><IntlMessages id="sidebar.allTickets" /></PageHeader>
            <Row type={'flex'} justify={'center'} gutter={32} style={{width: '100%'}}>
               <Col lg={18} md={22} sm={24} xs={24}>
                  <LayoutContent>
                      <ShowTicketCategories />
                  </LayoutContent>
                </Col>
            </Row>
        </LayoutContentWrapper>
      </div>
    );
  }
}

export default AllTicketCategories
