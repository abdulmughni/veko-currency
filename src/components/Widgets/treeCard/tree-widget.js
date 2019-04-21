import React, {Component} from 'react';
import {VCardWidgetWrapper} from './style';
import {Icon, Tooltip, Modal} from 'antd'
import MemberRegister from '../../memberSignup/memberSignup'

export default class extends Component {

    displayMessage = (e) => {
        e.preventDefault();
        this.setState({
            visible: true,
        });
        //message.info('member add option is coming soon');
        e.stopPropagation();
    };
    state = {visible: false};

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }

    render() {
        const {nodeData, style} = this.props;
        const children = {
            backgroundColor: '#42a5f6',
            color: '#fff'
        };
        return (
            <VCardWidgetWrapper className="isoVCardWidgetWrapper"
                                style={nodeData._children && nodeData._children.length > 0 ? children : style}>

                <Modal
                    title="New Membership"
                    style={{}}
                    width={'80%'}
                    footer={null}
                    visible={this.state.visible}
                    wrapClassName="vertical-center-modal"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    destroyOnClose={true}
                >
                    <MemberRegister parent={nodeData.attributes.ID} onCancel={this.handleCancel}/>
                </Modal>
                <div className="isoVCardBody">
                    <h3 className="isoName"
                        style={nodeData._children && nodeData._children.length > 0 ? {color: '#FFF'} : {}}>{nodeData.attributes.ID}</h3>
                    <span
                        className={nodeData._children && nodeData._children.length > 0 ? "isoLightTitle" : "isoDesgTitle"}>{nodeData.attributes.name}</span>
                    <span
                        className={nodeData._children && nodeData._children.length > 0 ? "isoLightTitle" : "isoDesgTitle"}>{nodeData.attributes.package}</span>
                    <span
                        className={nodeData._children && nodeData._children.length > 0 ? "isoLightTitle" : "isoDesgTitle"}>{nodeData.attributes.sponsor}</span>

                    <Tooltip title="Add new Member">
<span style={{fontSize: '17px'}}> {!nodeData._children || nodeData._children.length < 2 ?
    <Icon onClick={this.displayMessage} size='large' type="user-add"/> : ""}</span>
                    </Tooltip>
                </div>
            </VCardWidgetWrapper>
        );
    }
}
