import React, {Component} from 'react';
import {Row, Col, Progress, Button, Table, Modal, message, Icon} from 'antd';
import IntlMessages from '../../components/utility/intlMessages';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import RangeForm from '../../containers/bidding/RangeForm'
import "./bidding.css";
import {Client} from '../../settings/index'
import usersActions from '../../redux/users/actions';
import appActions from '../../redux/app/actions';

const confirm = Modal.confirm;


class Bidding extends Component {

    state = {
        queueList: false
    }
    columns = [{
        title: <IntlMessages id="member.wallets.transactions.date"/>,
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: text => <Moment format="DD MMM YY HH:mm">
            {text}
        </Moment>
    }, {
        title: <IntlMessages id="member.register-member.username"/>,
        dataIndex: 'userId',
        key: 'userId',
    }, {
        title: <IntlMessages id="wallet.amount"/>,
        dataIndex: 'amount',
        key: 'amount',
    }];
    showConfirm = () => {
        const {batch, range, wallet, onSubscribed} = this.props
        confirm({
            title: 'Are you sure to Sure?',
            content: `Total amount of $${(this.props.wallet.special.balance * (this.props.batch.limit / 100)).toFixed(2) } will be subscribed for this bidding`,
            onOk() {
                Client.service('bidding').create({
                    batchId: batch._id,
                    rangeId: range._id,
                    amount: (wallet.special.balance * (batch.limit / 100)).toFixed(2)
                })
                    .then(e => {
                        message.success('You have been subscribed successfully!')
                        onSubscribed()
                    }).catch(e => {
                    message.error(e.message);
                })
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    showList = () => {
        if (this.state.queueList === false) {
            this.setState({queueList: true});
        }

        if (this.state.queueList === true) {
            this.setState({queueList: false});
        }

    };
    renderUserColumn = () => {
        const {profile, range, batch} = this.props;
        const columnSize = profile.role === 'member' ? 6 : 4;

        if (range.subscribed === true) {
            return [
                <Col lg={columnSize} sm={24} xs={24}>
                    <div className="biddingInfo range">
                        <div style={{fontSize: 20}}>{'$' + range.subscribedAmount.toFixed(2)}</div>
                        <div>Subscribed Amount</div>
                    </div>
                </Col>
            ]
        } else if (range.batchSubscribed === true) {
            return [
                <Col lg={columnSize} sm={24} xs={24}>
                    <div className="biddingInfo subscribe">
                        <div style={{fontSize: 20}}>{batch.title}</div>
                        <div>Batch Subscribed</div>
                    </div>
                </Col>
            ]
        } else if (range.status === 'closed') {
            return [
                <Col lg={columnSize} sm={24} xs={24}>
                    <div className="biddingInfo subscribe">
                        <div style={{fontSize: 20}}>{<IntlMessages id="bidding.closed"/>}</div>
                        <div><IntlMessages id="bidding.rangeStatus"/></div>
                    </div>
                </Col>
            ]
        } else {
            return [
                <Col lg={columnSize} sm={24} xs={24}>
                    <div onClick={e => this.showConfirm()} className="biddingInfo subscribeNow"
                         style={{cursor: 'pointer'}}>
                        <div style={{fontSize: 17}}><IntlMessages id="bidding.subscribeNow"/></div>

                    </div>
                </Col>
            ]
        }


    };

    componentWillMount() {
        const {profile, batch, range} = this.props;

        if (profile.role === 'admin') {
            Client.service('bidding').find({query: {batchId: batch._id, rangeId: range._id}})
                .then(bids => {
                    this.setState({bids})
                })
        }

    }

    render() {
        //console.log('hello');

        const {range, batch, profile} = this.props;
        const columnSize = profile.role === 'member' ? 6 : 4;

        const borderClass = range.status === 'open' ? 'bidTopRated' : 'rangeClosed';
        return (
            <div className={"biddingBlock bidTopRated"}>
                <Row type={'flex'} gutter={5} justify={'space-between'} className="biddingRow">
                    {/* <Col lg={4} sm={24}>
                        <b><IntlMessages id="bidding.takeUp"/></b>
                    </Col> */}

                    <Col lg={profile.role === 'admin' ? 20 : 24} sm={profile.role === 'admin' ? 20 : 24}>
                        <Progress strokeWidth={15} percent={range.percentage}
                                  status={range.status === 'open' ? 'active' : 'exception'}/>
                    </Col>
                    {
                        profile.role === 'admin'
                        &&
                        <Col span={4}>
                            <Icon style={{marginRight: 10}} onClick={e => this.props.onEdit()} type={'edit'}/>
                            <Icon onClick={e => this.props.onRemove()} type={'delete'}/>
                        </Col>
                    }

                </Row>
                <Row type={'flex'} justify={'space-between'} gutter={4}
                     style={{textAlign: 'center', marginTop: 15}}>
                    <Col lg={columnSize} sm={24} xs={24}>
                        <div className="biddingInfo range">
                            <div style={{fontSize: 20}}>{range.title}</div>
                            {/* <div><IntlMessages id="bidding.range"/></div> */}
                        </div>
                    </Col>

                    <Col lg={columnSize} sm={24} xs={24}>
                        <div className="biddingInfo from">
                            <div style={{fontSize: 20}}>{'$' + range.from}</div>
                            <div><IntlMessages id="bidding.from"/></div>
                        </div>
                    </Col>

                    <Col lg={columnSize} sm={24} xs={24}>
                        <div className="biddingInfo to">
                            <div style={{fontSize: 20}}>{'$' + range.to}</div>
                            <div><IntlMessages id="bidding.to"/></div>
                        </div>
                    </Col>
                    {
                        profile.role === 'member'
                        &&
                        this.renderUserColumn().map(column => column)
                    }
                    {
                        profile.role === 'admin'
                        &&
                        <Col lg={columnSize} sm={24} xs={24}>
                            <div className="biddingInfo subscribeNow">
                                <div style={{fontSize: 18}}>{range.amountReceived.toFixed(2)}</div>
                                <div>Amount Received</div>
                            </div>
                        </Col>
                    }
                    {
                        profile.role === 'admin'
                        &&
                        <Col lg={columnSize} sm={24} xs={24}>
                            <div className={"biddingInfo subscribe "}>
                                < div style={{fontSize: 18}}>{range.limit}</div>
                                <div>Range Limit</div>
                            </div>
                        </Col>
                    }
                </Row>
                {
                    profile.role === 'admin'
                    &&
                    <div style={{marginTop: 15}}>
                        <Row type={'flex'} justify={'center'}><h4>Applications {range.applications}</h4></Row>
                        <Table size='small' dataSource={this.state.bids} columns={this.columns}
                               scroll={{x: 450}}/>
                    </div>

                }
            </div>
        );
    }
}

export default connect(state => ({
    profile: state.Auth.profile,
    wallet: state.Wallets,
    ...state.App

}), {})(Bidding)
