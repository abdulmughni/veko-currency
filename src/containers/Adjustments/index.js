import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import PageHeader from "../../components/utility/pageHeader";
import Box from '../../components/utility/box';
import {connect} from 'react-redux';
import {Table, Input, Pagination, Row, Col, Button, Select, Badge, DatePicker, Modal} from 'antd';
import Moment from 'react-moment';
import IntlMessages from '../../components/utility/intlMessages';
import adjustmentActions from "../../redux/adjustments/actions";
import AdjustmentForm from './adjustmentForm'

const Search = Input.Search;
const Option = Select.Option;
const {findAdjustment, createAdjustment} = adjustmentActions;
const {RangePicker} = DatePicker;
const columns = [
    {
        title: 'Date',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: text => <Moment format="DD MMM YY HH:mm">
            {text}
        </Moment>
    },
    {
        title: 'User',
        dataIndex: 'userId',
        key: 'userId',
    },
    {
        title: 'Wallet',
        dataIndex: 'wallet',
        key: 'wallet',
    },
    {
        title: 'amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (text, record) => {
            if (record.type === 'debit') {
                return <Badge overflowCount={100000} count={<span>$ {text.toFixed(2)}</span>}/>
            } else {
                return <Badge style={{backgroundColor: '#52c41a'}} overflowCount={100000}
                              count={<span>$ {text.toFixed(2)}</span>}/>
            }
        }
    },
    {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
    },
];

export class Adjustments extends Component {
    state = {
        query: {
            $sort: {
                createdAt: -1
            }
        },
        adjustmentFormVisible: false


    };

    componentDidMount() {
        this.letFindAdjustments();
    }

    submitAdjustment = (values) => {
        const {createAdjustment} = this.props;
        console.log(values);
        createAdjustment(values);
        this.setState({adjustmentFormVisible: false});
    };
    cancelAdjustment = () => {
        this.setState({adjustmentFormVisible: false});
    }
    letFindAdjustments = () => {
        const {findAdjustment} = this.props
        findAdjustment({
            query: {
                ...this.state.query
            }
        })
    }

    handleChange = (value) => {
        let q = this.state.query;
        delete q.$skip;
        if (value !== undefined) {
            this.setState({query: Object.assign({}, q, {wallet: value})}, () => this.letFindAdjustments());
        } else {
            delete q.wallet;
            this.setState({query: Object.assign({}, q)}, () => this.letFindAdjustments());
        }
    }
    handleDebCre = (value) => {
        let q = this.state.query;
        delete q.$skip;
        if (value !== undefined) {
            this.setState({query: Object.assign({}, q, {type: value})}, () => this.letFindAdjustments());
        } else {
            delete q.type;
            this.setState({query: Object.assign({}, q)}, () => this.letFindAdjustments());
        }
    }

    onRangeChange = (date, dateString) => {
        let q = this.state.query;
        delete q.$skip;
        if (dateString[0] === "") {
            delete q.createdAt
            this.setState({query: Object.assign({}, q)}, () => this.letFindAdjustments());
        } else {
            this.setState({
                query: Object.assign({}, q, {
                    createdAt: {
                        $gt: dateString[0],
                        $lt: dateString[1]
                    }
                })
            }, () => this.letFindAdjustments());
        }

    };


    onPageChange = (e, p) => {
        const {findAdjustments} = this.props;
        findAdjustments({
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
            this.setState({query: Object.assign({}, q, {userId: {$search: val}})}, () => this.letFindAdjustments());
        } else {
            let q = this.state.query;
            delete q.$skip;
            delete q.userId;
            this.setState({query: Object.assign({}, q)}, () => this.letFindAdjustments());

        }
    };

    render() {
        const {adjustments, total} = this.props

        return (
            <LayoutContentWrapper style={{}}>
                <PageHeader>Wallet Adjustments</PageHeader>
                <Box>
                    <Row type={'flex'} justify={'end'} style={{marginBottom: '20px'}}>
                        <Col>
                            <Button onClick={e => {
                                this.setState({adjustmentFormVisible: true})
                            }}>New Adjustment</Button>
                        </Col>
                        <Modal
                            title="New Adjustment"
                            footer={null}
                            visible={this.state.adjustmentFormVisible}
                        >
                            <AdjustmentForm Cancel={this.cancelAdjustment} Submit={this.submitAdjustment}/>
                        </Modal>
                    </Row>
                    <Row type={'flex'} justify={'space-between'} gutter={10}>
                        <Col><Search
                            placeholder="Search User"
                            onSearch={value => this.searchbyUserId(value)}
                            style={{width: 200}}

                        /></Col>
                        <Col><Select
                            allowClear={true}
                            showSearch
                            style={{width: 200}}
                            placeholder={'Wallet Type'}
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="cashWallet">Cash Wallet</Option>
                            <Option value="specialWallet">Special Wallet</Option>
                        </Select>
                        </Col>
                        <Col>
                            <Select
                                allowClear={true}
                                showSearch
                                style={{width: 200}}
                                placeholder="Debit/Credit"
                                optionFilterProp="children"
                                onChange={this.handleDebCre}
                                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            >
                                <Option value="debit"><IntlMessages id="wallet.debit"/> <span style={{ fontSize: 13 }}>+</span></Option>
                                <Option value="credit"><IntlMessages id="wallet.credit"/> <span style={{ fontSize: 20 }}>-</span></Option>
                            </Select>
                        </Col>
                        <Col> <RangePicker style={{width: 200}} onChange={this.onRangeChange}/> </Col>
                    </Row>
                </Box>
                <Box>
                    <Row>
                        <Table size="small" rowKey={record => record._id} scroll={{x: 500}} columns={columns}
                               dataSource={adjustments}
                               pagination={{position: 'none'}}/>
                        <Row>
                            <Pagination size="small" style={{marginTop: '10px', float: 'right'}}
                                        onChange={(e, p) => this.onPageChange(e, p)}
                                        total={total}/>
                        </Row>
                    </Row>
                </Box>
            </LayoutContentWrapper>
        );
    }
}

export default connect(state => ({
    adjustments: state.Adjustment.adjustments,
    total: state.Adjustment.total,
    user: state.Auth.profile
}), {findAdjustment, createAdjustment})(Adjustments)
