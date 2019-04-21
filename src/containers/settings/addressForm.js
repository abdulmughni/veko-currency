/**
 * Created by Mughni on 7/20/2018.
 */

import React from 'react';
import {Button, Form, Input, Row, Col} from 'antd';
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector';
import IntlMessages from '../../components/utility/intlMessages';

const FormItem = Form.Item;

class FansForm extends React.Component {
    state = {
        _id: '',
        country: '',
        region: '',
        cityAddress: '',
        address: ''
    };

    componentDidMount() {
        const {setFieldsValue} = this.props.form;

        setFieldsValue({
            ...this.props.user.address
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

        const {getFieldDecorator, getFieldValue} = this.props.form;
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
                            <FormItem {...formItemLayout} label={<IntlMessages id="member.sponsored-members.country"/>}>
                                {getFieldDecorator('country', {

                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please Select Country'
                                        }],
                                })(
                                    <CountryDropdown
                                        classes={'rcrs'}
                                        style={{height: '32px', fontSize: '14px', lineHeight: '1.5'}}
                                        valueType={'short'}
                                        labelType={'full'}
                                    />
                                )}
                            </FormItem>
                        </Col>

                        <Col lg={12} xs={24}>
                            <FormItem  {...formItemLayout} label={<IntlMessages id="member.settings.region"/>}>
                                {getFieldDecorator('region', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please Select a Region!'
                                        }
                                    ]
                                })(
                                    <RegionDropdown
                                        classes={'rcrs'}
                                        country={getFieldValue('country')}
                                        style={{height: '32px', fontSize: '14px', lineHeight: '1.5', width: '100%'}}
                                        countryValueType={'short'}
                                    />
                                )}
                            </FormItem>
                        </Col>

                        <Col lg={12} xs={24}>
                            <FormItem {...formItemLayout} label={<IntlMessages id="member.settings.city"/>}>
                                {getFieldDecorator('cityAddress', {
                                    rules: [{
                                        required: true,
                                        message: 'City is required'
                                    }]
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>

                        <Col lg={12} xs={24}>
                            <FormItem {...formItemLayout} label={<IntlMessages id="member.settings.address"/>}>
                                {getFieldDecorator('address', {
                                    rules: [{
                                        required: true,
                                        message: 'Address is required'
                                    }]
                                })(
                                    <Input/>
                                )}
                            </FormItem>
                        </Col>

                        <Col lg={24} style={{textAlign: 'right'}}>
                            <FormItem>
                                <Button style={{ marginRight: 20 }} onClick={this.props.Cancel}>
                                    {<IntlMessages id="member.register-member.cancel"/>}
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    {<IntlMessages id="wallet.submit"/>}
                                </Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        );
    }
}

const addressForm = Form.create()(FansForm);
export default addressForm;