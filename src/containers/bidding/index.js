import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutBox';
import {Row, Col, Tabs} from 'antd';
import PageHeader from "../../components/utility/pageHeader";
import {connect} from 'react-redux';
import IntlMessages from '../../components/utility/intlMessages';
//import DepositForm from './depositForm';
import Report from './Report'
import Bidding from './queueList'
import {Button, Modal, message, Collapse, Icon} from 'antd'
import Batch from './batches'
import BatchForm from './BatchForm'
import {Client} from '../../settings/'

const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;

export class Deposit extends Component {
    state = {
        showForm: true,
        batchFormShow: false,
        batches: []
    };


    componentDidMount() {
        Client.service('batch').find({query: {$sort: {limit: 1}}}).then(res => {
            //console.log(res)
            this.setState({batches: res});
        })
    }

    handleOk = (vals) => {
        //console.log(vals)
        if (this.state.selectedBatch === undefined) {
            Client.service('batch').create(vals).then(result => {
                this.setState({batches: [...this.state.batches, result]});
                message.success('batch has been created')
            })
        } else {
            Client.service('batch').patch(this.state.selectedBatch._id, vals).then(result => {
                this.setState({batches: this.state.batches.map(batch => batch._id !== result._id ? batch : result)});
                message.success('batch has been updated')
            })
        }

        this.setState({batchFormShow: false, selectedBatch: undefined})
    }
    handleCancel = () => {
        this.setState({batchFormShow: false, selectedBatch: undefined})
    }
    removeBatch = (id) => {
        let batches = this.state.batches.filter(b => b._id !== id)
        this.setState({batches: batches});
    }
    onEdit = (batch) => {
        this.setState({batchFormShow: true, selectedBatch: batch})
    }

    operations = this.props.user.role === 'admin' ?
        <Button onClick={e => this.setState({batchFormShow: !this.state.batchFormShow})}>Add Batch</Button> : '';

    render() {

        const {special, user} = this.props;
        const {} = this.state;
        //const
        //console.log(cash)
        return (
            <LayoutContentWrapper>
                <PageHeader><IntlMessages id="page.biddingSystem" /></PageHeader>
                {
                    user.role === 'member'
                    &&
                    <Row type='flex' justify="center" style={{width: '100%', marginBottom: '20px'}}>
                        <Col sm={18} xs={24}>
                            <LayoutContent style={{width: '100%'}}>
                                <Row type='flex' justify="space-around" style={{width: '100%'}}>
                                    <Col><span style={{}}><IntlMessages id="bidding.broughtForwardSum"/> : </span><span
                                        style={{fontWeight: 'bold'}}>${special.balance.toFixed(2)}</span></Col>
                                    <Col>
                                        <h3><IntlMessages id="dashboard.specialWallet"/></h3>
                                    </Col>
                                    <Col><span style={{}}><IntlMessages id="wallet.availableBalance"/> : </span><span
                                        style={{fontWeight: 'bold'}}>${special.availableBalance.toFixed(2)}</span></Col>

                                </Row>
                            </LayoutContent>
                        </Col>
                    </Row>
                }


                <Row type='flex' justify="center" style={{width: '100%', marginBottom: '20px'}}>
                    <Col sm={18} xs={24}>
                        <LayoutContent style={{width: '100%'}}>
                            <Row type={'flex'} justify={'end'}>
                                {this.props.user.role === 'admin' ?
                                    <Button onClick={e => this.setState({batchFormShow: !this.state.batchFormShow})}>Add
                                        Batch</Button> : ''}
                            </Row>
                            <Batch user={user} onEdit={e => this.onEdit(e)} onRemove={e => this.removeBatch(e)}
                                   batches={this.state.batches}/>

                            {/*<Tabs defaultActiveKey="1" tabBarExtraContent={this.operations}>
                                <TabPane tab='Bidding'
                                         key="1">
                                    <Batch user={user} onRemove={e => this.removeBatch(e)}
                                           batches={this.state.batches}/>
                                </TabPane>
                                <TabPane tab={<IntlMessages id="toggle.list"/>}
                                         key="2"><Bidding></Bidding></TabPane>
                            </Tabs> */}
                        </LayoutContent>
                        <Modal
                            title={this.state.selectedBatch !== undefined ? 'Edit Batch' : 'Add Batch'}
                            visible={this.state.batchFormShow}
                            onOk={e => this.handleOk(e)}
                            onCancel={this.handleCancel}
                            destroyOnClose
                            footer={null}
                        >
                            <BatchForm batch={this.state.selectedBatch} onSubmit={e => this.handleOk(e)}
                                       onCancel={e => this.handleCancel()}/>
                        </Modal>
                    </Col>
                </Row>
            </LayoutContentWrapper>
        );
    }
}


export default connect(
    state => ({
        cash: state.Wallets.cash,
        special: state.Wallets.special,
        user: state.Auth.profile,
        access: state.Auth.accessToken
    })
)(Deposit);
