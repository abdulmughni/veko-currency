import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import {Table, Pagination, Input, Row, Col, message, Icon, Modal} from 'antd'
import Box from '../../components/utility/box';
import {connect} from 'react-redux';

import {Client} from '../../settings/index'
import adjustmentActions from "../../redux/adjustments/actions";
import AdjustmentForm from '../Adjustments/adjustmentForm'

const {findAdjustment, createAdjustment} = adjustmentActions;

const Search = Input.Search;

export class Summary extends Component {
    state = {
        total: 0,
        data: [],
        query: {},
        loading: false,
        adjustmentFormVisible: false,
        user: undefined,

    };
    submitAdjustment = (values) => {
        const {createAdjustment} = this.props;
        //console.log(values);
        createAdjustment(values);
        this.setState({adjustmentFormVisible: false});
    };
    cancelAdjustment = () => {
        this.setState({adjustmentFormVisible: false});
    }

    componentDidMount() {
        this.findWallets();
    }

    Columns = [
        {
            title: 'User',
            dataIndex: '_id',
            align: 'center',
            key: '_id'
        },
        {
            title: 'Cash',
            align: 'center',
            children: [
                {
                    title: 'Balance',
                    align: 'center',
                    dataIndex: 'cash.balance',
                    key: 'cash.balance',
                    render: value => {
                        if (value)
                            return value.toFixed(3);
                    }
                },
                {
                    title: 'Available',
                    align: 'center',
                    dataIndex: 'cash.availableBalance',
                    key: 'cash.availableBalance',
                    render: value => {
                        if (value)
                            return value.toFixed(3);
                    }
                }
            ]
        },
        {
            title: 'Vekos',
            align: 'center',
            children: [
                {
                    title: 'Balance',
                    align: 'center',
                    dataIndex: 'veko.balance',
                    key: 'veko.balance',
                    render: value => {
                        if (value)
                            return value.toFixed(4);
                    }
                },
                {
                    title: 'Available',
                    align: 'center',
                    dataIndex: 'veko.availableBalance',
                    key: 'veko.availableBalance',
                    render: value => {
                        if (value)
                            return value.toFixed(4);
                    }
                }
            ]
        },
        {
            title: 'Special',
            align: 'center',
            children: [
                {
                    title: 'Balance',
                    align: 'center',
                    dataIndex: 'special.balance',
                    key: 'special.balance',
                    render: value => {
                        if (value)
                            return value.toFixed(3);
                    }
                },
                {
                    title: 'Available',
                    align: 'center',
                    dataIndex: 'special.availableBalance',
                    key: 'special.availableBalance',
                    render: value => {
                        if (value)
                            return value.toFixed(3);
                    }
                }
            ]
        }, {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'wallet.edit',
            render: (value, record) => {
                return <Icon onClick={e => this.letEdit(record)} type="edit"/>
            }
        }
    ];
    letEdit = (record) => {
        this.setState({
            user: record._id,
            adjustmentFormVisible: true

        });
    }

    findWallets = () => {
        // console.log(this.state.query);
        this.setState({loading: true});
        Client.service('wallets').find({query: this.state.query})
            .then(res => {
                this.setState({total: res.total, data: res.data, loading: false})
            })
            .catch(err => {
                this.setState({loading: false});
                message.error(err.message);
            });
    };
    searchByUserId = (val) => {
        if (val !== '') {
            let q = this.state.query;
            delete q.$skip;
            this.setState({query: Object.assign({}, q, {_id: {$search: val}})}, () => this.findWallets());
        } else {
            let q = this.state.query;
            delete q.$skip;
            delete q.userId;
            this.setState({query: Object.assign({}, q)}, () => this.findWallets());

        }
    };
    onPageChange = (e, p) => {
        this.setState({query: Object.assign({}, this.state.query, {$skip: 10 * (e - 1)})}, () => this.findWallets())
    };


    render() {
        return (
            <LayoutContentWrapper style={{}}>
                <Box>
                    <Modal
                        destroyOnClose={true}
                        title="New Adjustment"
                        footer={null}
                        visible={this.state.adjustmentFormVisible}
                    >
                        <AdjustmentForm user={this.state.user} Cancel={this.cancelAdjustment}
                                        Submit={this.submitAdjustment}/>
                    </Modal>
                    <Row type={'flex'} justify={'space-between'} gutter={10}>
                        <Col><Search
                            placeholder="Search User"
                            onSearch={value => this.searchByUserId(value)}

                        /></Col>
                    </Row>
                </Box>
                <Box>
                    <Table loading={this.state.loading} pagination={{position: 'none'}} rowKey={record => record._id}
                           size={'small'} columns={this.Columns} dataSource={this.state.data} align={'center'}/>
                    <Pagination size="small" style={{marginTop: '10px', float: 'right'}}
                                onChange={(e, p) => this.onPageChange(e, p)}
                                total={this.state.total}/>
                </Box>
            </LayoutContentWrapper>
        );
    }
}

export default connect(
    state => ({
        adjustments: state.Adjustment.adjustments,
        total: state.Adjustment.total,
        user: state.Auth.profile
    }),
    {
        findAdjustment, createAdjustment
    }
)(Summary)