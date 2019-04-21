import React from 'react';
import {
    Form, Select, Input, InputNumber, Button,
} from 'antd';
import {app} from "../../settings";

const FormItem = Form.Item;
const Option = Select.Option;
const TextArea = Input.TextArea

class AdjustmentForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.Submit(values);
            }
        });
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

    componentDidMount() {
        const {setFieldsValue} = this.props.form
        if (this.props.user) {
            //console.log(this.props.user);
            setFieldsValue({userId: this.props.user});
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 14},
        };
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="Member Id"
                >
                    {getFieldDecorator('userId', {
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
                        ],
                        //initialValue: this.props.user,
                    })(
                        <Input placeholder='Member id'/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Wallet"
                    hasFeedback
                >
                    {getFieldDecorator('wallet', {
                        rules: [
                            {required: true, message: 'Please select Wallet!'},
                        ],
                    })(
                        <Select placeholder="Please select a Wallet">
                            <Option value="cashWallet">Cash Wallet</Option>
                            <Option value="specialWallet">Special Wallet</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Debit/Credit"
                >
                    {getFieldDecorator('type', {
                        rules: [
                            {required: true, message: 'Please select Adjustment Type!'},
                        ],
                    })(
                        <Select placeholder="Please select a Adjustment Type">
                            <Option value="credit">Credit</Option>
                            <Option value="debit">Debit</Option>
                        </Select>
                    )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label="Amount"
                >
                    {getFieldDecorator('amount', {
                        rules: [{required: true}]
                    })(
                        <InputNumber min={1}/>
                    )}

                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Description"
                >
                    {getFieldDecorator('description', {
                        rules: [
                            {required: true, message: 'Please input Description'},
                        ],
                    })(
                        <TextArea rows='4' placeholder='Description'/>
                    )}
                </FormItem>

                <FormItem
                    wrapperCol={{span: 12, offset: 6}}
                >
                    <Button onClick={e => {
                        this.props.Cancel()
                    }}>Cancel</Button> <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}

const wrapper = Form.create()(AdjustmentForm);
export default wrapper;