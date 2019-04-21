import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutBox';
import {Row, Col} from 'antd';
import {connect} from 'react-redux';
import IntlMessages from '../../components/utility/intlMessages';
import Transactions from '../Transactions/transactions'

export class FastStart extends Component {
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
                <Row type='flex' justify="center" style={{width: '100%', marginBottom: '20px'}}>
                    <Col sm={24} xs={24}>
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
                    <Col sm={24} xs={24}>

                        <Transactions mainType={'bonus'} type={'powerStart'} />

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
)(FastStart);
