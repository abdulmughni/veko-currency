/**
 * Created by Mughni on 7/21/2018.
 */
import React from 'react';
import {Button, Form, Input, Row, Col} from 'antd';
import IntlMessages from '../../components/utility/intlMessages';

const FormItem = Form.Item;

class SpouseForm extends React.Component {

    componentDidMount() {
        const {setFieldsValue} = this.props.form;

        setFieldsValue({
            ...this.props.user.spouse
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.Submit(values)
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
                            {getFieldDecorator('_id', {})(
                                <Input type="hidden"/>
                            )}
                            <FormItem {...formItemLayout} label={<IntlMessages id="member.register-member.name"/>}>
                                {getFieldDecorator('name', {

                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please enter name'
                                        }],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>

                        <Col lg={12} xs={24}>
                            <FormItem {...formItemLayout} label={<IntlMessages id="member.settings.passport"/>}>
                                {getFieldDecorator('passport', {

                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please IC/Passport'
                                        }],
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>

                        <Col lg={24} style={{textAlign: 'right'}}>
                            <FormItem>
                                <Button style={{ marginRight: 20 }} onClick={this.props.Cancel}>
                                    <IntlMessages id="member.register-member.cancel"/>
                                </Button>
                                <Button type="primary" htmlType="submit" onClick={this.props.Submit}>
                                    <IntlMessages id="wallet.submit"/>
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const spouseForm = Form.create()(SpouseForm);
export default spouseForm;
