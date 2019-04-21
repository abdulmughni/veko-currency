import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import PageHeader from "../../components/utility/pageHeader";
import TicketCategoriesView from '../../components/help/categories';
import { Row, Col } from 'antd';

class TicketCategories extends Component {
  render() {
    return(
      <div>
        <LayoutContentWrapper>
            <PageHeader>Tickets Categories</PageHeader>
            <Row type={'flex'} justify={'center'} gutter={32} style={{width: '100%'}}>
               <Col lg={18} md={22} sm={24} xs={24}>
                  <LayoutContent>
                      <TicketCategoriesView />
                  </LayoutContent>
                </Col>
            </Row>
        </LayoutContentWrapper>
      </div>
    );
  }
}

export default TicketCategories
