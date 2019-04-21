import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutBox';
import {Form, InputNumber, Input, Button, Icon, Row, Col, message} from 'antd';
import PageHeader from "../../components/utility/pageHeader";
import {connect} from 'react-redux';
import {app} from "../../settings";
import IntlMessages from '../../components/utility/intlMessages';

const paymentService = app.service('payments');

const FormItem = Form.Item;

const {TextArea} = Input;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const formTailLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18, offset: 6},
};

export class Transfer extends Component {
    state = {
        showForm: true,

        loading: false
    };

    componentDidMount() {
    }

    checkUnique = (rule, value, cb) => {
        if (value && value.length > 3) {
            app.service('authManagement').create({action: 'checkUnique', value: {_id: value}, meta: {noErrMsg: {}}})
                .then(r => cb('Member doesn\'t exist'))
                .catch(e => cb())
        } else {
            cb();
        }

    };
    handleSubmit = (e) => {
        const {resetFields} = this.props.form;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                if (this.state.showForm) {
                    this.setState({showForm: false})
                } else {
                    let data = {...values, type: 'transfer', mode: 'wallet'};
                    this.setState({loading: true})
                    paymentService.create(data)
                        .then(() => {
                            this.setState({loading: false})
                            message.success("Payment has been transferred!");
                            resetFields();
                            this.setState({showForm: true})

                        })
                        .catch(e => {
                            this.setState({loading: false})
                            message.error(e.message)
                        });
                }
            }
        });
    }

    render() {
        const {showForm} = this.state;
        const {getFieldDecorator, getFieldValue, resetFields} = this.props.form;
        const {cash} = this.props;
        //console.log(cash)
        return (
            <LayoutContentWrapper>
                <PageHeader><IntlMessages id="wallet.transferFunds"/></PageHeader>
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
                <Row type='flex' justify="center" style={{width: '100%'}}>
                    <Col sm={18} xs={24}>
                        <LayoutContent style={{width: '100%'}}>

                            <Form onSubmit={this.handleSubmit}>
                                <FormItem {...formItemLayout} label={<IntlMessages id="wallet.amount"/>}>
                                    {getFieldDecorator('amount', {
                                        initialValue: 10,
                                        rules: [
                                            {
                                                required: true
                                            }],
                                    })(
                                        <InputNumber

                                            //formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            //parser={value => value.replace(/\$\s?|(,*)/g, '')}
                                            style={showForm ? {} : {display: 'none'}} min={10}
                                            max={cash.availableBalance}/>
                                    )}
                                    <span hidden={showForm}><b> $ {getFieldValue('amount')}</b></span>
                                </FormItem>
                                <FormItem hasFeedback={showForm} {...formItemLayout} label={<IntlMessages id="wallet.member"/>}>
                                    {getFieldDecorator('associatedUserId', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Member username is required!'
                                            },
                                            {
                                                min: 4,
                                                message: 'minimum 4 characters are required'
                                            },
                                            {
                                                validator: this.checkUnique
                                            }
                                        ]
                                    })(
                                        <Input
                                            prefix={<Icon type="user"/>}
                                            style={showForm ? {} : {display: 'none'}}/>
                                    )}
                                    <span hidden={showForm}><b>{getFieldValue('associatedUserId')}</b></span>
                                </FormItem>
                                <FormItem {...formItemLayout} label={<IntlMessages id="wallet.note"/>}>
                                    {getFieldDecorator('note', {})(
                                        <TextArea rows={4} style={showForm ? {} : {display: 'none'}}/>
                                    )}
                                    <span hidden={showForm}><b>{getFieldValue('note')}</b></span>
                                </FormItem>
                                <FormItem {...formTailLayout}>
                                    <Button
                                        onClick={e => showForm ? resetFields() : this.setState({showForm: true})}>{showForm ? <IntlMessages id="wallet.reset"/> : 'Edit'}</Button>
                                    <Button style={{marginLeft: '10px'}} type="primary" htmlType="submit">
                                        {showForm ? <IntlMessages id="wallet.initiate"/> : <IntlMessages id="wallet.submit"/>}
                                    </Button>
                                </FormItem>
                            </Form>
                        </LayoutContent>
                    </Col>
                </Row>
            </LayoutContentWrapper>
        );
    }
}

const wrapper = Form.create()(Transfer);

export default connect(
    state => ({
        cash: state.Wallets.cash,
        user: state.Auth.profile
    })
)(wrapper);
