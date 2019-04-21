import React, {Component} from 'react';
import {Modal, Row, Col, Button} from 'antd';


class AddQueue extends Component {
    state = {visiblePopup: false}

    showQueueModal = () => {
        this.setState({
            visiblePopup: true,
        });
    }

    handleCancelQueue = (e) => {
        console.log(e);
        this.setState({
            visiblePopup: false,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        return (
            <div>
                <Row type={'flex'} justify={'end'} gutter={16}>
                    <Col lg={24} style={{marginBottom: 20}}>
                        <Button onClick={this.showQueueModal} type={'primary'}>Add Queue</Button>
                    </Col>
                </Row>

                <Modal
                    title="Add Queue"
                    visible={this.state.visiblePopup}
                    footer={false}
                    onCancel={this.handleCancelQueue}
                >

                    <div>
                    </div>

                </Modal>
            </div>
        );
    }
}

export default AddQueue;
