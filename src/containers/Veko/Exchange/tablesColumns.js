import React from 'react';
import {Popconfirm, Icon} from 'antd';


export const positionsColumns = [
    {
        title: 'Datetime',
        dataIndex: 'createdAt',
        rowKey: 'createdAt',
        align: 'center',
        render: datetime => <Moment format="DD MMM YY - HH:mm">
            {datetime}
        </Moment>
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        rowKey: 'quantity',
        align: 'center',
        render: amount => <span>{amount.toFixed(3)}</span>
    },
    {
        title: 'Rate',
        dataIndex: 'rate',
        rowKey: 'rate',
        render: rate => <span>{rate.toFixed(3)}</span>
        // align: 'center'
    },
    {
        title: 'Exit Price',
        dataIndex: 'exitPrice',
        rowKey: 'exitPrice',
        // align: 'center',
        render: amount => <span>{amount.toFixed(3)}</span>
    },
    /*
    {
        title: 'ROI',
        rowKey: 'ROI',
        align: 'center',
        render: record => (((this.props.systemSettings.EXCHANGE.sellingPrice * record.quantity) - (record.rate * record.quantity)) * 100).toFixed(2)
    }, */
    {
        title: 'Clear Position',
        dataIndex: '_id',
        rowKey: '_id',
        align: 'center',
        render: (_id, record) => <Popconfirm title="Are you sure to clear this position?" okText="Yes" cancelText="No"
                                             onConfirm={() => this.sellPosition(record)}>
            <a><Icon type="close"/></a>
        </Popconfirm>

    },
];

export const tradesColumns = [
    {
        title: 'Datetime',
        dataIndex: 'createdAt',
        width: '25%',
        rowKey: 'createdAt',
        align: 'center',
        render: datetime => <span>{new Date(datetime).toDateString()}</span>
    },
    {
        title: 'Type',
        dataIndex: 'type',
        width: '15%',
        rowKey: 'type',
    },
    {
        title: 'Vekos',
        dataIndex: 'quantity',
        width: '10%',
        rowKey: 'quantity',
        render: quantity => <span>{quantity.toFixed(3)}</span>
        // align: 'center'
    },
    {
        title: 'USD',
        dataIndex: 'amount',
        width: '10%',
        rowKey: 'amount',
        // align: 'center',
        render: amount => <span>{amount.toFixed(3)}</span>
    }
];

export default {positionsColumns, tradesColumns}