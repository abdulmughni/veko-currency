import React, {Component} from 'react';
import {Form, Icon, Input, Button, Checkbox, InputNumber, Select, message} from 'antd';
import IntlMessages from '../../components/utility/intlMessages';
import {Client} from '../../settings/index'

const Option = Select.Option;
const FormItem = Form.Item;

class AddQueueForm extends Component {
    state = {
        loading: false
    };

    componentDidMount() {
        const {range} = this.props;
        const {setFieldsValue} = this.props.form;
        if (range !== undefined) {
            setFieldsValue(range);
        }
    }

    handleSubmit = (e) => {
        const {batch, range} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({loading: true})
                if (range === undefined) {
                    values.batchId = batch._id;
                    Client.service('ranges').create(values).then(e => {
                        this.setState({loading: false});
                        message.success('New Range successfully created');
                        this.props.onSubmit(e);
                    }).catch(e => {
                        this.setState({loading: false});
                        message.error(e.message);
                    })
                } else {
                    values.batchId = range.batchId;
                    this.setState({loading: true});
                    Client.service('ranges').patch(range._id, values)
                        .then(res => {
                            this.setState({loading: false});
                            this.props.onPatch(res)
                            message.success('Range successfully updated!');

                        }).catch(e => {
                        this.setState({loading: false});
                        message.error(e.message);
                    })
                }


                //console.log('Received values of form: ', values);
            }
        });
    }

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
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label={<IntlMessages id="dashboard.title"/>}>
                    {getFieldDecorator('title', {
                        rules: [{required: true, message: 'Field is required'}],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={<IntlMessages id="bidding.from"/>}>
                    {getFieldDecorator('from', {
                        rules: [{required: true, message: 'Field is required'}],
                    })(
                        <InputNumber min={0}/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={<IntlMessages id="bidding.to"/>}>
                    {getFieldDecorator('to', {
                        rules: [{required: true, message: 'Field is required'}],
                    })(
                        <InputNumber min={0}/>
                    )}
                </FormItem>

                <FormItem {...formItemLayout} label={<IntlMessages id="queue.limit"/>}>
                    {getFieldDecorator('limit', {
                        rules: [{required: true, message: 'Field is required'}],
                    })(
                        <InputNumber min={0}/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={<IntlMessages id="uiElements.badge.status"/>}>
                    {getFieldDecorator('status', {
                        rules: [{required: true, message: 'Field is required'}],
                    })(
                        <Select defaultValue="open" style={{width: 120}}>
                            <Option value="open">Open</Option>
                            <Option value="closed">closed</Option>
                        </Select>
                    )}
                </FormItem>
                <FormItem>
                    <Button onClick={() => this.props.onCancel()} style={{marginRight: 10}}><IntlMessages
                        id="member.register-member.cancel"/></Button>
                    <Button type="primary" htmlType="submit">
                        <IntlMessages id="wallet.submit"/>
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const addQueueForm = Form.create()(AddQueueForm);
export default addQueueForm;
