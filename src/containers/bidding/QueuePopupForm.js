import React, {Component} from 'react';
import { Form, Input, Button, InputNumber } from 'antd';
import IntlMessages from '../../components/utility/intlMessages';

const FormItem = Form.Item;

class AddQueueForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { cancelButton } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem {...formItemLayout} label={<IntlMessages id="bidding.from"/>}>
          {getFieldDecorator('from', {
            rules: [{ required: true, message: 'Field is required' }],
          })(
            <InputNumber min={0} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={<IntlMessages id="bidding.to"/>}>
          {getFieldDecorator('to', {
            rules: [{ required: true, message: 'Field is required' }],
          })(
            <InputNumber min={0} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={<IntlMessages id="dashboard.title"/>}>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Field is required' }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={<IntlMessages id="queue.specialValueLimit"/>}>
          {getFieldDecorator('specialValue', {
            rules: [{ required: true, message: 'Field is required' }],
          })(
            <InputNumber min={0} />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label={<IntlMessages id="queue.limit"/>}>
          {getFieldDecorator('queueLimit', {
            rules: [{ required: true, message: 'Field is required' }],
          })(
            <InputNumber min={0} />
          )}
        </FormItem>
        <FormItem>
          <Button onClick={() => cancelButton()} style={{marginRight: 10}}><IntlMessages id="member.register-member.cancel"/></Button>
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
