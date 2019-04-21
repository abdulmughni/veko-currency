import React, {Component} from "react";
import {connect} from "react-redux";
import LayoutWrapper from "../../../components/utility/layoutWrapper";
// import invoiceActions from "../../../redux/invoice/actions";
import {Row, Col, InputNumber, Table, Modal, Input, Tabs, Icon} from "antd";
import Box from "../../../components/utility/box";
import Button from '../../../components/uielements/button';
import {store} from '../../../redux/store.js'
import vekoActions from "../../../redux/veko/actions";
import basicStyle from '../../../settings/basicStyle'
import Moment from 'react-moment';

const {rowStyle} = basicStyle;

const TabPane = Tabs.TabPane;
const {TextArea} = Input;

class AdminSettings extends Component {
    state = {
        systemSettings: {},
        trades: [],
        positions: [],
        priceChanges: [],
        splits: [],
        ROIs: [],
        user: {},
        saving: false,
        currentPriceModal: false,
        spreadModal: false,
        splitValueModal: false,
        splitFactorModal: false,
        ROIModal: false,
        createSplitModal: false,
        incrementalModal: false,
        volumeThresholdModal: false,

    };

    componentDidMount() {
        //console.log(`exchange is loaded`);
        const {initSystemSettings, initAdminData} = this.props;
        initSystemSettings();
        initAdminData();
        /*
        if (isEmpty(systemSettings) || isEmpty(user)) {
            initSystemSettings();
        }
        */

        let vekoStore = store.getState().Veko;

        // const unsubscribe = store.subscribe(this.updatedStore);
        // unsubscribe();

        console.log('Veko Store:', vekoStore);
    }

    showModal = (elementId) => {
        const varName = elementId + "Modal";
        const data = {};
        data[varName] = true;
        this.setState(data);
    };

    changePrice = (elementId) => {
        let value = document.getElementById(elementId).value;
        let reason = document.getElementById(elementId + "Reason").value;
        console.log('changing price');
        store.dispatch({
            type: vekoActions.CHANGE_PRICE,
            payload: {value: value, reason: reason, user: this.props.user._id}
        });
        this.hideModal(elementId)
    };

    createSplit = (elementId) => {
        let factor = document.getElementById(elementId).value;
        let reason = document.getElementById(elementId + "Reason").value;
        store.dispatch({
            type: vekoActions.CREATE_SPLIT,
            payload: {factor: factor, reason: reason, user: this.props.user._id}
        });
        this.hideModal(elementId)
    };

    createROI = (elementId) => {
        let value = document.getElementById(elementId).value;
        let reason = document.getElementById(elementId + "Reason").value;
        store.dispatch({
            type: vekoActions.CREATE_ROI,
            payload: {value: value, reason: reason, user: this.props.user._id}
        });
        this.hideModal(elementId)
    };

    hideModal = (elementId) => {
        const varName = elementId + "Modal";
        const data = {};
        data[varName] = false;
        this.setState(data);
    };

    handleOk = (elementId) => {
        let reason = "";
        let veko = this.props.systemSettings;
        let value = document.getElementById(elementId).value;
        let reasonElement = document.getElementById(elementId + "Reason");
        if (reasonElement) {
            reason = reasonElement.value;
        }
        console.log(value, reason);
        if (elementId === 'spread') { // Changing split should affect buyingPrice and sellingPrice
            veko.EXCHANGE.spread = value;
        }
        else if (elementId === 'splitValue') {
            veko.SPLIT.value = value;
        }
        else if (elementId === 'splitFactor') {
            veko.SPLIT.factor = value;
        }
        if (elementId === 'incremental') {
            veko.EXCHANGE.incrementalPrice = value
        }
        if (elementId === 'volumeThreshold') {
            veko.VEKO.volumeThreshold = value
        }
        // this.setState({saving: true});
        // Update store

        store.dispatch({
            type: vekoActions.PATCH_SYSTEM_SETTINGS,
            payload: veko
        });
        console.log('Updated Veko Store:', store.getState().Veko);
        this.hideModal(elementId)
    };

    handleCancel = (elementId) => {
        const varName = elementId + "Modal";
        const data = {};
        data[varName] = false;
        this.setState(data);
    };

    transactionColumns = [
        {
            title: 'User ID',
            dataIndex: 'user',
            width: '15%',
            rowKey: 'user',
        },
        {
            title: 'Datetime',
            dataIndex: 'createdAt',
            width: '15%',
            rowKey: 'createdAt',
            align: 'center',
            render: datetime => <Moment format="DD MMM YY - HH:mm">
                {datetime}
            </Moment>
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
            render: amount => <span>{amount.toFixed(3)}</span>
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

    positionsColumns = [
        {
            title: 'User ID',
            dataIndex: 'user',
            width: '15%',
            rowKey: 'user',
        },
        {
            title: 'Datetime',
            dataIndex: 'createdAt',
            width: '15%',
            rowKey: 'createdAt',
            align: 'center',
            render: datetime => <Moment format="DD MMM YY - HH:mm">
                {datetime}
            </Moment>
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            width: '10%',
            rowKey: 'quantity',
            align: 'center',
            render: amount => <span>{amount.toFixed(3)}</span>
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            width: '10%',
            rowKey: 'rate',
            // align: 'center'
            render: amount => <span>{amount.toFixed(3)}</span>
        },
        {
            title: 'Exit Price',
            dataIndex: 'exitPrice',
            width: '10%',
            rowKey: 'exitPrice',
            // align: 'center',
            render: amount => <span>{amount.toFixed(3)}</span>
        }];


    priceChangeColumns = [
        {
            title: 'Price',
            dataIndex: 'value',
            width: '10%',
            rowKey: 'value',
            align: 'center',
            render: amount => <span>{amount.toFixed(3)}</span>
        },
        {
            title: 'User ID',
            dataIndex: 'user',
            width: '10%',
            rowKey: 'user',
            // align: 'center'
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            width: '15%',
            rowKey: 'reason',
            align: 'center',
        },
        {
            title: 'Datetime',
            dataIndex: 'createdAt',
            width: '20%',
            rowKey: 'createdAt',
            align: 'left',
            render: datetime => <Moment format="DD MMM YY - HH:mm">
                {datetime}
            </Moment>
        }
    ];

    splitsColumns = [
        {
            title: 'Factor',
            dataIndex: 'factor',
            width: '10%',
            rowKey: 'factor',
            align: 'center'
        },
        {
            title: 'User ID',
            dataIndex: 'user',
            width: '20%',
            rowKey: 'user',
            // align: 'center'
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            width: '15%',
            rowKey: 'reason',
            align: 'center',
        },
        {
            title: 'Datetime',
            dataIndex: 'createdAt',
            width: '20%',
            rowKey: 'createdAt',
            align: 'left',
            render: datetime => <Moment format="DD MMM YY - HH:mm">
                {datetime}
            </Moment>
        }
    ];


    ROIsColumns = [
        {
            title: 'Value',
            dataIndex: 'value',
            width: '10%',
            rowKey: 'value',
            align: 'center'
        },
        {
            title: 'User ID',
            dataIndex: 'user',
            width: '10%',
            rowKey: 'user',
            // align: 'center'
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            width: '15%',
            rowKey: 'reason',
            align: 'center',
        },
        {
            title: 'Datetime',
            dataIndex: 'createdAt',
            width: '20%',
            rowKey: 'createdAt',
            align: 'left',
            render: datetime => <Moment format="DD MMM YY - HH:mm">
                {datetime}
            </Moment>
        }
    ];

    render() {
        const {systemSettings, trades, positions, ROIs, splits, priceChanges} = this.props;


        return (
            <LayoutWrapper>
                <Row style={rowStyle}>
                    <Col sm={12} xs={24}>
                        <Box>
                            <Row style={{marginBottom: '1em'}} type={'flex'}>
                                <Col span={10}>
                                    <span><b>Current Price:</b></span>
                                </Col>
                                <Col span={2}/>
                                <Col span={8}>
                                    <span>{systemSettings.EXCHANGE.currentPrice.toFixed(3)}</span>
                                </Col>
                            </Row>
                            <Row style={{marginBottom: '1em'}} type={'flex'}>
                                <Col span={10}>
                                    <span><b>Spread:</b></span>
                                </Col>
                                <Col span={2}/>
                                <Col span={8}>
                                    <span>{systemSettings.EXCHANGE.spread} %</span>
                                </Col>
                                <Col span={2}/>
                                <Col spna={2}><Icon onClick={() => this.showModal('spread')} type={'edit'}/> </Col>
                            </Row>
                            <Row style={{marginBottom: '1em'}} type={'flex'}>
                                <Col span={10}>
                                    <span><b>Incremental Price:</b></span>
                                </Col>
                                <Col span={2}/>
                                <Col span={8}>
                                    <span>{systemSettings.EXCHANGE.incrementalPrice}</span>
                                </Col>
                                <Col span={2}/>
                                <Col spna={2}><Icon onClick={() => this.showModal('incremental')} type={'edit'}/> </Col>
                            </Row>
                            <Row style={{marginBottom: '1em'}} type={'flex'}>
                                <Col span={10}>
                                    <span><b>Buying Price:</b></span>
                                </Col>
                                <Col span={2}/>
                                <Col span={8}>
                                    <span>{systemSettings.EXCHANGE.buyingPrice}</span>
                                </Col>
                            </Row>
                            <Row style={{}} type={'flex'}>
                                <Col span={10}>
                                    <span><b>Selling Price:</b></span>
                                </Col>
                                <Col span={2}/>
                                <Col span={8}>
                                    <span>{systemSettings.EXCHANGE.sellingPrice}</span>
                                </Col>

                            </Row>
                        </Box>
                    </Col>
                    <Col sm={12} xs={24}>
                        <Box>
                            <Row style={{marginBottom: '1em'}} type={'flex'}>
                                <Col span={10}>
                                    <span><b>Total Vekos:</b></span>
                                </Col>
                                <Col span={2}/>
                                <Col span={8}>
                                    <span>{systemSettings.VEKO.count.toFixed(3)}</span>
                                </Col>
                            </Row>
                            <Row style={{marginBottom: '1em'}} type={'flex'}>
                                <Col span={10}>
                                    <span><b>Volume Threshold:</b></span>
                                </Col>
                                <Col span={2}/>
                                <Col span={8}>
                                    <span>{systemSettings.VEKO.volumeThreshold}</span>
                                </Col>
                                <Col span={2}/>
                                <Col spna={2}>
                                </Col>
                            </Row>
                            <Row style={{marginBottom: '1em'}} type={'flex'}>
                                <Col span={10}>
                                    <span><b>Split Price:</b></span>
                                </Col>
                                <Col span={2}/>
                                <Col span={8}>
                                    <span>{systemSettings.SPLIT.value}</span>
                                </Col>
                                <Col span={2}/>
                                <Col spna={2}><Icon onClick={() => this.showModal('splitValue')} type={'edit'}/> </Col>
                            </Row>
                            <Row style={{marginBottom: '1em'}} type={'flex'}>
                                <Col span={10}>
                                    <span><b>Split Factor:</b></span>
                                </Col>
                                <Col span={2}/>
                                <Col span={8}>
                                    <span>{systemSettings.SPLIT.factor}</span>
                                </Col>
                                <Col span={2}/>
                                <Col spna={2}><Icon onClick={() => this.showModal('splitFactor')} type={'edit'}/> </Col>
                            </Row>
                            <Row style={{}} type={'flex'}>
                                <Col span={10}>
                                    <span><b>Exit (ROI):</b></span>
                                </Col>
                                <Col span={2}/>
                                <Col span={8}>
                                    <span>{systemSettings.ROI.value} %</span>
                                </Col>

                            </Row>
                        </Box>
                    </Col>
                    <Col sx={24}>

                    </Col>
                </Row>
                <Row style={{margin: '2em', width: '100%'}} type={'flex'} justify={'center'} gutter={16}>

                    <Button style={{margin: '1em'}} onClick={() => this.showModal('currentPrice')} type="primary">
                        <Icon type="plus-circle-o"/>Change Price
                    </Button>
                    <Button onClick={() => this.showModal('ROI')} style={{margin: '1em'}} type='primary'>
                        <Icon type="plus-circle-o"/>Change ROI
                    </Button>


                </Row>
                <Row style={rowStyle}>
                    <Tabs defaultActiveKey="1" size={'large'}>
                        <TabPane tab="Positions" key="1">

                            <Table size={'small'} columns={this.positionsColumns} dataSource={positions}
                                   pagination={{pageSize: 10}} scroll={{y: 260}}
                                   rowKey={record => record._id}/>

                        </TabPane>
                        <TabPane tab="Trades" key="2">

                            <Table size={'small'} columns={this.transactionColumns}
                                   dataSource={trades}
                                   pagination={{pageSize: 10}} scroll={{y: 260}}
                                   rowKey={record => record._id}/>

                        </TabPane>
                        <TabPane tab="Price Change" key="3">

                            <Table size={'small'} columns={this.priceChangeColumns} dataSource={priceChanges}
                                   pagination={{pageSize: 10}} scroll={{y: 260}}
                                   rowKey={record => record._id}/>

                        </TabPane>
                        <TabPane tab="Splits" key="4">

                            <Table size={'small'} columns={this.splitsColumns} dataSource={splits}
                                   pagination={{pageSize: 10}} scroll={{y: 260}}
                                   rowKey={record => record._id}/>

                        </TabPane>
                        <TabPane tab="ROIs" key="5">

                            <Table size={'small'} columns={this.ROIsColumns} dataSource={ROIs}
                                   pagination={{pageSize: 10}} scroll={{y: 260}}
                                   rowKey={record => record._id}/>

                        </TabPane>
                    </Tabs>
                </Row>
                <Row>
                    <Modal
                        title="Change Current Price"
                        visible={this.state.currentPriceModal}
                        onOk={() => this.changePrice('currentPrice')}
                        onCancel={() => this.handleCancel('currentPrice')}
                    >
                        Enter new value: <InputNumber id="currentPrice" min={0} step={0.01}
                                                      defaultValue={systemSettings.EXCHANGE.currentPrice.toFixed(3)}
                    />
                        <br/>
                        Write down the reason: <TextArea id="currentPriceReason" rows={3}/>
                    </Modal>
                    <Modal
                        title="Create Split"
                        visible={this.state.createSplitModal}
                        onOk={() => this.createSplit('createSplit')}
                        onCancel={() => this.handleCancel('createSplit')}
                    >
                        Enter split factor: <InputNumber id="createSplit" min={0} step={0.01}/>
                        <br/>
                        Write down the reason: <TextArea id="createSplitReason" rows={3}/>
                    </Modal>
                    <Modal
                        title="Change ROI"
                        visible={this.state.ROIModal}
                        onOk={() => this.createROI('ROI')}
                        onCancel={() => this.handleCancel('ROI')}
                    >
                        Enter new value: <InputNumber id="ROI" min={0} step={0.01} max={100}
                                                      defaultValue={systemSettings.ROI.value}/>
                        <br/>
                        Write down the reason: <TextArea id="ROIReason" rows={3}/>
                    </Modal>
                    <Modal
                        title="Change Spread"
                        visible={this.state.spreadModal}
                        onOk={() => this.handleOk('spread')}
                        onCancel={() => this.handleCancel('spread')}
                    >
                        Enter new value: <InputNumber id="spread" min={1} step={1}
                                                      defaultValue={systemSettings.EXCHANGE.spread}/>
                    </Modal>
                    <Modal
                        title="Change Incremental Factor"
                        visible={this.state.incrementalModal}
                        onOk={() => this.handleOk('incremental')}
                        onCancel={() => this.handleCancel('incremental')}
                    >
                        Enter new value: <InputNumber id="incremental" min={0} step={0.01}
                                                      defaultValue={systemSettings.EXCHANGE.incrementalPrice}/>
                    </Modal>
                    <Modal
                        title="Change volume Threshold"
                        visible={this.state.volumeThresholdModal}
                        onOk={() => this.handleOk('volumeThreshold')}
                        onCancel={() => this.handleCancel('volumeThreshold')}
                    >
                        Enter new value: <InputNumber id="volumeThreshold" min={0} step={10000}
                                                      defaultValue={systemSettings.VEKO.volumeThreshold}/>
                    </Modal>
                    <Modal
                        title="Change Split Price"
                        visible={this.state.splitValueModal}
                        onOk={() => this.handleOk('splitValue')}
                        onCancel={() => this.handleCancel('splitValue')}
                    >
                        Enter new value: <InputNumber id="splitValue" min={0} step={0.01}
                                                      defaultValue={systemSettings.SPLIT.value}/>
                    </Modal>
                    <Modal
                        title="Change Split Factor"
                        visible={this.state.splitFactorModal}
                        onOk={() => this.handleOk('splitFactor')}
                        onCancel={() => this.handleCancel('splitFactor')}
                    >
                        Enter new value: <InputNumber id="splitFactor" min={0} step={0.01}
                                                      defaultValue={systemSettings.SPLIT.factor}/>
                    </Modal>
                </Row>

            </LayoutWrapper>
        );
    }
}

function mapStateToProps(state) {
    return {
        ...state.Veko.toJS(),
        user: state.Auth.profile
    };
}

export default connect(mapStateToProps, vekoActions)(AdminSettings);
