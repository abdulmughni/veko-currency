/**
 * Created by Mughni on 7/19/2018.
 */

import React from 'react';
import {Button, Form, Input, Row, Col} from 'antd';
import IntlMessages from '../../components/utility/intlMessages';

const FormItem = Form.Item;

class BankForm extends React.Component {



    componentDidMount() {
        const {setFieldsValue} = this.props.form;
        if (this.props.user.bank) {
            setFieldsValue(this.props.user.bank);
        }

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                this.props.Submit(values)
                console.log('Received values of form: ', values);
            }
        });
    };

    render() {

        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        return (
            <div style={{maxWidth: '1000px'}}>
                <Form onSubmit={this.handleSubmit}>
                    <Row gutter={0}>
                        <Col lg={12} xs={24}>
                            {getFieldDecorator('_id', {})(
                                <Input type="hidden"/>
                            )}
                            <FormItem {...formItemLayout} label={<IntlMessages id="member.settings.bankName"/>}>
                                {getFieldDecorator('name', {

                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter Bank Name'
                                        }],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>

                        <Col lg={12} xs={24}>
                            <FormItem  {...formItemLayout} label={<IntlMessages id="member.settings.bankAccountNumber"/>}>
                                {getFieldDecorator('accountNumber', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter Account Number'
                                        }
                                    ]
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>

                        <Col lg={12} xs={24}>
                            <FormItem {...formItemLayout} label={<IntlMessages id="member.settings.bankCode"/>}>
                                {getFieldDecorator('code', {
                                    rules: [{
                                        required: true,
                                        message: 'Please enter Bank Code'
                                    }]
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>

                        <Col lg={12} xs={24}>
                            <FormItem {...formItemLayout} label={<IntlMessages id="member.settings.bankAddress"/>}>
                                {getFieldDecorator('address', {
                                    rules: [{
                                        required: true,
                                        message: 'Please enter Bank Address'
                                    }]
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>

                        <Col lg={12} xs={24}>
                            <FormItem {...formItemLayout} label={<IntlMessages id="member.settings.bankCountry"/>}>
                                {getFieldDecorator('country', {
                                    rules: [{
                                        required: true,
                                        message: 'Please enter Bank Address'
                                    }]
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>

                        <Col lg={24} style={{textAlign: 'right'}}>
                            <FormItem>
                                <Button style={{ marginRight: 20 }} onClick={this.props.Cancel}>
                                    <IntlMessages id="member.register-member.cancel"/>
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    <IntlMessages id="wallet.submit"/>
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const bankForm = Form.create()(BankForm);
export default bankForm;
