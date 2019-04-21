import React, {Component} from 'react';
import {Form, Input, Button, message, Select} from 'antd';

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
        const {setFieldsValue} = this.props.form
        setFieldsValue({
            bank: this.props.user.bank
        })
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
        const {getFieldDecorator, getFieldValue, resetFields} = this.props.form;
        const {cash} = this.props;
        const options = this.payments.map(payment => {
            if (payment + (payment * 0.1) < cash.availableBalance) {
                return <Option value={payment}>{payment}</Option>
            }
        });
        //console.log(cash)
        return (
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
                                message: 'Update Account Number in Profile'
                            }]
                    })(
                        <Input style={{ display: 'none' }} />
                    )}
                    <span><b>{getFieldValue('bank.accountNumber')}</b></span>
                </FormItem>
                <FormItem  {...formItemLayout} label={<IntlMessages id="wallet.bankName"/>}>
                    {getFieldDecorator('bank.name', {
                        rules: [
                            {
                                required: true,
                                message: 'Update Bank Name in Profile'
                            }]
                    })(
                        <Input style={{ display: 'none' }} />
                    )}
                    <span><b>{getFieldValue('bank.name')}</b></span>
                </FormItem>
                <FormItem  {...formItemLayout} label={<IntlMessages id="wallet.swiftCode"/>}>
                    {getFieldDecorator('bank.code', {
                        rules: [
                            {
                                required: true,
                                message: 'Update Swift Code in Profile'
                            }]
                    })(
                        <Input style={{ display: 'none' }} />
                    )}
                    <span><b>{getFieldValue('bank.code')}</b></span>
                </FormItem>
                <FormItem  {...formItemLayout} label={<IntlMessages id="wallet.country"/>}>
                    {getFieldDecorator('bank.country', {
                        rules: [
                            {
                                required: true,
                                message: 'Update Bank Country in Profile'
                            }]
                    })(
                        <Input style={{ display: 'none' }} />
                    )}
                    <span><b>{getFieldValue('bank.country')}</b></span>
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
