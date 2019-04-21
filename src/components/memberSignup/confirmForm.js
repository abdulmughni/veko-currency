import React, {Component} from 'react';
import {Form, Button, Divider} from 'antd';
import IntlMessages from '../../components/utility/intlMessages';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 18,
            offset: 6,
        },
    },
};

class ConfirmForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.submitApplication()
    };

    render() {        
        return (
            <Form onSubmit={this.handleSubmit}>
                <Divider><IntlMessages id="package.memberInfromation" /></Divider>
                <FormItem
                    {...formItemLayout}
                    label={<IntlMessages id="member.register-member.username"/>}
                >

                    <span><b>{this.props.user._id}</b></span>
                </FormItem>
                <FormItem {...formItemLayout} label={<IntlMessages id="member.register-member.name"/>}>
                    <span><b>{this.props.user.firstname} {this.props.user.lastname}</b></span>
                </FormItem>
                <FormItem {...formItemLayout} label={<IntlMessages id="member.register-member.mobile#"/>}>
                    <span><b>{this.props.user.mobile}</b></span>
                </FormItem>
                <FormItem {...formItemLayout} label={<IntlMessages id="member.register-member.email"/>}>
                    <span><b>{this.props.user.email}</b></span>
                </FormItem>

                <Divider><IntlMessages id="package.packageInfromation" /></Divider>
                <FormItem {...formItemLayout} label={<IntlMessages id="member.sponsored-members.package"/>}>
                    <span><b>{this.props.packageTitle}</b></span>
                </FormItem>
                <FormItem {...formItemLayout} label={<IntlMessages id="member.wallets.transactions.amount"/>}>
                    <span><b>{this.props.amount}</b></span>
                </FormItem>
                <Divider><IntlMessages id="package.sponsorParentInfromation" /></Divider>
                <FormItem {...formItemLayout} label={<IntlMessages id="member.register-member.sponsor"/>}>
                    <span><b>{this.props.user.sponsorId}</b></span>
                </FormItem>
                <FormItem {...formItemLayout} label={<IntlMessages id="member.register-member.parent"/>}>
                    <span><b>{this.props.user.parentId}</b></span>
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button onClick={e => this.props.previous()}><IntlMessages id="signUp.back"/></Button>
                    <Button style={{marginLeft: '10px'}} type={'primary'} htmlType={'submit'}><IntlMessages id="wallet.submit"/></Button>
                </FormItem>

            </Form>
        )
    }
}

const wrapper = Form.create()(ConfirmForm);
export default wrapper;
