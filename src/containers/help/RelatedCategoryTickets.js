import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import PageHeader from "../../components/utility/pageHeader";
import RelatedOpenTickets from '../../components/help/RelatedTicketsOpen';
import RelatedCloseTickets from '../../components/help/RelatedTicketsClose';
import NewTickets from '../../components/help/NewTickets';
import IntlMessages from '../../components/utility/intlMessages';
import { Row, Col, Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class RelatedCategoryTickets extends Component {
  render() {
    return(
      <div>
        <LayoutContentWrapper>
            <PageHeader><IntlMessages id="sidebar.allTickets" /></PageHeader>
            <LayoutContent>
                <Tabs size={'large'} defaultActiveKey="1">
                    <TabPane tab="Bonus" key="1">
                        <Tabs size={'small'} defaultActiveKey="1">
                            <TabPane tab="Open Tickets" key="1"><RelatedOpenTickets history={this.props.history} category={'bonus'} /></TabPane>
                            <TabPane tab="Closed Tickets" key="2"><RelatedCloseTickets history={this.props.history} category={'bonus'} /></TabPane>
                        </Tabs>
                    </TabPane>

                    <TabPane tab="Payment" key="2">
                        <Tabs size={'small'} defaultActiveKey="1">
                            <TabPane tab="Open Tickets" key="1"><RelatedOpenTickets history={this.props.history} category={'payment'} /></TabPane>
                            <TabPane tab="Closed Tickets" key="2"><RelatedCloseTickets history={this.props.history} category={'payment'} /></TabPane>
                        </Tabs>
                    </TabPane>

                    <TabPane tab="Trade" key="3">
                        <Tabs size={'small'} defaultActiveKey="1">
                            <TabPane tab="Open Tickets" key="1"><RelatedOpenTickets history={this.props.history} category={'trade'} /></TabPane>
                            <TabPane tab="Closed Tickets" key="2"><RelatedCloseTickets history={this.props.history} category={'trade'} /></TabPane>
                        </Tabs>
                    </TabPane>

                    <TabPane tab="Sales" key="4">
                        <Tabs size={'small'} defaultActiveKey="1">
                            <TabPane tab="Open Tickets" key="1"><RelatedOpenTickets history={this.props.history} category={'sales'} /></TabPane>
                            <TabPane tab="Closed Tickets" key="2"><RelatedCloseTickets history={this.props.history} category={'sales'} /></TabPane>
                        </Tabs>
                    </TabPane>

                    <TabPane tab="Technical" key="5">
                        <Tabs size={'small'} defaultActiveKey="1">
                            <TabPane tab="Open Tickets" key="1"><RelatedOpenTickets history={this.props.history} category={'technical'} /></TabPane>
                            <TabPane tab="Closed Tickets" key="2"><RelatedCloseTickets history={this.props.history} category={'technical'} /></TabPane>
                        </Tabs>
                    </TabPane>

                    <TabPane tab="General" key="6">
                        <Tabs size={'small'} defaultActiveKey="1">
                            <TabPane tab="Open Tickets" key="1"><RelatedOpenTickets history={this.props.history} category={'general'} /></TabPane>
                            <TabPane tab="Closed Tickets" key="2"><RelatedCloseTickets history={this.props.history} category={'general'} /></TabPane>
                        </Tabs>
                    </TabPane>
                </Tabs>
            </LayoutContent>
        </LayoutContentWrapper>
      </div>
    );
  }
}

export default RelatedCategoryTickets;
