import React, {Component} from 'react';
import {Row, Col, Modal, Tooltip, Tabs, Table, Popconfirm, Icon} from 'antd';
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import vekoActions from '../../../redux/veko/actions'
import Box from "../../../components/utility/box";
import OrderWindow from './OrderWindow';
import {connect} from 'react-redux';
import basicStyle from '../../../settings/basicStyle';
import Moment from 'react-moment';
import {Radio} from "antd/lib/index";
import {Client} from "../../../settings";
import Positions from "../../Positions";

import IntlMessages from '../../../components/utility/intlMessages';

const {colStyle, rowStyle, gutter} = basicStyle;
const {TabPane} = Tabs;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

export class Main extends Component {
    state = {
        orderWindowShow: false
    };

    componentWillMount() {
        const {initSystemSettings, user, getPortfolio, initUserData} = this.props;
        initSystemSettings();
        getPortfolio(user._id);
        initUserData();
    }

    reEntryChange = (value) => {
        Client.service('users').patch(this.props.user._id, {reEntry: value});
    }

    sellingOrder = () => {

        this.setState({orderWindowShow: true, orderType: 'sell'})
    };
    buyingOrder = () => {
        //console.log(`buying..`)
        this.setState({orderWindowShow: true, orderType: 'buy'})
    };
    handleOrder = (data) => {
        //console.log(data);
        this.props.exchange(data);
        this.setState({orderWindowShow: false})
    };
    sellPosition = (data) => {
        let trade = {
            type: 'sell',
            quantity: data.quantity,
            amount: data.quantity * this.props.systemSettings.EXCHANGE.sellingPrice,
            positionId: data._id
        };
        this.handleOrder(trade);

    };
    onCancelOrder = () => {
        this.setState({orderWindowShow: false})
    };


    tradesColumns = [
        {
            title: <IntlMessages id="exchange.dateTime"/>,
            dataIndex: 'createdAt',
            width: '25%',
            rowKey: 'createdAt',
            align: 'center',
            render: text => <Moment format="DD MMM YY - HH:mm">
                {text}
            </Moment>
        },
        {
            title: <IntlMessages id="exchange.vekos"/>,
            dataIndex: 'quantity',
            width: '10%',
            rowKey: 'quantity',
            render: quantity => <span>{quantity.toFixed(3)}</span>
            // align: 'center'
        }
        ,
        {
            title: <IntlMessages id="exchange.type"/>,
            dataIndex: 'type',
            width: '15%',
            rowKey: 'type',
        },
        {
            title: <IntlMessages id="exchange.price"/>,
            dataIndex: 'rate',
            width: '15%',
            rowKey: 'rate',
        },
        {
            title: <IntlMessages id="exchange.usd"/>,
            dataIndex: 'amount',
            width: '10%',
            rowKey: 'amount',
            // align: 'center',
            render: amount => <span>{amount.toFixed(3)}</span>
        }
    ];

    render() {
        // console.log(this.props.trades)
        // console.log(this.props.positions)
        //console.log(window.innerWidth);
        return (
            <LayoutWrapper>
                <Row type={'flex'} gutter={16} style={rowStyle}>
                    <Col lg={6} sm={24} xs={24} order={window.innerWidth < 500 ? 1 : 4}><Box>
                        <Row type={'flex'} justify={'center'}>
                        <span
                            style={{fontSize: '200%'}}>{this.props.wallet.veko.availableBalance.toFixed(2)}</span>
                        </Row>

                        <Row justify={'center'} type={'flex'}> <span
                            style={{margin: 0, padding: 0}}><IntlMessages id="exchange.vekoWallet"/></span></Row>
                    </Box></Col>
                    <Col lg={6} sm={24} xs={24} order={2} onClick={e => this.sellingOrder()}>

                        <Box style={{
                            background: '#f5222d',
                            color: '#fff',
                            cursor: 'pointer'
                        }}><Tooltip title={<IntlMessages id="dashboard.clickToSell"/>}>
                            <Row type={'flex'} justify={'center'} align={'middle'}>
                                <span
                                    style={{color: '#bababa', marginRight: '10px'}}><IntlMessages
                                    id="exchange.sell"/></span>
                                <span
                                    style={{fontSize: '350%'}}>{this.props.systemSettings.EXCHANGE.sellingPrice}</span>
                                <span
                                    style={{color: '#bababa', marginLeft: '10px'}}><IntlMessages
                                    id="exchange.usd"/></span>
                            </Row>
                        </Tooltip>
                        </Box>


                    </Col>
                    <Col lg={6} sm={24} xs={24} order={3} onClick={e => this.buyingOrder()}>
                        <Box style={{
                            backgroundColor: '#1890ff',
                            color: '#fff',
                            cursor: 'pointer'
                        }}><Tooltip title={<IntlMessages id="dashboard.clickToBuy"/>}>
                            <Row type={'flex'} justify={'center'} align={'middle'}>
                        <span
                            style={{color: '#bababa', marginRight: '10px',}}><IntlMessages id="exchange.buy"/></span>
                                <span style={{
                                    fontSize: '350%',
                                    marginBottom: 0
                                }}>{this.props.systemSettings.EXCHANGE.buyingPrice}</span>
                                <span
                                    style={{color: '#bababa', marginLeft: '10px',}}><IntlMessages
                                    id="exchange.usd"/></span>
                            </Row>
                            <Row>

                            </Row></Tooltip></Box>
                    </Col>

                    <Col lg={6} sm={24} xs={24} order={window.innerWidth < 500 ? 4 : 1}>
                        <Box>
                            <Row type={'flex'} justify={'center'} align={'middle'} style={{}}>
                        <span
                            style={{
                                fontSize: '200%',
                                color: '#23b7e5'
                            }}>{this.props.wallet.cash.availableBalance.toFixed(2)}</span>
                                <span style={{color: '#bababa', marginLeft: '10px'}}><IntlMessages
                                    id="exchange.usd"/></span>
                            </Row>

                            <Row style={{marginTop: '10px', margin: 0, padding: 0, Bottom: 0}} justify={'center'}
                                 type={'flex'}>
                                <span><IntlMessages id="exchange.cashWallet"/></span>
                            </Row>

                        </Box>
                    </Col>
                    <Modal visible={this.state.orderWindowShow} footer={null}
                           title={
                               this.state.orderType === 'sell' ? <IntlMessages id="dashboard.sellOrder"/> :
                                   <IntlMessages id="dashboard.buyOrder"/>
                           } closable={false}
                           destroyOnClose={true}
                    >
                        <OrderWindow
                            type={this.state.orderType}
                            rate={this.state.orderType === 'sell' ? this.props.systemSettings.EXCHANGE.sellingPrice : this.props.systemSettings.EXCHANGE.buyingPrice}
                            vekos={this.props.wallet.veko.availableBalance}
                            cash={this.props.wallet.cash.availableBalance}
                            handleOrder={e => this.handleOrder(e)}
                            onCancelOrder={e => this.onCancelOrder()}
                        />
                    </Modal>
                </Row>
                <span style={{fontSize: '150%', marginTop: '30px', marginBottom: '10px'}}><IntlMessages
                    id="exchange.portfolio"/></span>
                <Row type={'flex'} style={rowStyle} gutter={gutter} justify={'space-around'}>
                    <Col sm={6} style={colStyle}>
                        <Box>
                            <Row type={'flex'} style={rowStyle} justify={'center'} align={'middle'}>
                                <span style={{fontSize: '200%'}}>{this.props.portfolio.price.toFixed(3)}</span>
                                <span style={{color: '#bababa', marginLeft: '5px'}}><IntlMessages
                                    id="exchange.usd"/></span>
                            </Row>
                            <Row type={'flex'} justify={'center'} style={rowStyle}>
                                <span><IntlMessages id="exchange.averageBuyingRate"/></span>
                            </Row>
                        </Box>
                    </Col>
                    <Col sm={6} style={colStyle}>
                        <Box>
                            <Row type={'flex'} style={rowStyle} justify={'center'} align={'middle'}>
                                <span
                                    style={{fontSize: '200%'}}>{(this.props.portfolio.price * this.props.portfolio.vekos).toFixed(2)}</span>
                                <span style={{color: '#bababa', marginLeft: '5px'}}><IntlMessages
                                    id="exchange.usd"/></span>
                            </Row>
                            <Row type={'flex'} justify={'center'} style={rowStyle}>
                                <span><IntlMessages id="exchange.investment"/></span>
                            </Row>
                        </Box>
                    </Col>
                    <Col sm={6} style={colStyle}>
                        <Box>
                            <Row type={'flex'} style={rowStyle} justify={'center'} align={'middle'}>
                                <span
                                    style={{fontSize: '200%'}}>{(this.props.systemSettings.EXCHANGE.sellingPrice * this.props.portfolio.vekos).toFixed(2)}</span>
                                <span style={{color: '#bababa', marginLeft: '5px'}}><IntlMessages
                                    id="exchange.usd"/></span>
                            </Row>
                            <Row type={'flex'} justify={'center'} style={rowStyle}>
                                <span><IntlMessages id="exchange.currentValue"/></span>
                            </Row>
                        </Box>
                    </Col>
                </Row>
                <Tabs style={{width: '100%'}} defaultActiveKey="1" size={'large'}>
                    <TabPane tab={<IntlMessages id="exchange.positions"/>} key="1"><Positions/></TabPane>
                    <TabPane tab={<IntlMessages id="exchange.trades"/>} key="2"><Table rowKey={record => record._id}
                                                                                       size="small"
                                                                                       scroll={{x: 600}}
                                                                                       dataSource={this.props.trades}
                                                                                       columns={this.tradesColumns}/></TabPane>
                    <TabPane tab={<IntlMessages id="member.exchange.re-entrySettings"/>} key='3'>
                        <div style={{marginTop: '20px'}}>
                            <RadioGroup defaultValue={this.props.user.reEntry}
                                        onChange={e => this.reEntryChange(e.target.value)}>
                                <RadioButton value="auto"><IntlMessages
                                    id="member.exchange.autoRe-enter"/></RadioButton>
                                <RadioButton value="capitalOnly"><IntlMessages
                                    id="member.exchange.capitalOnlyRe-enter"/></RadioButton>
                                <RadioButton value="manual"><IntlMessages
                                    id="member.exchange.manualTrade"/></RadioButton>
                            </RadioGroup>
                        </div>

                    </TabPane>
                </Tabs>
            </LayoutWrapper>

        )
    }
}

export default connect(state => ({
    ...state.Veko.toJS(),
    ...state.App.toJS(),
    user: state.Auth.profile,
    wallet: state.Wallets
}), ({...vekoActions}))(Main);
