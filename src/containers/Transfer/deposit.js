import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutBox';
import {Row, Col, Tabs} from 'antd';
import PageHeader from "../../components/utility/pageHeader";
import {connect} from 'react-redux';
import IntlMessages from '../../components/utility/intlMessages';
import DepositForm from './depositForm';
import Deposits from '../Applications';
import DepositTransactions from './depositTransactions';

const TabPane = Tabs.TabPane;


export class Deposit extends Component {
    state = {
        showForm: true
    };

    componentDidMount() {
    }


    render() {
        const {cash} = this.props;


        //console.log(cash)
        return (
            <LayoutContentWrapper>
                <PageHeader><IntlMessages id="wallet.depositFunds"/></PageHeader>
                <Row type='flex' justify="center" style={{width: '100%', marginBottom: '20px'}}>
                    <Col sm={18} xs={24}>
                        <LayoutContent style={{width: '100%'}}>
                            <Row type='flex' justify="space-around" style={{width: '100%'}}>
                                <Col><span style={{}}><IntlMessages id="wallet.balance"/> : </span><span
                                    style={{fontWeight: 'bold'}}>${cash.balance.toFixed(2)}</span></Col>
                                <Col><span style={{}}><IntlMessages id="wallet.availableBalance"/> : </span><span
                                    style={{fontWeight: 'bold'}}>${cash.availableBalance.toFixed(2)}</span></Col>

                            </Row>
                        </LayoutContent>
                    </Col>
                </Row>
                <Row type='flex' justify="center" style={{width: '100%', marginBottom: '20px'}}>
                    <Col sm={18} xs={24}>
                        <LayoutContent style={{width: '100%'}}>
                            <Tabs defaultActiveKey="1">
                                <TabPane tab={<IntlMessages id="member.transfer.deposit.newDeposit"/>} key="1"><DepositForm></DepositForm></TabPane>
                                <TabPane tab={<IntlMessages id="member.transfer.deposit.depositRequests"/>} key="2"><Deposits></Deposits></TabPane>
                                <TabPane tab={<IntlMessages id="deposit.allDeposits"/>} key="3"><DepositTransactions /></TabPane>
                            </Tabs>
                        </LayoutContent>
                    </Col>
                </Row>
            </LayoutContentWrapper>
        );
    }
}


export default connect(
    state => ({
        cash: state.Wallets.cash,
        user: state.Auth.profile,
        access: state.Auth.accessToken
    })
)(Deposit);
