import React, {Component} from 'react';
import Box from '../../../components/utility/box';
import {Table, Input, Pagination, Row, Col, Select, Badge, DatePicker} from 'antd';
import transactionsActions from '../../../redux/transactions/actions';
import {connect} from 'react-redux';
import Moment from 'react-moment';
import IntlMessages from '../../../components/utility/intlMessages';

const Search = Input.Search;
const {Option, OptGroup} = Select;
const {findTransaction} = transactionsActions;
const {RangePicker} = DatePicker;


export class Transactions extends Component {
    state = {
        query: {
            $sort: {
                createdAt: -1
            }
        }
    };

    columns() {
        let columns = [
            {
                title: <IntlMessages id="member.wallets.transactions.date"/>,
                dataIndex: 'createdAt',
                key: 'createdAt',
                render: text => <Moment format="DD MMM YY HH:mm">
                    {text}
                </Moment>
            },
            {
                title: <IntlMessages id="member.wallets.transactions.type"/>,
                dataIndex: 'type',
                key: 'type',
            }
            ,
            {
                title: <IntlMessages id="member.wallets.transactions.user"/>,
                dataIndex: 'associatedUserId',
                key: 'associatedUserId'

            },
            {
                title: <IntlMessages id="member.bonuses.sponsorship.description"/>,
                dataIndex: 'description',
                key: 'description'

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
            },
            {
                title: <IntlMessages id="wallet.balance"/>,
                dataIndex: 'amount',
                key: 'balance',
                render: (test, record) => {
                    if (record.meta && record.meta.wallet) {
                        return <span>{(record.meta.wallet.cash.balance).toFixed(2)}</span>
                    }
                }
            }
        ]


        return columns
    }

    DebitCreditView() {
        //
        // if ()
    }

    componentDidMount() {

        /* console.log('loaded', this.state.query);
         const {mainType, type} = this.props;
         const {query} = this.state;
         if (mainType && type) {
             console.log(mainType, type)
             let q = Object.assign({}, query, {mainType: mainType, type: type});
             this.setState({query: q}, () => this.letFindTrandsction())
         } else if (mainType) {
             console.log(mainType, type)
             let q = Object.assign({}, query, {mainType: mainType});
             this.setState({query: q}, () => this.letFindTrandsction())
         } else if (type) {
             console.log(mainType, type)
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
            this.setState({query: Object.assign({}, q, {associatedUserId: {$search: val}})}, () => this.letFindTrandsction());
        } else {
            let q = this.state.query;
            delete q.$skip;
            delete q.associatedUserId;
            this.setState({query: Object.assign({}, q)}, () => this.letFindTrandsction());

        }
    };

    render() {
        const {transactions, total, user} = this.props;
        const {language} = this.props;

        return (
            <div style={{}}>
                <Box>
                    <Row type={'flex'} justify={'space-between'} gutter={10}>
                        <Col><Search
                            placeholder={language.languageId === 'chinese' ? '搜索用户' : 'Search User'}
                            onSearch={value => this.searchbyUserId(value)}
                            style={{width: 200}}

                        /></Col>
                        <Col><Select
                            allowClear={true}
                            showSearch
                            style={{width: 200}}
                            placeholder={<IntlMessages id="wallet.selectTransactionType"/>}
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <OptGroup label={<IntlMessages id='sidebar.transfer'/>}>
                                <Option value="deposit"><IntlMessages id="wallet.depositFunds"/></Option>
                                <Option value="withdraw"><IntlMessages id="wallet.withdrawFunds"/></Option>
                                <Option value="transfer"><IntlMessages id="wallet.transferFunds"/></Option>
                            </OptGroup>

                            <OptGroup label={<IntlMessages id="sidebar.trade"/>}>
                                <Option value="buy"><IntlMessages id="sidebar.buyInRecord"/></Option>
                                <Option value="sell"><IntlMessages id="sidebar.sellOutRecord"/></Option>
                            </OptGroup>
                            <OptGroup label={<IntlMessages id='sidebar.bonuses'/>}>
                                <Option value="sponsorship"><IntlMessages id="wallet.sponsorshipBonus"/></Option>
                                <Option value="leadership"><IntlMessages id="wallet.leadershipBonus"/></Option>
                                <Option value="pairing"><IntlMessages id="wallet.pairingBonus"/></Option>
                                <Option value="fastStart"><IntlMessages id="wallet.faststartBonus"/></Option>
                                <Option value="reEntry"><IntlMessages id="wallet.reentryBonus"/></Option>
                            </OptGroup>

                        </Select>
                        </Col>
                        <Col>
                            <Select
                                allowClear={true}
                                showSearch
                                style={{width: 200}}
                                placeholder={<IntlMessages id="transition.depitCredit"/>}
                                optionFilterProp="children"
                                onChange={this.handleDebCre}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="debit"><IntlMessages id="wallet.debit"/></Option>
                                <Option value="credit"><IntlMessages id="wallet.credit"/></Option>
                            </Select>
                        </Col>

                        <Col> <RangePicker style={{width: 200}} onChange={this.onRangeChange}/> </Col>

                    </Row>
                </Box>
                <Box>
                    {console.log(transactions)}
                    <Table size="small" rowKey={record => record._id} scroll={{x: 500}} columns={this.columns()}
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
    user: state.Auth.profile,
    ...state.LanguageSwitcher
}), {findTransaction})(Transactions)
