import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutBox';
import {Form, InputNumber, Input, Button, Checkbox, Icon, Row, Col, message, Select} from 'antd';
import PageHeader from "../../components/utility/pageHeader";
import {connect} from 'react-redux';
import {app} from "../../settings";
import IntlMessages from '../../components/utility/intlMessages';

const paymentService = app.service('payments');

const FormItem = Form.Item;
const Option = Select.Option;

const {TextArea} = Input;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const formTailLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18, offset: 6},
};


export class withdraw extends Component {
    state = {
        showForm: true,

        loading: false
    };

    payments = [100, 500, 1000, 2000, 5000, 10000];

    componentDidMount() {
    }

    handleSubmit = (e) => {
        const {resetFields} = this.props.form;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if (this.state.showForm) {
                    this.setState({showForm: false})
                } else {
                    let data = {
                        ...values,
                        type: 'withdraw',
                        mode: 'bank deposit',
                        fee: (values.amount * 0.1),
                        value: (values.amount + (values.amount * 0.1))
                    };
                    this.setState({loading: true})
                    paymentService.create(data)
                        .then(() => {
                            this.setState({loading: false})
                            message.success("Payment withdraw request has been submitted!");
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
    };

    render() {
        const {showForm,} = this.state;
        const {getFieldDecorator, setFieldsValue, getFieldValue, resetFields} = this.props.form;
        const {cash} = this.props;
        const options = this.payments.map(payment => {
            if (payment + (payment * 0.1) < cash.availableBalance) {
                return <Option value={payment}>{payment}</Option>
            }
        });
        //console.log(cash)
        return (
            <LayoutContentWrapper>
                <PageHeader><IntlMessages id="wallet.withdrawFunds"/></PageHeader>
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

                            <Form layout="horizontal" onSubmit={this.handleSubmit}>
                                <FormItem  {...formItemLayout} label={<IntlMessages id="wallet.amount"/>}>
                                    {getFieldDecorator('amount', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Amount is Required!'
                                            }]
                                    })(
                                        <Select style={showForm ? {width: '100%'} : {display: 'none'}}>
                                            {options}
                                        </Select>
                                    )}
                                    <span hidden={showForm}><b>{getFieldValue('amount')}</b></span>
                                </FormItem>

                                <FormItem {...formItemLayout} label={<IntlMessages id="wallet.fee"/>}>
                                    <span style={{fontWeight: 'bold'}}>
                                        {isNaN(getFieldValue('amount')) ? '' : `$${getFieldValue('amount') * 0.10}`}
                                    </span>
                                </FormItem>

                                <FormItem {...formItemLayout} label={<IntlMessages id="wallet.value"/>}>
                                    <span style={{fontWeight: 'bold'}}>
                                        {isNaN(getFieldValue('amount')) ? '' : `$${getFieldValue('amount') + (getFieldValue('amount') * 0.10)}`}
                                    </span>
                                </FormItem>

                                <FormItem  {...formItemLayout} label={<IntlMessages id="wallet.accountNumber"/>}>
                                    {getFieldDecorator('bank.accountNumber', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Account Number is Required!'
                                            }]
                                    })(
                                        <Input style={showForm ? {} : {display: 'none'}}/>
                                    )}
                                    <span hidden={showForm}><b>{getFieldValue('bank.accountNumber')}</b></span>

                                </FormItem>
                                <FormItem  {...formItemLayout} label={<IntlMessages id="wallet.bankName"/>}>
                                    {getFieldDecorator('bank.bankName', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Bank Name is Required!'
                                            }]
                                    })(
                                        <Input style={showForm ? {} : {display: 'none'}}/>
                                    )}
                                    <span hidden={showForm}><b>{getFieldValue('bank.bankName')}</b></span>

                                </FormItem>
                                <FormItem  {...formItemLayout} label={<IntlMessages id="wallet.swiftCode"/>}>
                                    {getFieldDecorator('bank.swiftCode', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Swift Code is Required!'
                                            }]
                                    })(
                                        <Input style={showForm ? {} : {display: 'none'}}/>
                                    )}
                                    <span hidden={showForm}><b>{getFieldValue('bank.swiftCode')}</b></span>

                                </FormItem>
                                <FormItem  {...formItemLayout} label={<IntlMessages id="wallet.country"/>}>
                                    {getFieldDecorator('bank.country', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Country is Required!'
                                            }]
                                    })(
                                        <Input style={showForm ? {} : {display: 'none'}}/>
                                    )}
                                    <span hidden={showForm}><b>{getFieldValue('bank.country')}</b></span>

                                </FormItem>
                                <FormItem {...formItemLayout} label={<IntlMessages id="wallet.note"/>}>
                                    {getFieldDecorator('note', {})(
                                        <TextArea rows={4} style={showForm ? {} : {display: 'none'}}/>
                                    )}
                                    <span hidden={showForm}><b>{getFieldValue('note')}</b></span>
                                </FormItem>
                                <FormItem {...formTailLayout}>
                                    <Button
                                        onClick={e => showForm ? resetFields() : this.setState({showForm: true})}>{showForm ?
                                        <IntlMessages id="wallet.reset"/> : 'Edit'}</Button>
                                    <Button style={{marginLeft: '10px'}} type="primary" htmlType="submit">
                                        {showForm ? <IntlMessages id="wallet.initiate"/> :
                                            <IntlMessages id="wallet.submit"/>}
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

const wrapper = Form.create()(withdraw);

export default connect(
    state => ({
        cash: state.Wallets.cash,
        user: state.Auth.profile
    })
)(wrapper);
