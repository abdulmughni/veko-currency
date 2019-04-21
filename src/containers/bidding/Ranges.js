import React, {Component} from 'react'
import {Client} from '../../settings/index'
import Bidding from '../../components/bidding/Bidding'
import {Row, Col, Button, Modal} from 'antd'
import RangeForm from './RangeForm'

export default class Ranges extends Component {
    state = {
        ranges: [],
        rangeFormVisible: false,
        range: undefined
    }

    componentWillMount() {
        const {batch, user} = this.props;
        if (user.role === 'member') {
            let batchBids
            Client.service('bidding').find({query: {batchId: batch._id}})
                .then(bids => {
                    batchBids = bids;
                })
                .catch(e => {

                });
            let finalRanges = [];
            Client.service('ranges').find({query: {batchId: batch._id, $sort: {from: 1}}})
                .then(ranges => {
                    console.log('ranges search', batchBids, ranges)
                    ranges.forEach(range => {
                        if (batchBids.length > 0) {
                            batchBids.forEach(bid => {
                                //console.log(bid)
                                //console.log(range);
                                if (range._id === bid.rangeId) {
                                    console.log(range.title);
                                    range.subscribed = true;
                                    range.subscribedAmount = bid.amount;
                                } else {
                                    console.log()
                                    range.batchSubscribed = true
                                }
                            })
                        }
                        finalRanges.push(range);
                    })

                    this.setState({ranges: finalRanges});

                })

        }
        if (user.role === 'admin') {
            Client.service('ranges').find({query: {batchId: batch._id, $sort: {from: 1}}})
                .then(res => {
                    this.setState({ranges: res});
                })
        }

    }

    handleOk = (val) => {

        this.setState({ranges: [...this.state.ranges, val], rangeFormVisible: false})

    };
    handleCancel = () => {
        this.setState({rangeFormVisible: false, selectedRange: undefined});
    };
    onPatch = (range) => {
        let ranges = this.state.ranges.map(e => e._id === range._id ? range : e);
        this.setState({ranges, rangeFormVisible: false, selectedRange: undefined});

    }
    findRanges = () => {
        const {batch} = this.props;

        let batchBids;
        Client.service('bidding').find({query: {batchId: batch._id}})
            .then(bids => {
                batchBids = bids;
            })
            .catch(e => {

            });
        let finalRanges = [];
        Client.service('ranges').find({query: {batchId: batch._id, $sort: {from: 1}}})
            .then(ranges => {

                ranges.forEach(range => {
                    if (batchBids > 0) {
                        batchBids.forEach(bid => {
                            if (range._id === bid.rangeId) {
                                range.subscribed = true;
                                range.subscribedAmount = bid.amount;
                            } else {
                                range.batchSubscribed = true
                            }
                        })
                    }
                    finalRanges.push(range);
                })

                this.setState({ranges: finalRanges});

            })
    };
    onRemove = (id) => {
        Client.service('ranges').remove(id)
            .then(e => {
                this.setState({ranges: this.state.ranges.filter(e => e._id !== id)});
            })
    }
    EditRange = (range) => {
        this.setState({selectedRange: range, rangeFormVisible: true})
    }

    render() {

        const {ranges} = this.state;
        const {batch} = this.props;
        const Ranges = ranges.length > 0 ? ranges.map(range => <Bidding onRemove={e => this.onRemove(range._id)}
                                                                        onEdit={e => this.EditRange(range)}
                                                                        onSubscribed={e => this.findRanges()}
                                                                        batch={batch} key={range._id} range={range}>

            </Bidding>
        ) : <li> No Range is available in this Batch </li>;

        return (
            <div>
                {
                    this.props.user.role === 'admin'
                    &&
                    <Row type={'flex'} justify={'end'} style={{marginBottom: 20}}>
                        <Button onClick={e => this.setState({rangeFormVisible: true})}>Add new Range</Button>
                    </Row>

                }

                <Row>
                    <ul> {Ranges} </ul>
                </Row>
                <Modal
                    title={this.state.selectedRange ? 'Update Range' : 'Add new Range'}
                    visible={this.state.rangeFormVisible}
                    onOk={e => this.handleOk(e)}
                    onCancel={e => this.handleCancel()}
                    destroyOnClose
                    footer={null}
                >
                    <RangeForm batch={batch} range={this.state.selectedRange} onPatch={e => this.onPatch(e)}
                               onSubmit={e => this.handleOk(e)} onCancel={e => this.handleCancel()}/>
                </Modal>
            </div>


        )
    }
}