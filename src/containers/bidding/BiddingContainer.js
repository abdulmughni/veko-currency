import React, {Component} from 'react';
import Bidding from '../../components/bidding/Bidding';

import Batch from './batches';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import Announcements from '../../components/Announcements/announcements';
import IntlMessages from '../../components/utility/intlMessages';
import PageHeader from '../../components/utility/pageHeader';
import {Collapse} from 'antd';
import AddNewQueue from './AddNewQueue';

import {connect} from 'react-redux';

class BiddingContainer extends Component {
    biddingData = [
        {
            _id: 1,
            progress: 60,
            vekos: 945000,
            range: 'Range 1',
            from: 0.26,
            to: 0.35,
            amountToBuy: 560000
        },
        {
            _id: 2,
            progress: 60,
            topRated: true,
            vekos: 945000,
            range: 'Range 2',
            from: 0.26,
            to: 0.35,
            limit: 1,
            amountToBuy: 560000,
            subscribe: 4003,
            idShowMore: true,
            idShowLess: false,
            queue: [
                {
                    key: '1',
                    username: 'Abdul Mughni',
                    date: '07-29-18',
                    amount: 12334
                }
            ]
        },
        {
            _id: 3,
            progress: 60,
            vekos: 945000,
            range: 'Range 3',
            from: 0.26,
            to: 0.35,
            amountToBuy: 560000
        }
    ];

    render() {
        return (
            <div style={{padding: 20}}>
                {
                    this.props.profile.role === 'admin'
                    &&
                    <AddNewQueue/>
                }
                <Collapse bordered={false} defaultActiveKey={['1']}>
                    <Batch/>
                </Collapse>

            </div>
        );
    }
}


export default connect(state => ({
    profile: state.Auth.profile
}), {})(BiddingContainer)
