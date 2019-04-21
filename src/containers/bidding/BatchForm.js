import React from 'react';
import {Form, Input, Tooltip, Icon, Switch, InputNumber, Select, Button, AutoComplete} from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class BatchForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //console.log(values)
                this.props.onSubmit(values)
                console.log('Received values of form: ', values);
            }
        });
    }

    componentDidMount() {
        const {batch} = this.props;
        const {setFieldsValue} = this.props.form;
        if (batch !== undefined) {
            setFieldsValue(batch);
        }
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {autoCompleteResult} = this.state;

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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };


        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="Batch Title"
                >
                    {getFieldDecorator('title', {
                        rules: [{
                            required: true, message: 'Please input batch Title',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Special wallet limit %"
                >
                    {getFieldDecorator('limit', {
                        rules: [{
                            required: true, message: 'Please enter special wallet limit for this batch!',
                        },],
                    })(
                        <InputNumber/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Disabled"
                >
                    {getFieldDecorator('disabled', {valuePropName: 'checked'})(
                        <Switch/>
                    )}
                </FormItem>


                <FormItem {...tailFormItemLayout}>
                    <Button onClick={e => this.props.onCancel()}
                            style={{marginRight: 10}}>Cancel</Button>
                    <Button type="primary" htmlType="submit">Submit</Button>
                </FormItem>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(BatchForm);

export default WrappedRegistrationForm
