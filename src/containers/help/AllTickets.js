import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import PageHeader from "../../components/utility/pageHeader";
import OpenTickets from '../../components/help/OpenTickets';
import CloseTickets from '../../components/help/CloseTickets';
import NewTickets from '../../components/help/NewTickets';
import IntlMessages from '../../components/utility/intlMessages';
import { Row, Col, Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class AllTicketShow extends Component {
  render() {
    return(
      <div>
        <LayoutContentWrapper>
            <PageHeader><IntlMessages id="sidebar.allTickets" /></PageHeader>
            <LayoutContent>
                <Tabs size={'large'} defaultActiveKey="1">
                    <TabPane tab="Open Tickets" key="1"><OpenTickets history={this.props.history} /></TabPane>
                    <TabPane tab="Closed Tickets" key="2"><CloseTickets history={this.props.history} /></TabPane>
                </Tabs>
            </LayoutContent>
        </LayoutContentWrapper>
      </div>
    );
  }
}

export default AllTicketShow
