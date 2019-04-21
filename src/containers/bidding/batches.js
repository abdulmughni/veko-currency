import React, {Component} from 'react';
import {Button, Modal, notification, Col, Row, Collapse, Icon} from 'antd';
import {Client} from '../../settings';
import Ranges from './Ranges';
import IntlMessages from '../../components/utility/intlMessages';

const Panel = Collapse.Panel;

export default class Batch extends Component {
    deleteBatch = (id) => {
        Client.service('batch').remove(id).then(res => {
            this.props.onRemove(id);
        });
    };

    render() {
        const batches = this.props.batches;
        const Batches = this.props.batches.map((batch) => <Panel
                disabled={this.props.user.role === 'admin' ? false : batch.disabled} showArrow={!batch.disabled} header={(
                <Row type='flex' justify='space-between'>
                    <Col><h3 style={{color: '#788195'}}>{batch.title}</h3></Col>
                    <Col>
                        <Row
                            type='flex' gutter={6}>
                            <Col>
                                <h4 style={{color: '#788195'}}><IntlMessages id="bidding.specialWalletLimit" /> {batch.limit} %</h4>
                            </Col>
                            {
                                this.props.user.role === 'admin'
                                &&
                                <Col><Icon style={{cursor: 'pointer'}}
                                           onClick={e => this.props.onEdit(batch)}
                                           type="edit"/></Col>
                            }
                            {
                                this.props.user.role === 'admin'
                                &&
                                <Col><Icon style={{cursor: 'pointer'}}
                                           onClick={e => this.deleteBatch(batch._id)}
                                           type="delete"/></Col>
                            }
                        </Row></Col></Row>)} key={batch._id}>

                <Row>
                    <Ranges user={this.props.user} batch={batch}/>
                </Row>

            </Panel>
        );
        const content = batches.length > 0 ? {Batches} : <Panel showArrow disabled={true} header={'No Batch is listed'}>

        </Panel>
        //console.log(Batches)
        return (
            <div>
                <Collapse bordered={false}>
                    {Batches}
                </Collapse>
            </div>

        )

    }

}
