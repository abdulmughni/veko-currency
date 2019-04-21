/**
 * Created by Mughni on 7/19/2018.
 */

import React from 'react';
import {Button, Form, Input, Row, Col} from 'antd';
import IntlMessages from '../../components/utility/intlMessages';

const FormItem = Form.Item;

class ProfileView extends React.Component {

    componentDidMount() {
        const {setFieldsValue} = this.props.form;
        setFieldsValue({
            firstname: this.props.user.firstname,
            lastname: this.props.user.lastname,
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.Submit(values);

            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
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
        return (
            <div style={{maxWidth: '1000px'}}>
                <Form onSubmit={this.handleSubmit}>
                    <Row gutter={0}>
                        <Col lg={12} xs={24}>
                            <FormItem
                                {...formItemLayout}
                                label={<IntlMessages id="member.settings.firstName"/>}
                            >
                                {getFieldDecorator('firstname', {
                                    rules: [{required: true, message: 'Please enter first name'}],
                                })(
                                    <Input placeholder="First Name"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col lg={12} xs={24}>
                            <FormItem
                                {...formItemLayout}
                                label={<IntlMessages id="member.settings.lastName"/>}
                            >
                                {getFieldDecorator('lastname', {
                                    rules: [{required: true, message: 'Please enter last name'}],
                                })(
                                    <Input placeholder="Last Name"/>
                                )}
                            </FormItem>
                        </Col>

                        <Col lg={24} style={{textAlign: 'right'}}>
                            <FormItem>
                                <Button style={{ marginRight: 20 }} onClick={this.props.Cancel}>
                                    <IntlMessages id="member.register-member.cancel"/>
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    <IntlMessages id="wallet.submit"/>
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        )
    }
}

const profileView = Form.create()(ProfileView);
export default profileView;
