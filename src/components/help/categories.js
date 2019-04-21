import React, {Component} from 'react';
import { Form, Icon, Input, Button, Row, Table, message } from 'antd';
import { connect } from 'react-redux';
import ticketActions from '../../redux/help/actions';

const FormItem = Form.Item;

const {createTicketCategory} = ticketActions;

class TicketCategories extends Component {
  componentDidMount() {

  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        message.success('Category has been created!');
      }
    });
  }

  dataSource = [{
      key: '1',
      name: 'Technical Support',
      date: '1 hours ago',
      delete: <Button type="danger">Delete</Button>
  }, {
      key: '2',
      name: 'Customer Support',
      date: '3 hours ago',
      delete: <Button type="danger">Delete</Button>
  }];

  columns = [{
      title: 'Ticket Category',
      dataIndex: 'name',
      key: 'name',
  }, {
      title: 'Created Date',
      dataIndex: 'date',
      key: 'date',
  }, {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete',
  }];

  render() {
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
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          label="Ticket Category"
          {...formItemLayout}
          style={window.innerWidth < 600 ? {width: '100%'} : {width: '76%'}}>
          {getFieldDecorator('ticketCategory', {
            rules: [{ required: true, message: 'Please enter ticket cateogory' }],
          })(
            <Input prefix={<Icon type="fork" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Ticket Category" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </FormItem>
      </Form>

      <Table style={{ marginTop: 30 }} dataSource={this.dataSource} columns={this.columns} />
      </div>
    );
  }
}

const ticketCategories = Form.create()(TicketCategories);

export default connect(null, {createTicketCategory})(ticketCategories);
