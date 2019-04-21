import React, {Component} from 'react';
import { Table } from 'antd';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import IntlMessages from '../../components/utility/intlMessages';
import PageHeader from '../../components/utility/pageHeader';

export default class ShowPortfolioHistory extends Component {
    dataSource = [{
        key: '1',
        name: 'Mike',
        age: 32,
        address: '10 Downing Street'
    }, {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street'
    }];

    columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    }, {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    }];
    render() {
        return(
            <LayoutContentWrapper style={{padding: '40px 20px'}}>
                <PageHeader><IntlMessages id="sidebar.portfolioHistory"/></PageHeader>
                <LayoutContent>
                    <Table dataSource={this.dataSource} columns={this.columns} scroll={{ x: 600 }} />
                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}