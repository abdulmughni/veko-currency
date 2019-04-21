import React, {Component} from 'react';
import { Button, Table, Badge } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ticketActions from "../../redux/help/actions";
import _ from 'lodash';

const { findTicket } = ticketActions;

class ShowTicketCategories extends Component {
  state = {
    query: {
      $limit: 100,
      $sort: {
        createdAt: -1
      }
    }
  };
  componentDidMount() {
    this.letFindTicket();
  }



  letFindTicket = () => {
    const { findTicket } = this.props;
    findTicket({
      query: {
        ...this.state.query
      }
    });
  }

  countNumberOfTickets = (value) => {
    const countNumber = this.props.tickets.filter(ticket => ticket.status === 'open' ? ticket.category === value: '');
    return countNumber.length;
  }

  columns = [{
      title: 'Category',
      dataIndex: 'category',
      key: 'category'
  }, {
      title: 'Tickets',
      dataIndex: 'tickets',
      key: 'tickets'
  }, {
      title: 'Show',
      dataIndex: 'show',
      key: 'show'
  }];

  render() {
    const dataSource = [{
        key: '1',
        category: "Bonus",
        tickets: <Badge count={this.countNumberOfTickets('bonus')} overflowCount={10000} style={{ backgroundColor: '#3F51B5' }} />,
        show: <Link to="bonus/tickets"><Button type="primary">Show</Button></Link>
    }, {
        key: '2',
        category: 'Payment',
        tickets: <Badge count={this.countNumberOfTickets('payment')} overflowCount={10000} style={{ backgroundColor: '#3F51B5' }} />,
        show: <Link to="payment/tickets"><Button type="primary">Show</Button></Link>
    }, {
        key: '3',
        category: 'Trade',
        tickets: <Badge count={this.countNumberOfTickets('trade')} overflowCount={10000} style={{ backgroundColor: '#3F51B5' }} />,
        show: <Link to="trade/tickets"><Button type="primary">Show</Button></Link>
    }, {
        key: '4',
        category: 'Sales',
        tickets: <Badge count={this.countNumberOfTickets('sales')} overflowCount={10000} style={{ backgroundColor: '#3F51B5' }} />,
        show: <Link to="sales/tickets"><Button type="primary">Show</Button></Link>
    }, {
        key: '5',
        category: 'Technical',
        tickets: <Badge count={this.countNumberOfTickets('technical')} overflowCount={10000} style={{ backgroundColor: '#3F51B5' }} />,
        show: <Link to="technical/tickets"><Button type="primary">Show</Button></Link>
    }, {
        key: '6',
        category: 'General',
        tickets: <Badge count={this.countNumberOfTickets('general')} overflowCount={10000} style={{ backgroundColor: '#3F51B5' }} />,
        show: <Link to="general/tickets"><Button type="primary">Show</Button></Link>
    }];
    return(
      <div>
        <Table style={{ marginTop: 30 }} dataSource={dataSource} columns={this.columns} scroll={{ x: 500 }} />
      </div>
    );
  }
}

export default connect(state => ({
  tickets: state.Tickets.tickets
}), { findTicket })(ShowTicketCategories);
