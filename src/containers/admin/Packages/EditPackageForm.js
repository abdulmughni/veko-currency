/**
 * Created by Mughni on 7/17/2018.
 */
import React, {Component} from 'react';
import {Form, Input, Button, Row, Col, InputNumber} from 'antd';
import {CountryDropdown} from 'react-country-region-selector';
import "../../App/global.css";

const FormItem = Form.Item;

class EditPackageForm extends Component {

    componentDidMount() {
        const {setFieldsValue} = this.props.form;
        const {packageData} = this.props;

        setFieldsValue({
            _id: packageData._id,
            title: packageData.title,
            value: packageData.value,
            sponsor: packageData.sponsor,
            pairing: packageData.pairing,
            fast: packageData.fast,
            fastDays: packageData.fastDays,
            leadership: packageData.leadership,
            leaderlevels: packageData.leaderlevels,
            levelcap: packageData.levelcap,
        });
    };

    handleSubmit = (e) => {
        const {onPackageEditSubmit} = this.props;
        // const {editPackage} = this.props;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // editPackage(values);
                onPackageEditSubmit(values);
            }
        });
    };

    render() {
        const editFormItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 10},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 14},
            },
        };
        const {packageModalClose} = this.props;
        const {getFieldDecorator} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">

                {getFieldDecorator('_id', {})(
                    <Input type="hidden"/>
                )}
                <FormItem {...editFormItemLayout}
                          label="Package Title">
                    {getFieldDecorator('title', {
                        rules: [{required: true, message: 'Please input Package Title!'}],
                    })(
                        <Input placeholder=""/>
                    )}
                </FormItem>
                <FormItem {...editFormItemLayout}
                          label="Package Value">
                    {getFieldDecorator('value', {
                        rules: [{required: true, message: 'Please input Package Value!'}],
                    })(
                        <InputNumber placeholder=""/>
                    )}
                </FormItem>
                <FormItem {...editFormItemLayout}
                          label="Sponsor Bonus %">
                    {getFieldDecorator('sponsor', {
                        rules: [{required: true, message: 'Please input Sponsor Bonus!'}],
                    })(
                        <InputNumber placeholder=""/>
                    )}
                </FormItem>
                <FormItem {...editFormItemLayout}
                          label="Pairing Bonus %">
                    {getFieldDecorator('pairing', {
                        rules: [{required: true, message: 'Please input Pairing Bonus!'}],
                    })(
                        <InputNumber placeholder=""/>
                    )}
                </FormItem>
                <FormItem {...editFormItemLayout}
                          label="Fast Start Bonus %">
                    {getFieldDecorator('fast', {
                        rules: [{required: true, message: 'Please input Fast Start!'}],
                    })(
                        <InputNumber placeholder=""/>
                    )}
                </FormItem>
                <FormItem {...editFormItemLayout}
                          label="Fast Start Max Day">
                    {getFieldDecorator('fastDays', {
                        rules: [{required: true, message: 'Please input Fast Start Days!'}],
                    })(
                        <InputNumber placeholder=""/>
                    )}
                </FormItem>


                <FormItem {...editFormItemLayout}
                          label="Leadership Bonus %">
                    {getFieldDecorator('leadership', {
                        rules: [{required: true, message: 'Please input Leadership Bonus!'}],
                    })(
                        <InputNumber placeholder=""/>
                    )}
                </FormItem>
                <FormItem {...editFormItemLayout}
                          label="Leadership level depth">
                    {getFieldDecorator('leaderlevels', {
                        rules: [{required: true, message: 'Please input Leadership depth!'}],
                    })(
                        <InputNumber placeholder=""/>
                    )}
                </FormItem>
                <FormItem {...editFormItemLayout}
                          label="Level Pairing Maximum Cap">
                    {getFieldDecorator('levelcap', {
                        rules: [{required: true, message: 'Please input Level Cap!'}],
                    })(
                        <InputNumber placeholder=""/>
                    )}
                </FormItem>

                <FormItem {...editFormItemLayout}
                          label="Country">
                    {getFieldDecorator('country', {
                        rules: [],
                    })(
                        <CountryDropdown
                            classes={'countrySelection'}
                            valueType={'short'}
                            labelType={'full'}
                            value={this.props.form.getFieldValue('country')}
                            onChange={e => this.props.form.setFieldsValue({country: e})}
                        />
                    )}
                </FormItem>
                <div>
                    <Row type='flex' justify='centre'>
                        <Col offset={8} span={10}>
                            <Row type='flex' gutter={16}>
                                <Col lg={10} sm={12} xs={12}><Button onClick={packageModalClose()}>Cancel</Button></Col>
                                <Col lg={10} sm={12} xs={12}>
                                    <Button
                                        type={'primary'}
                                        htmlType={'submit'}
                                    >
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </Col>

                    </Row>
                </div>
            </Form>
        );
    }
}

const editPackageForm = Form.create()(EditPackageForm);

export default editPackageForm;
