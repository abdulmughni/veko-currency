import React, { Component } from 'react';
import { Form, Icon, Input, Button, Select, Upload, message } from 'antd';
import { connect } from 'react-redux';
import {app, apiUrl} from "../../settings";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

function fileUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error("File must is equal to or smaller than 5MB!");
  }
  return isLt2M;
}

class CreateTickets extends Component {

    state = {
      disableButton: ''
    }

    fileUploadProps = {
      multiple: true,
      name: 'file',
      action: `${apiUrl}/uploads`,
      headers: {
        authorization: this.props.access,
      }
    }

    handleSubmit = (e) => {
      const {resetFields} = this.props.form;
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          if(values.message.fileList !== undefined) {
            let files = values.message.fileList;
            let finalFile = [];
            files.map(file => {
              if(file.response) {
                let f = {};
                f.name = file.name;
                f.url = file.response.url;
                f.id = file.response.id;
                finalFile.push(f);
              }
            });
            values.message.fileList = finalFile;
          }
          this.props.submit(values);
          resetFields();
        }
      });
    }

    fileUploadOnChange = (info) => {
      this.setState({ disableButton: info.file.status });
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
      if(Array.isArray(info)) {
          return info;
      }
      return info && info.fileList;
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 },
        },
      };
      return(
        <div>
          <Form onSubmit={this.handleSubmit}>
            <FormItem label={'Ticket Subject'} {...formItemLayout}>
              {getFieldDecorator('subject', {
                rules: [{ required: true, message: 'Please enter subject' }],
              })(
                <Input placeholder="Subject" />
              )}
            </FormItem>
            <FormItem label={'Select Category'} {...formItemLayout}>
              {getFieldDecorator('category', {
                rules: [{ required: true, message: 'Please enter subject' }],
              })(
                <Select placeholder="Select a category" style={{ width: '100%' }}>
                  <Option value="bonus">Bonus</Option>
                  <Option value="payment">Payment</Option>
                  <Option value="trade">Trade</Option>
                  <Option value="sales">Sales</Option>
                  <Option value="technical">Technical</Option>
                  <Option value="general">General</Option>
                </Select>
              )}
            </FormItem>

            <FormItem label={'Upload'} {...formItemLayout}>
              {getFieldDecorator('message.fileList',{

                  valuePropName: 'message.fileList',
                  getValueFromEvent: this.fileUploadOnChange,
              })(
                <Upload {...this.fileUploadProps} beforeUpload={fileUpload}>
                  <Button>
                    <Icon type="upload" /> Click to Upload
                  </Button>
                </Upload>
              )}
            </FormItem>

            <FormItem label={'Message'} {...formItemLayout}>
              {getFieldDecorator('message.content', {
                rules: [{ required: true, message: 'Please type message' }],
              })(
                <TextArea rows={7} />
              )}
            </FormItem>

            <FormItem>
              <Button type="primary" htmlType="submit" style={{ float: 'right' }} disabled={this.state.disableButton === 'uploading' ? 'disabled' : ''}>
                Create Ticket
              </Button>
            </FormItem>
          </Form>
        </div>
      );
    }
}

const createTicket = Form.create()(CreateTickets);

export default connect(state => ({
  access: state.Auth.accessToken
}))(createTicket);
