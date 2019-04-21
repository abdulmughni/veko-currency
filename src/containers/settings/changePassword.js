import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutBox';
import IntlMessages from '../../components/utility/intlMessages';
import {Form, Row, Col, Input, Button, message} from 'antd'
import {Client} from "../../settings";
import {connect} from 'react-redux'
import PageHeader from "../../components/utility/pageHeader";
import {notification} from "../../components";

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const FormItem = Form.Item;
const authManagement = Client.service('authManagement');

export class changePassword extends Component {
    state = {
        confirmDirty: false,
        loading: false
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    let data = {
                        action: 'passwordChange',
                        value: {
                            user: {_id: this.props.profile._id}, // identify user, e.g. {email: 'a@a.com'}. See options.identifyUserProps.
                            oldPassword: values.oldpassword, // compares to .resetShortToken
                            password: values.password // new password
                        }
                    };
                    this.setState({loading: true});
                    authManagement.create(data).then(res => {
                        //console.log(res);
                        this.props.form.resetFields();
                        this.setState({loading: false});
                        message.success('Password has been reset successfully!');
                        //this.props.history.push('/');
                    }).catch(e => {
                        //console.log(e.message);
                        this.setState({loading: false});
                        message.error(e.message)
                    });

                    console.log('Received values of form: ', values);
                }
            }
        )
        ;
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }


    render() {
        const {getFieldDecorator} = this.props.form;

        return (
            <LayoutContentWrapper>
                <PageHeader><IntlMessages id="sidebar.resetPassword"/></PageHeader>
                <Row type='flex' justify="center" style={{width: '100%', marginBottom: '20px'}}>
                    <Col sm={18} xs={24}>
                        <LayoutContent style={{width: '100%'}}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem
                                    {...formItemLayout}
                                    label={<IntlMessages
                                        id="settings.resetpassword-current.password"/>}
                                >
                                    {getFieldDecorator('oldpassword', {
                                        rules: [, {
                                            required: true, message: 'Please input your current password!',
                                        }],
                                    })(
                                        <Input type={'password'}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label={<IntlMessages
                                        id="settings.resetpassword-confirm.password"/>}
                                >
                                    {getFieldDecorator('password', {
                                        rules: [{
                                            required: true, message: 'Please input your new password!',
                                        }, {
                                            validator: this.validateToNextPassword,
                                        }],
                                    })(
                                        <Input type="password"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label={<IntlMessages
                                        id="settings.resetpassword-confirm.password"/>}
                                >
                                    {getFieldDecorator('confirm', {
                                        rules: [{
                                            required: true, message: 'Please confirm your new password!',
                                        }, {
                                            validator: this.compareToFirstPassword,
                                        }],
                                    })(
                                        <Input type="password" onBlur={this.handleConfirmBlur}/>
                                    )}
                                </FormItem>
                                <FormItem {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit"><IntlMessages
                                        id="sidebar.resetPassword"/></Button>
                                </FormItem>
                            </Form>
                        </LayoutContent>
                    </Col>
                </Row>
            </LayoutContentWrapper>
        )
    }

}

const WrappedRegistrationForm = Form.create()(changePassword);

export default connect(state => ({
    profile: state.Auth.profile
}))(WrappedRegistrationForm)