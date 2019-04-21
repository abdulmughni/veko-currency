import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Table, Menu, Dropdown, Icon, Pagination, Row, Col, Input, Select, DatePicker} from 'antd'
import applicationsActions from '../../redux/applications/actions';
import Box from "../../components/utility/box";
import Moment from 'react-moment';
import Attachments from './attachments';
import IntlMessages from '../../components/utility/intlMessages';


const Search = Input.Search;
const Option = Select.Option
const RangePicker = DatePicker.RangePicker;
const {findApplication, patchApplication} = applicationsActions;


class Application extends Component {
    state = {
        query: {
            $sort: {
                createdAt: -1
            }
        }
    };
    getApplication = () => {
        const {findApplication} = this.props;
        findApplication({
            query: {
                ...this.state.query
            }
        })
    }

    componentWillMount() {
        ///member/transfer/deposit
        if (window.location.pathname === '/member/transfer/deposit') {
            this.setState({query: Object.assign({}, this.state.query, {type: 'deposit'})}, () => this.getApplication());
        }
        else if (window.location.pathname === '/member/transfer/withdraw') {
            this.setState({query: Object.assign({}, this.state.query, {type: 'withdraw'})}, () => this.getApplication());
        }
        else if (window.location.pathname === '/member/transfer/transfer') {
            this.setState({query: Object.assign({}, this.state.query, {type: 'transfer'})}, () => this.getApplication());
        } else {
            this.getApplication()
        }

    }


    actionMenu = (record) => {
        if (this.props.profile.role === 'member') {
            return <Menu>
                <Menu.Item key="0">
                    <a onClick={e => this.patchApplication({_id: record._id, status: 'cancelled'})}>Cancel </a>
                </Menu.Item>

            </Menu>
        } else {
            return <Menu>
                <Menu.Item key="0">
                    <a onClick={e => this.patchApplication({_id: record._id, status: 'inProgress'})}>in Progress </a>
                </Menu.Item>
                <Menu.Item key="1">
                    <a onClick={e => this.patchApplication({_id: record._id, status: 'rejected'})}>Reject </a>
                </Menu.Item>
                <Menu.Item key="2">
                    <a onClick={e => this.patchApplication({_id: record._id, status: 'cancelled'})}>Cancel </a>
                </Menu.Item>
                <Menu.Item key="3">
                    <a onClick={e => this.patchApplication({_id: record._id, status: 'approved'})}>Approve </a>
                </Menu.Item>

            </Menu>
        }
    }


    patchApplication = (data) => {
        const {patchApplication} = this.props;
        patchApplication({id: data._id, data: {status: data.status}})
    }
    onPageChange = (e, p) => {
        let q = this.state.query;
        this.setState({query: Object.assign({}, q, {$skip: 10 * (e - 1)})}, () => this.getApplication());
    };
    handleStatus = (value) => {
        let q = this.state.query;
        delete q.$skip;
        if (value !== undefined) {
            this.setState({query: Object.assign({}, q, {status: value})}, () => this.getApplication());
        } else {
            delete q.status;
            this.setState({query: Object.assign({}, q)}, () => this.getApplication());
        }
    }
    searchbyUserId = (val) => {
        if (val !== '') {
            let q = this.state.query;
            delete q.$skip;
            this.setState({query: Object.assign({}, q, {userId: {$search: val}})}, () => this.getApplication());
        } else {
            let q = this.state.query;
            delete q.$skip;
            delete q.userId;
            this.setState({query: Object.assign({}, q)}, () => this.getApplication());

        }
    };
    handleChange = (value) => {
        let q = this.state.query;
        delete q.$skip;
        if (value !== undefined) {
            this.setState({query: Object.assign({}, q, {type: value})}, () => this.getApplication());
        } else {
            delete q.type;
            this.setState({query: Object.assign({}, q)}, () => this.getApplication());
        }
    };
    onRangeChange = (date, dateString) => {
        let q = this.state.query;
        delete q.$skip;
        if (dateString[0] === "") {
            delete q.createdAt
            this.setState({query: Object.assign({}, q)}, () => this.getApplication());
        } else {
            this.setState({
                query: Object.assign({}, q, {
                    createdAt: {
                        $gt: dateString[0],
                        $lt: dateString[1]
                    }
                })
            }, () => this.getApplication());
        }

    };
    columns = () => {
        let columns = [];
        if (this.props.profile.role === 'admin') {
            return columns = [
                {
                    title: <IntlMessages id="member.wallets.transactions.date"/>,
                    dataIndex: 'createdAt',
                    key: 'createdAt',
                    render: text => <Moment format="DD MMM YY HH:mm">
                        {text}
                    </Moment>
                }, {
                    title: <IntlMessages id="member.wallets.transactions.user"/>,
                    dataIndex: 'userId',
                    key: 'user',
                }, {
                    title: <IntlMessages id="member.wallets.transactions.type"/>,
                    dataIndex: 'type',
                    key: 'type',
                },
                {
                    title: <IntlMessages id="member.wallets.transactions.amount"/>,
                    dataIndex: 'amount',
                    key: 'amount'
                },
                {
                    title: <IntlMessages id="member.transfer.deposit.paymentMode"/>,
                    dataIndex: 'mode',
                    key: 'mode'
                }
                ,
                {
                    title: <IntlMessages id="member.sponsored-members.status"/>,
                    dataIndex: 'status',
                    key: 'status'
                }, {
                    title: <IntlMessages id="member.transfer.deposit.actions"/>,
                    key: 'actions',
                    render: (text, record) => (record.status === 'pending' || record.status === 'inProgress' ? (
                        <span>
                        <Dropdown overlay={this.actionMenu(record)} trigger={['click']}>
                             <a className="ant-dropdown-link">
                                     Actions <Icon type="down"/>
                                 </a>
                         </Dropdown>
                    </span>
                    ) : '')
                }
            ];
        } else {
            if (window.location.pathname === '/member/transfer/deposit') {
                return columns = [
                    {
                        title: <IntlMessages id="member.wallets.transactions.date"/>,
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        render: text => <Moment format="DD MMM YY HH:mm">
                            {text}
                        </Moment>
                    }
                    ,
                    {
                        title: <IntlMessages id="member.transfer.deposit.paymentMode"/>,
                        dataIndex: 'mode',
                        key: 'mode'
                    },
                    {
                        title: <IntlMessages id="member.wallets.transactions.amount"/>,
                        dataIndex: 'amount',
                        key: 'amount'
                    }
                    ,
                    {
                        title: <IntlMessages id="member.sponsored-members.status"/>,
                        dataIndex: 'status',
                        key: 'status'
                    }, {
                        title: <IntlMessages id="member.transfer.deposit.actions"/>,
                        key: 'actions',
                        render: (text, record) =>

                            <span>
                                {(this.props.profile.role === 'member' && record.status === 'pending')
                                &&
                                <Dropdown overlay={this.actionMenu(record)} trigger={['click']}>
                                    <a className="ant-dropdown-link">
                                        Actions <Icon type="down"/>
                                    </a>
                                </Dropdown>
                                }
                                {
                                    (this.props.profile.role === 'admin' && (record.status === 'pending' || record.status === 'inProgress')
                                    )
                                    &&
                                    <Dropdown overlay={this.actionMenu(record)} trigger={['click']}>
                                        <a className="ant-dropdown-link">
                                            Actions <Icon type="down"/>
                                        </a>
                                    </Dropdown>

                                }

                    </span>

                    }
                ];
            }
            if (window.location.pathname === '/member/transfer/withdraw') {
                return columns = [
                    {
                        title: <IntlMessages id="member.wallets.transactions.date"/>,
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        render: text => <Moment format="DD MMM YY HH:mm">
                            {text}
                        </Moment>
                    }
                    ,
                    {
                        title: <IntlMessages id="member.transfer.deposit.paymentMode"/>,
                        dataIndex: 'mode',
                        key: 'mode'
                    },
                    {
                        title: <IntlMessages id="member.wallets.transactions.amount"/>,
                        dataIndex: 'amount',
                        key: 'amount'
                    }
                    ,
                    {
                        title: <IntlMessages id="member.sponsored-members.status"/>,
                        dataIndex: 'status',
                        key: 'status'
                    }, {
                        title: <IntlMessages id="member.transfer.deposit.actions"/>,
                        key: 'actions',
                        render: (text, record) => (record.status === 'pending' || record.status === 'inProgress' ? (
                            <span>
                        <Dropdown overlay={this.actionMenu(record)} trigger={['click']}>
                             <a className="ant-dropdown-link">
                                     Actions <Icon type="down"/>
                                 </a>
                         </Dropdown>
                    </span>
                        ) : '')
                    }
                ];
            }
            if (window.location.pathname === '/member/transfer/transfer') {
                return columns = [
                    {
                        title: <IntlMessages id="member.wallets.transactions.date"/>,
                        dataIndex: 'createdAt',
                        key: 'createdAt',
                        render: text => <Moment format="DD MMM YY HH:mm">
                            {text}
                        </Moment>
                    }
                    ,
                    {
                        title: <IntlMessages id="member.transfer.deposit.paymentMode"/>,
                        dataIndex: 'mode',
                        key: 'mode'
                    },
                    {
                        title: <IntlMessages id="member.transfer.transfer.associatedUser"/>,
                        dataIndex: 'associatedUserId',
                        key: 'associatedUserId'
                    },
                    {
                        title: <IntlMessages id="member.wallets.transactions.amount"/>,
                        dataIndex: 'amount',
                        key: 'amount'
                    }
                    ,
                    {
                        title: <IntlMessages id="member.sponsored-members.status"/>,
                        dataIndex: 'status',
                        key: 'status'
                    }, {
                        title: <IntlMessages id="member.transfer.deposit.actions"/>,
                        key: 'actions',
                        render: (text, record) => (record.status === 'pending' || record.status === 'inProgress' ? (
                            <span>
                        <Dropdown overlay={this.actionMenu(record)} trigger={['click']}>
                             <a className="ant-dropdown-link">
                                     Actions <Icon type="down"/>
                                 </a>
                         </Dropdown>
                    </span>
                        ) : '')
                    }
                ];
            }
        }


    }

    render() {
        const {applications, total} = this.props;
        //const columns =

        return (
            <div>
                <Box>
                    <Row type={'flex'} justify={'space-between'} gutter={10}>
                        {this.props.profile.role === 'admin'
                        &&
                        <Col><Search
                            placeholder="Search User"
                            onSearch={value => this.searchbyUserId(value)}

                        /></Col>
                        }
                        {this.props.profile.role === 'admin'
                        &&

                        <Col><Select
                            allowClear={true}
                            showSearch
                            style={{width: 200}}
                            placeholder="Select Transaction Type"
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="deposit"><IntlMessages id="wallet.depositFunds"/></Option>
                            <Option value="withdraw"><IntlMessages id="wallet.withdrawFunds"/></Option>
                            <Option value="transfer"><IntlMessages id="wallet.transferFunds"/></Option>
                        </Select>
                        </Col>


                        }

                        <Col> {
                            window.location.pathname !== '/member/transfer/transfer'
                            &&
                            <Select
                                allowClear={true}
                                showSearch
                                style={{width: 282}}
                                placeholder={<IntlMessages id="member.transfer.deposit.inProgress"/>}
                                optionFilterProp="children"
                                onChange={this.handleStatus}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="pending"><IntlMessages id="member.transfer.deposit.pending"/></Option>

                                <Option value="inProgress"><IntlMessages
                                    id="member.transfer.deposit.inProgress"/></Option>
                                <Option value="approved"><IntlMessages id="member.transfer.deposit.approved"/></Option>
                                <Option value="rejected"><IntlMessages id="member.transfer.deposit.rejected"/></Option>
                                <Option value="cancelled"><IntlMessages
                                    id="member.transfer.deposit.cancelled"/></Option>

                            </Select>
                        }

                        </Col>
                        <Col> <RangePicker onChange={this.onRangeChange}/> </Col>

                    </Row>
                </Box>
                <Box>
                    <Table size="small" rowKey='_id' pagination={{position: 'none'}} scroll={{x: 600}}
                           dataSource={applications} columns={this.columns()}
                           expandedRowRender={record => {
                               if (this.props.profile.role === 'admin') {
                                   return <span>
                               <p style={{margin: 0}}><b>Description :</b> {record.description}</p>
                               <p style={{margin: 0}}> <b>Mobile #</b> {record.user.mobile}</p>
                               <p style={{margin: 0}}> <b>email #</b> {record.user.email}</p>
                               <p style={{margin: 0}}> <b>Sponsor :</b> {record.user.sponsorId}</p>
                                       {
                                           record.note
                                           &&
                                           <p style={{margin: 0}}><b>Note :</b> {record.note}</p>

                                       }
                                       {
                                           record.associatedUserId
                                           &&
                                           <p style={{margin: 0}}><b>Associated User:</b> {record.associatedUserId}</p>
                                       }
                                       {
                                           record.purpose
                                           &&
                                           <p style={{margin: 0}}><b>Purpose:</b> {record.purpose}</p>
                                       }
                                       {
                                           record.fileList.length > 0
                                           &&
                                           <Attachments fileList={record.fileList}/>
                                       }

                               </span>
                               }
                           }}
                    />
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
            applications: state.Application.applications
            ,
            profile: state.Auth.profile
            ,
            role: state.Auth.profile.role
            ,
            total: state.Application.total
        }

    ),
    {
        findApplication, patchApplication
    }
)(Application);
