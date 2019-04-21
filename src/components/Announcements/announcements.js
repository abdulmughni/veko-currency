import React, {Component} from 'react';
import {Row, Col, Collapse, Icon, Spin, Button, Modal, Input} from 'antd';
import {Client} from '../../settings'
import {connect} from 'react-redux';
import {notification} from '../index'
import Moment from 'react-moment'

const TextArea = Input.TextArea;
const Panel = Collapse.Panel;
const AnnouncementsService = Client.service('announcements');

export class Announcements extends Component {
    state = {
        visible: false,
        total: 0,
        skip: 0,
        limit: 10,
        data: [],
        announcements: [],
        loading: false,
        query: {$sort: {createdAt: -1}}
    };
    deleteAnnouncement = (id) => {
        this.setState({loading: true});
        AnnouncementsService.remove(id).then(r => {
            this.setState({announcements: this.state.announcements.filter(a => a._id !== id), loading: false});
        })
    };
    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        if (!this.state.title || this.state.title === '' || !this.state.content || this.state.content === '') {
            notification('error', 'Please set title and Content before submit');
        }
        else {
            AnnouncementsService.create({title: this.state.title, content: this.state.content}).then(res => {

                this.setState({
                    visible: false,
                    title: undefined,
                    content: undefined,
                    announcements: [res, ...this.state.announcements]
                });
            })

        }
    }


    handleCancel = (e) => {
       // console.log(e);
        this.setState({
            title: undefined,
            content: undefined,
            visible: false,
        });
    }

    componentDidMount() {
        this.setState({loading: true});
        AnnouncementsService.find({query: this.state.query})
            .then(res => {
               // console.log(res);
                this.setState({
                    loading: false,
                    announcements: res.data,
                    total: res.total,
                    skip: res.skip
                })
            })


    }


    render() {
        const pannels = this.state.announcements.map(announcement =>
            (<Panel showArrow={true} header={(
                <Row type='flex' justify='space-between'>
                    <Col><h4>{announcement.title}</h4></Col>
                    <Col>
                        <Row
                            type='flex' gutter={6}>
                            <Col>
                                <Moment
                                    format="DD MMM YY - HH:mm">{announcement.createdAt}
                                </Moment>
                            </Col>
                            {
                                this.props.profile.role === 'admin'
                                &&
                                <Col><Icon
                                    onClick={e => this.deleteAnnouncement(announcement._id)}
                                    type="delete"/></Col>
                            }
                        </Row></Col></Row>)} key={announcement._id}>
                <p style={{paddingLeft: 24}}>{announcement.content}</p>
            </Panel>)
        );
        return (
            <Row>
                {
                    this.props.profile.role === 'admin'
                    &&
                    <Row type={'flex'} justify={'end'} style={{marginBottom: '20px'}}>
                        <Col><Button type={'primary'} onClick={this.showModal}>New Announcement</Button></Col>
                    </Row>
                }

                <Modal
                    title="New Announcement"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                >
                    <Row style={{marginBottom: '10px'}}><Input onChange={e => this.setState({title: e.target.value})}
                                                               placeholder={'Title'}/></Row>
                    <Row><TextArea onChange={e => this.setState({content: e.target.value})} rows={4}/></Row>
                </Modal>
                <Row>
                    <Spin tip="Loading..." spinning={this.state.loading}>
                        <Collapse bordered={false}>
                            {pannels}
                        </Collapse>

                    </Spin>
                </Row>

            </Row>
        )
    }
}


export default connect(
    state => ({
        profile: state.Auth.profile
    })
)(Announcements)
