import React, {Component} from 'react';
import {Form, Input, Button, Row, Col, InputNumber} from 'antd';
import LayoutContentWrapper from '../../../components/utility/layoutWrapper';
import LayoutContent from '../../../components/utility/layoutContent';
import PageHeader from "../../../components/utility/pageHeader";
import packageActions from '../../../redux/packages/actions';
import {connect} from "react-redux";

import {CountryDropdown} from 'react-country-region-selector';

const FormItem = Form.Item;

const {createPackage} = packageActions;

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        const {createPackage} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                createPackage(values);
            }
        });
    };

    render() {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
        };
        const {getFieldDecorator} = this.props.form;
        return (
            <LayoutContentWrapper style={{minHeight: '100vh'}}>
                <PageHeader>Packages - New</PageHeader>
                <LayoutContent>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <FormItem {...formItemLayout}
                                  label="Package Title">
                            {getFieldDecorator('title', {
                                rules: [{required: true, message: 'Please input Package Title!'}],
                            })(
                                <Input placeholder=""/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout}
                                  label="Package Value">
                            {getFieldDecorator('value', {
                                rules: [{required: true, message: 'Please input Package Value!'}],
                            })(
                                <InputNumber  placeholder=""/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout}
                                  label="Sponsor Bonus %">
                            {getFieldDecorator('sponsor', {
                                rules: [{required: true, message: 'Please input Sponsor Bonus!'}],
                            })(
                                <InputNumber placeholder=""/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout}
                                  label="Pairing Bonus %">
                            {getFieldDecorator('pairing', {
                                rules: [{required: true, message: 'Please input Pairing Bonus!'}],
                            })(
                                <InputNumber placeholder=""/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout}
                                  label="Fast Start Bonus %">
                            {getFieldDecorator('fast', {
                                rules: [{required: true, message: 'Please input Fast Start!'}],
                            })(
                                <InputNumber placeholder=""/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout}
                                  label="Fast Start Max Day">
                            {getFieldDecorator('fastDays', {
                                rules: [{required: true, message: 'Please input Fast Start Days!'}],
                            })(
                                <InputNumber placeholder=""/>
                            )}
                        </FormItem>


                        <FormItem {...formItemLayout}
                                  label="Leadership Bonus %">
                            {getFieldDecorator('leadership', {
                                rules: [{required: true, message: 'Please input Leadership Bonus!'}],
                            })(
                                <InputNumber placeholder=""/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout}
                                  label="Leadership level depth">
                            {getFieldDecorator('leaderlevels', {
                                rules: [{required: true, message: 'Please input Leadership depth!'}],
                            })(
                                <InputNumber placeholder=""/>
                            )}
                        </FormItem>
                        <FormItem {...formItemLayout}
                                  label="Level Pairing Maximum Cap">
                            {getFieldDecorator('levelcap', {
                                rules: [{required: true, message: 'Please input Level Cap!'}],
                            })(
                                <InputNumber placeholder=""/>
                            )}
                        </FormItem>

                        <FormItem {...formItemLayout}
                                  label="Country">
                            {getFieldDecorator('country', {
                                rules: [],
                            })(
                                <CountryDropdown
                                    classes={'rcrs'}
                                    valueType={'short'}
                                    labelType={'full'}
                                    style={{height: '32px', fontSize: '14px', lineHeight: '1.5'}}
                                    value={this.props.form.getFieldValue('country')}
                                    onChange={e => this.props.form.setFieldsValue({country: e})}
                                />
                            )}
                        </FormItem>
                        <div>
                            <Row type='flex' justify='centre'>
                                <Col offset={8} span={4}>
                                    <Row type='flex' gutter={16}>
                                        <Col span={10}><Button>Cancel</Button></Col>
                                        <Col span={10}><Button type={'primary'}
                                                               htmlType={'submit'}>Submit</Button></Col>
                                    </Row>
                                </Col>

                            </Row>
                        </div>
                    </Form>

                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}

const mainForm = Form.create()(NormalLoginForm);

export default connect(
    state => ({
        packages: state.Packages.packages,
    }),
    {createPackage}
)(mainForm);