import React, {Component} from 'react';
import Box from '../../components/utility/box';
import {Table, Input, Pagination, Row, Col, Select, Badge, DatePicker} from 'antd';
import transactionsActions from '../../redux/transactions/actions';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import IntlMessages from '../../components/utility/intlMessages';

const Search = Input.Search;
const Option = Select.Option;
const {findTransaction} = transactionsActions;
const {RangePicker} = DatePicker;


export class DepositTransactions extends Component {
    state = {
        query: {
            $sort: {
                createdAt: -1
            },
            type: 'deposit'
        }
    };

    columns = [
        {
            title: <IntlMessages id="member.wallets.transactions.date"/>,
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: text => <Moment format="DD MMM YY HH:mm">
                {text}
            </Moment>
        },
        {
            title: <IntlMessages id="member.wallets.transactions.amount"/>,
            dataIndex: 'amount',
            key: 'amount',
            render: (text, record) => {
                if (record.subType === 'debit') {
                    return <Badge overflowCount={100000} count={<span>$ {text.toFixed(2)}</span>}/>
                } else {
                    return <Badge style={{backgroundColor: '#52c41a'}} overflowCount={100000}
                                  count={<span>$ {text.toFixed(2)}</span>}/>
                }
            }
        }, {
            title: <IntlMessages id={'member.register-member.walletBalance'}/>,
            dataIndex: 'amount',
            key: 'balance',
            render: (test, record) => {
                if (record.meta && record.meta.wallet) {
                    return <span>{(record.meta.wallet.cash.balance).toFixed(2)}</span>
                }
            }
        }
    ];

    DebitCreditView() {
        //
        // if ()
    }

    componentDidMount() {

        /*  //console.log('loaded', this.state.query);
          const {mainType, type} = this.props;
          const {query} = this.state;
          if (mainType && type) {
              //console.log(mainType, type)
              let q = Object.assign({}, query, {mainType: mainType, type: type});
              this.setState({query: q}, () => this.letFindTrandsction())
          } else if (mainType) {
              // console.log(mainType, type)
              let q = Object.assign({}, query, {mainType: mainType});
              this.setState({query: q}, () => this.letFindTrandsction())
          } else if (type) {
              // console.log(mainType, type)
              let q = Object.assign({}, query, {type: type});
              this.setState({query: q}, () => this.letFindTrandsction())
          } else {
              this.letFindTrandsction()
          } */

        this.letFindTrandsction()
    }

    letFindTrandsction = () => {
        const {findTransaction} = this.props
        findTransaction({
            query: {
                ...this.state.query
            }
        })
    }

    handleChange = (value) => {
        let q = this.state.query;
        delete q.$skip;
        if (value !== undefined) {
            this.setState({query: Object.assign({}, q, {type: value})}, () => this.letFindTrandsction());
        } else {
            delete q.type;
            this.setState({query: Object.assign({}, q)}, () => this.letFindTrandsction());
        }
    }
    handleDebCre = (value) => {
        let q = this.state.query;
        delete q.$skip;
        if (value !== undefined) {
            this.setState({query: Object.assign({}, q, {subType: value})}, () => this.letFindTrandsction());
        } else {
            delete q.subType;
            this.setState({query: Object.assign({}, q)}, () => this.letFindTrandsction());
        }
    }

    onRangeChange = (date, dateString) => {
        let q = this.state.query;
        delete q.$skip;
        if (dateString[0] === "") {
            delete q.createdAt
            this.setState({query: Object.assign({}, q)}, () => this.letFindTrandsction());
        } else {
            this.setState({
                query: Object.assign({}, q, {
                    createdAt: {
                        $gt: dateString[0],
                        $lt: dateString[1]
                    }
                })
            }, () => this.letFindTrandsction());
        }

    };


    onPageChange = (e, p) => {
        const {findTransaction} = this.props;
        findTransaction({
            query: {
                ...this.state.query,
                $skip: 10 * (e - 1),

            }
        });
    }
    searchbyUserId = (val) => {
        if (val !== '') {
            let q = this.state.query;
            delete q.$skip;
            this.setState({query: Object.assign({}, q, {userId: {$search: val}})}, () => this.letFindTrandsction());
        } else {
            let q = this.state.query;
            delete q.$skip;
            delete q.userId;
            this.setState({query: Object.assign({}, q)}, () => this.letFindTrandsction());

        }
    };

    render() {
        const {transactions, total, user} = this.props;

        return (
            <div style={{}}>
                <Box>
                    <Row type={'flex'} justify={'space-between'} gutter={10}>


                        <Col> <RangePicker style={{width: 200}} onChange={this.onRangeChange}/> </Col>

                    </Row>
                </Box>
                <Box>
                    <Table size="small" rowKey={record => record._id} scroll={{x: 500}} columns={this.columns}
                           dataSource={transactions}
                           pagination={{position: 'none'}}/>
                    <Row>
                        <Pagination size="small" style={{marginTop: '10px', float: 'right'}}
                                    onChange={(e, p) => this.onPageChange(e, p)}
                                    total={total}/>
                    </Row>

                </Box>
            </div>
        );
    }
}

export default connect(state => ({
    transactions: state.Transaction.transactions,
    total: state.Transaction.total,
    user: state.Auth.profile
}), {findTransaction})(DepositTransactions)
