import React, {Component} from "react";
import {connect} from "react-redux";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
import {WalletWrapper} from '../styles.js'
import {Row, Col, InputNumber, Popconfirm, message, Spin, Table, Icon, Tabs, Radio} from "antd";
import Box from "../../../components/utility/box";
import Button from '../../../components/uielements/button';
import {store} from "../../../redux/store";
import vekoActions from "../../../redux/veko/actions";
import {isEmpty} from "../config";

const TabPane = Tabs.TabPane;


function getInputValue(value) {
    value = parseFloat(value);
    if (!(isNaN(value)) && isFloat(value)) {
        value = value.toFixed(3);
    }
    else if (isNaN(value)) {
        value = '';
    }
    return value;
}

function reEntryChange(value) {
    console.log(value);
}

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

class Exchange extends Component {
    state = {
        selectedItem: "",
        selectedTitle: "",
        selectedPositionId: "",
        vekoValue: 1,
        sellUSD: 0,
        buyUSD: 0,
        transactionAmount: 0,
        buyingPrice: 0,
        sellingPrice: 0,
        currentPrice: 0,
        user: {},
        wallet: {},
        positions: [],
        trades: [],
    };

    componentDidMount() {
        console.log(this.props);
        const {systemSettings, wallet, initUserData, initSystemSettings} = this.props;
        initSystemSettings();
        /*
        if (isEmpty(systemSettings)) {
            initSystemSettings();
        }
        if (isEmpty(wallet)) {
            initUserData();
        }
         */
        const unsubscribe = store.subscribe(() => console.log('Store Updated'));
        let vekoStore = store.getState().Veko;

        console.log('Veko Store:', vekoStore);

        if (!(isEmpty(systemSettings))) {
            this.setState({
                buyingPrice: systemSettings.EXCHANGE.buyingPrice,
                sellingPrice: systemSettings.EXCHANGE.sellingPrice,
                buyUSD: systemSettings.EXCHANGE.buyingPrice,
                sellUSD: systemSettings.EXCHANGE.sellingPrice
            })
        }

    }

    componentWillReceiveProps() {
        const {systemSettings} = this.props;
        if (!(isEmpty(systemSettings))) {
            this.setState({
                buyingPrice: systemSettings.EXCHANGE.buyingPrice,
                sellingPrice: systemSettings.EXCHANGE.sellingPrice,
                buyUSD: systemSettings.EXCHANGE.buyingPrice,
                sellUSD: systemSettings.EXCHANGE.sellingPrice
            })
        }
    }

    setBuy() {
        this.setState({
            selectedItem: 'buy',
            selectedTitle: 'Buying',
            vekoValue: 1,
            buyUSD: this.state.buyingPrice,
            sellUSD: this.state.sellingPrice,
            selectedPositionId: ""
        });
    }

    setSell() {
        this.setState({
            selectedItem: 'sell',
            selectedTitle: 'Selling',
            vekoValue: 1,
            buyUSD: this.state.buyingPrice,
            sellUSD: this.state.sellingPrice,
            selectedPositionId: ""
        });
    }

    onChangeVekoSell(value) {
        this.setState({
            vekoValue: value,
            sellUSD: value * this.state.sellingPrice
        });
    }

    onChangeVekoBuy(value) {
        this.setState({
            vekoValue: value,
            buyUSD: value * this.state.buyingPrice
        });
    }

    onChangeUSDSell(value) {
        this.setState({
            sellUSD: value,
            vekoValue: value / this.state.sellingPrice
        });
    }

    onChangeUSDBuy(value) {
        this.setState({
            buyUSD: value,
            vekoValue: value / this.state.buyingPrice
        });
    }

    confirmSell(e) {
        this.exchange('sell', this.state.sellUSD);
    }

    confirmBuy(e) {
        this.exchange('buy', this.state.buyUSD);
    }

    onCancel(e) {
        message.error('Cancelled');
    }

    exchange(type, transactionAmount) {
        let data = {};
        let trade = {
            type: type,
            quantity: this.state.vekoValue,
            amount: transactionAmount,
            user: this.props.user._id
        };
        if (this.state.selectedPositionId && trade.type === 'sell') {
            trade.positionId = this.state.selectedPositionId;
        }
        data.user_id = this.props.user._id;
        data.trade = trade;
        store.dispatch({
            type: vekoActions.EXCHANGE,
            payload: data
        });
        console.log('Updated Veko store', store.getState().Veko);
    }


    BuyVeko() {
        let vekoValue = getInputValue(this.state.vekoValue);
        const buyUSD = getInputValue(this.state.buyUSD);
        let title = `${this.state.selectedTitle} => Veko: ${vekoValue}, USD: ${buyUSD}`;
        return <Box>
            <h3>*Buying Veko*</h3>
            <Row>
                <Col xs={8}>
                    <p><strong>Quantity: </strong></p>
                    <p><strong>Amount($): </strong></p>
                </Col>
                <Col xs={1}/>
                <Col xs={8}>
                    <InputNumber min={1} value={vekoValue} onChange={this.onChangeVekoBuy.bind(this)}/>
                    <br/>
                    <InputNumber min={this.state.buyingPrice} value={buyUSD} onChange={this.onChangeUSDBuy.bind(this)}/>
                </Col>
            </Row>
            <Row>
                <div className="button">
                    <Col xs={4}/>
                    <Col xs={4}>
                        <Popconfirm title={title} okText="Confirm" cancelText="Cancel" onCancel={this.onCancel}
                                    onConfirm={this.confirmBuy.bind(this)}>
                            <a><Button type="primary">Confirm</Button></a>
                        </Popconfirm>
                    </Col>
                </div>
            </Row>
        </Box>
    }

    SellVeko() {
        const vekoValue = getInputValue(this.state.vekoValue);
        const sellUSD = getInputValue(this.state.sellUSD);
        let title = `${this.state.selectedTitle} => Veko: ${vekoValue}, USD: ${sellUSD}`;
        return <Box>
            <Row>
                <h3>*Selling Veko*</h3>
                <Col xs={8}>
                    <p><strong>Quantity: </strong></p>
                    <p><strong>Amount($): </strong></p>
                </Col>
                <Col xs={1}/>
                <Col xs={8}>
                    <InputNumber min={1} value={vekoValue} onChange={this.onChangeVekoSell.bind(this)}/>
                    <br/>
                    <InputNumber min={this.state.sellingPrice} value={sellUSD}
                                 onChange={this.onChangeUSDSell.bind(this)}/>
                </Col>
            </Row>
            <Row>
                <div className="button">
                    <Col xs={4}/>
                    <Col xs={4}>
                        <Popconfirm title={title} okText="Confirm" cancelText="Cancel" onCancel={this.onCancel}
                                    onConfirm={this.confirmSell.bind(this)}>
                            <a><Button type="primary">Confirm</Button></a>
                        </Popconfirm>
                    </Col>
                </div>
            </Row>
        </Box>
    }

    showSelected() {
        let item = this.state.selectedItem;
        if (item === 'buy') {
            return this.BuyVeko();
        }
        else if (item === 'sell') {
            return this.SellVeko();
        }
    }

    clearPosition(positionId) {
        const selectedPosition = this.props.userPositions.filter((position) => position._id === positionId)[0];
        const amount = selectedPosition.quantity * this.state.sellingPrice;
        this.setState({
            selectedItem: "",
            vekoValue: selectedPosition.quantity,
            selectedPositionId: positionId
        }, () => {
            this.exchange('sell', amount);
        });
    }

    positionsColumns = [
        {
            title: 'Datetime',
            dataIndex: 'createdAt',
            width: '20%',
            rowKey: 'createdAt',
            align: 'center',
            render: datetime => <span>{new Date(datetime).toDateString()}</span>
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            width: '15%',
            rowKey: 'quantity',
            align: 'center',
            render: amount => <span>{amount.toFixed(3)}</span>
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            width: '10%',
            rowKey: 'rate',
            render: rate => <span>{rate.toFixed(3)}</span>
            // align: 'center'
        },
        {
            title: 'Exit Price',
            dataIndex: 'exitPrice',
            width: '10%',
            rowKey: 'exitPrice',
            // align: 'center',
            render: amount => <span>{amount.toFixed(3)}</span>
        },
        {
            title: 'Clear Position',
            dataIndex: '_id',
            width: '15%',
            rowKey: '_id',
            align: 'center',
            render: _id => <Popconfirm title="Are you sure to clear this position?" okText="Yes" cancelText="No"
                                       onConfirm={() => this.clearPosition(_id)}>
                <a><Icon type="close"/></a>
            </Popconfirm>

        },
    ];

    tradesColumns = [
        {
            title: 'Datetime',
            dataIndex: 'createdAt',
            width: '25%',
            rowKey: 'createdAt',
            align: 'center',
            render: datetime => <span>{new Date(datetime).toDateString()}</span>
        },
        {
            title: 'Type',
            dataIndex: 'type',
            width: '15%',
            rowKey: 'type',
        },
        {
            title: 'Vekos',
            dataIndex: 'quantity',
            width: '10%',
            rowKey: 'quantity',
            render: quantity => <span>{quantity.toFixed(3)}</span>
            // align: 'center'
        },
        {
            title: 'USD',
            dataIndex: 'amount',
            width: '10%',
            rowKey: 'amount',
            // align: 'center',
            render: amount => <span>{amount.toFixed(3)}</span>
        }
    ];


    render() {
        const {systemSettings, user, portfolio, wallet, userPositions, userTrades} = this.props;
        if (isEmpty(systemSettings) || isEmpty(wallet) || isEmpty(portfolio)) return (
            <div>
                <Spin size="large"/>
            </div>
        );

        let portfolioValue = portfolio.vekos * systemSettings.EXCHANGE.sellingPrice;
        let investment = portfolio.vekos * portfolio.price;
        let currentROI = (portfolioValue - investment) / investment * 100 || 0;

        return (
            <LayoutWrapper>
                <WalletWrapper>
                    {/*<PageHeader>*/}
                    {/*<IntlMessages id="sidebar.exchange"/>*/}
                    {/*</PageHeader>*/}
                    <h3> Welcome {user.firstname} {user.lastname}</h3>
                    <div className="veko exchange">
                        <div className="wallet">
                            <Box>
                                <Row>
                                    <Col xs={24}>
                                        <h3>Wallet</h3>
                                        <p><strong>Vekos: </strong>{wallet.veko.balance.toFixed(3)}</p>
                                        <p><strong>Cash: </strong>{wallet.cash.balance.toFixed(2)}</p>
                                    </Col>
                                </Row>
                            </Box>
                        </div>
                        <div className="portfolio">
                            <Box>
                                <Row>
                                    <Col xs={12}>
                                        <h3>Portfolio Overview</h3>
                                        <p><strong>Vekos: </strong>{portfolio.vekos.toFixed(3)}</p>
                                        <p><strong>Price: </strong>{portfolio.price.toFixed(3)}</p>
                                    </Col>
                                    <Col xs={12}>
                                        <p><strong>Value: </strong>{portfolioValue.toFixed(2)}</p>
                                        <p><strong>Investment: </strong>{investment.toFixed(2)}</p>
                                        <p><strong>Current ROI: </strong>{currentROI.toFixed(2)}</p>
                                    </Col>
                                </Row>

                            </Box>
                        </div>
                        <div className="buy-sell">
                            <Box>
                                <Row>
                                    <Col xs={12}>
                                        <Button type="danger" onClick={this.setSell.bind(this)}>
                                            Sell Now
                                        </Button>
                                        <p><strong>Rate: </strong>$ {systemSettings.EXCHANGE.sellingPrice}</p>
                                    </Col>
                                    <Col xs={12}>
                                        <Button type="primary" onClick={this.setBuy.bind(this)}>
                                            Buy Now
                                        </Button>
                                        <p><strong>Rate: </strong>$ {systemSettings.EXCHANGE.buyingPrice}</p>
                                    </Col>
                                </Row>
                            </Box>
                        </div>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Positions" key="1">
                                <div className="tab-item">
                                    <Table columns={this.positionsColumns} dataSource={userPositions}
                                           pagination={{pageSize: 10}} scroll={{y: 260}} rowKey={record => record._id}/>
                                </div>
                            </TabPane>
                            <TabPane tab="Trades" key="2">
                                <div className="tab-item">
                                    <Table columns={this.tradesColumns} dataSource={userTrades}
                                           pagination={{pageSize: 10}} scroll={{y: 260}} rowKey={record => record._id}/>
                                </div>
                            </TabPane>
                            <TabPane tab='Re-entry Settings' key='3'>
                                <RadioGroup defaultValue={this.props.user.reEntry} onChange={this.reEntryChange}>
                                    <RadioButton value="auto">Auto Re-enter</RadioButton>
                                    <RadioButton value="capitalOnly">Capital only Re-enter</RadioButton>
                                    <RadioButton value="manual">Manual Enter</RadioButton>
                                </RadioGroup>
                            </TabPane>
                        </Tabs>
                        <div className="inter-calculations">
                            {this.showSelected()}
                        </div>
                    </div>
                </WalletWrapper>
            </LayoutWrapper>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.Veko.toJS(),
        user: state.Auth.profile,
        wallet: state.Wallets
    };
}

export default connect(mapStateToProps, vekoActions)(Exchange);
