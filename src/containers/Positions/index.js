import React, {Component} from 'react'
import {Table, Row, Col, DatePicker, Input, Select, Pagination, Icon, Popconfirm, InputNumber} from 'antd';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import IntlMessages from '../../components/utility/intlMessages';
import PageHeader from '../../components/utility/pageHeader';
import {connect} from 'react-redux'
import positionActions from '../../redux/positions/actions'
import Moment from 'react-moment';
import exchangeActions from '../../redux/veko/actions'


const {exchange} = exchangeActions;
const {findPosition} = positionActions;
const Search = Input.Search;
const Option = Select.Option;

const {RangePicker} = DatePicker;


export class Positions extends Component {
    state = {
        query: {
            status: 'open',
            $sort: {createdAt: -1}
        }
    }

    componentWillMount() {
        this.FindPosition();
    }

    Columns = [
        {
            title: <IntlMessages id="exchange.dateTime"/>,
            dataIndex: 'createdAt',
            rowKey: 'createdAt',
            align: 'center',
            render: datetime => <Moment format="DD MMM YY - HH:mm">
                {datetime}
            </Moment>
        },
        {
            title: <IntlMessages id="exchange.quantity"/>,
            dataIndex: 'quantity',
            rowKey: 'quantity',
            align: 'center',
            render: amount => <span>{
                amount.toFixed(3)
            }</span>
        },
        {
            title: <IntlMessages id="exchange.rate"/>,
            dataIndex: 'rate',
            rowKey: 'rate',
            render: rate => <span>{
                rate.toFixed(4)
            }</span>
            // align: 'center'
        },
        {
            title: <IntlMessages id="exchange.exitPrice"/>,
            dataIndex: 'exitPrice',
            rowKey: 'exitPrice',
            // align: 'center',
            render: amount => <span>{
                amount.toFixed(4)
            }</span>
        },
        {
            title: <IntlMessages id="member.sponsored-members.status"/>,
            dataIndex: 'status',
            rowKey: 'status',
            // align: 'center',
            render: status => <span>{
                status
            }</span>
        },
        {
            title: <IntlMessages id="exchange.clearPosition"/>,
            dataIndex: '_id',
            rowKey: '_id',
            align: 'center',
            render: (_id, record) => {
                if (record.status === 'open') {
                    return (<Popconfirm title="Are you sure to settle this position?" okText="Yes"
                                        cancelText="No"
                                        onConfirm={() => this.sellPosition(record)}>
                        <a><Icon type="close"/></a>
                    </Popconfirm>)
                } else {
                    (<span>''</span>)
                }
            }

        },
    ];

    sellPosition = (data) => {
        let trade = {
            type: 'sell',
            quantity: data.quantity,
            amount: data.quantity * this.props.sellingPrice,
            positionId: data._id
        };
        this.props.exchange(trade);

    };

    handleChange = (value) => {
        let q = this.state.query;
        delete q.$skip;
        if (value !== undefined) {
            this.setState({query: Object.assign({}, q, {status: value})}, () => this.FindPosition());
        } else {
            delete q.status;
            this.setState({query: Object.assign({}, q)}, () => this.FindPosition());
        }
    };
    FindPosition = () => {
        const {findPosition} = this.props;
        findPosition({query: this.state.query});
    };

    onPageChange = (e, p) => {
        const {findPosition} = this.props;
        findPosition({
            query: {
                ...this.state.query,
                $skip: 10 * (e - 1),

            }
        });
    }

    onRangeChange = (date, dateString) => {
        let q = this.state.query;
        delete q.$skip;
        if (dateString[0] === "") {
            delete q.createdAt
            this.setState({query: Object.assign({}, q)}, () => this.FindPosition());
        } else {
            this.setState({
                query: Object.assign({}, q, {
                    createdAt: {
                        $gt: dateString[0],
                        $lt: dateString[1]
                    }
                })
            }, () => this.FindPosition());
        }

    };
    searchbyUserPrice = (val) => {
        if (val !== '') {
            let q = this.state.query;
            delete q.$skip;
            this.setState({query: Object.assign({}, q, {rate: {$search: val}})}, () => this.FindPosition());
        } else {
            let q = this.state.query;
            delete q.$skip;
            delete q.rate;
            this.setState({query: Object.assign({}, q)}, () => this.FindPosition());

        }
    };

    render() {
        const {positions, total} = this.props;
        return (
            <LayoutContentWrapper style={{width: '100%'}}>
                {/*}   <PageHeader>{<IntlMessages id="exchange.positions"/>}</PageHeader> */}
                <LayoutContent style={{width: '100%'}}>
                    <Row style={{marginBottom: 30}} gutter={10} type={'flex'} justify={'space-between'}>
                        <Col style={{marginBottom: 20}}>
                            <Row>
                                <Col><RangePicker style={{width: 200}} onChange={this.onRangeChange}/></Col>

                            </Row>
                        </Col>
                        {/* <Col><Search
                            placeholder="Search Price"
                            onSearch={value => this.searchbyUserPrice(value)}
                            style={{width: 200}}

                        /></Col> */}

                        <Col><Select
                            allowClear={true}
                            showSearch
                            style={{width: 200}}
                            placeholder={<IntlMessages id="member.sponsored-members.status"/>}
                            optionFilterProp="children"
                            onChange={this.handleChange}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="open"><IntlMessages id="positions.open"/></Option>
                            <Option value="close"><IntlMessages id="positions.close"/></Option>
                        </Select></Col>
                    </Row>
                    <Row>
                        <Table size="small" rowKey={record => record._id} scroll={{x: 500}} columns={this.Columns}
                               dataSource={positions}
                               pagination={{position: 'none'}}/>
                    </Row>
                    <Row>
                        <Pagination size="small" style={{marginTop: '10px', float: 'right'}}
                                    onChange={(e, p) => this.onPageChange(e, p)}
                                    total={total}/>
                    </Row>

                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}


export default connect(state => ({
    sellingPrice: state.Veko.toJS().systemSettings.EXCHANGE.sellingPrice,
    positions: state.Position.positions,
    total: state.Position.total,
    user: state.Auth.profile
}), {findPosition, exchange})(Positions)
