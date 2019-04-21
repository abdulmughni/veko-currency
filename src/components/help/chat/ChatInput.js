import React, { Component } from 'react';
import { Form, Input, Row, Column, Button, Upload, Icon, message } from 'antd';
import { connect } from 'react-redux';
import ticketActions from "../../../redux/help/actions";
import {app, apiUrl} from "../../../settings";

const { sendMessage, findTicket } = ticketActions;

const FormItem = Form.Item;

function fileUpload(file) {
  const isLt2M = file.size / 1024 / 1024 < 4;
  if (!isLt2M) {
    message.error("File must smaller than 4MB!");
  }
  return isLt2M;
}

class ChatInput extends Component {
  state = {
    username: '',
    message: '',
    messageDate: true,
    files: [],
    disableButton: ''
  }
  componentDidMount() {
    this.getMessages();
  }

  fileUploadProps = {
    multiple: true,
    name: 'file',
    action: `${apiUrl}/uploads`,
    headers: {
      authorization: this.props.access,
    }
  }

  setTicketId = () => this.props.tickets.map(data => {
    return(
      this.props.urlId === data._id
      &&
        data.messages.map(data => {
            this.props.form.setFieldsValue({ ticketId: data.ticketId });
        })
    );
  })

  getMessages = () => this.props.tickets.map(data => {
    return(
      this.props.urlId === data._id
      &&
        data.messages.map(data => {
          this.props.onSend(data.userId, data.content, data.fileList, data.createdAt, data._id)
        })
    );
  })

  fileUploadOnChange = (info) => {
    this.setState({ disableButton: info.file.status });
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
      const filesData = {
        name: info.file.name,
        url: info.file.response.url
      }
      this.addFilesToState(filesData);

    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    if(Array.isArray(info)) {
        return info;
    }
    return info && info.fileList;
  }

  addFilesToState = (files) => {
    const messages = this.state.files;
    messages.push(files);
    this.setState({ messages });
  }

  textChangeHandler = (event) => {
    this.setTicketId();
    this.setState({
      username: this.props.user._id,
      message: event.target.value
    })

  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.fileList !== undefined) {
          let files = values.fileList;
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
          values.fileList = finalFile;
        }

        this.props.sendMessage(values);
        this.props.onSend(this.state.username, this.state.message, this.state.files, this.state.messageDate);
        this.props.form.resetFields();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
      {
        this.props.tickets.map(data => {
          return(
            data.status === 'open' && data._id === this.props.urlId
            &&
            <div key={data._id} className="chat-input">
              <Form onSubmit={this.handleSubmit}>
                <FormItem style={{ display: 'none' }}>
                    {getFieldDecorator('ticketId')(
                      <Input type={'hidden'} />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('content', {
                      rules: [{ required: true, message: 'Please Type Message' }],
                    })(
                      <Input
                        style={{ padding: 10 }}
                        onChange={this.textChangeHandler}
                        placeholder="Write a message..." />
                    )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('fileList',{

                      valuePropName: 'fileList',
                      getValueFromEvent: this.fileUploadOnChange,
                  })(
                    <Upload {...this.fileUploadProps} beforeUpload={fileUpload}>
                      <Button>
                        <Icon type="paper-clip" theme="outlined" /> Attachment
                      </Button>
                    </Upload>
                  )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" disabled={this.state.disableButton === 'uploading' ? 'disabled' : ''}>Send</Button>
                </FormItem>
              </Form>
            </div>
          )
        })
      }
      </div>
    );
  }
}

const chatInput = Form.create()(ChatInput);

export default connect(state => ({
  tickets: state.Tickets.tickets,
  user: state.Auth.profile,
  access: state.Auth.accessToken
}), { sendMessage, findTicket })(chatInput);
