import React, {Component} from 'react'
import {Form, Input, Button} from "antd/lib/index";
import {CountryDropdown, RegionDropdown} from 'react-country-region-selector';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const formTailLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18, offset: 6},
};

export class AddressForm extends Component {
    state = {
        showForm: true
    }

    componentDidMount() {
        const {setFieldsValue} = this.props.form;
        const {addrs} = this.props;
        if (addrs.address !== undefined) {
            let ob = {}
            ob.address = addrs.address;
            console.log(ob);
            setFieldsValue(ob);
        }
    }

    handleSubmit = (e) => {
        const {resetFields} = this.props.form;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                this.props.addressSubmit(values);
            }
        });
    }

    render() {
        const {showForm} = this.state;
        const {getFieldDecorator, getFieldValue, resetFields, setFieldsValue} = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label='Country'>
                    {getFieldDecorator('address.country', {

                        rules: [
                            {
                                required: true,
                                message: 'Please Select Country'
                            }],
                    })(
                        <CountryDropdown
                            classes={'rcrs'}
                            style={showForm ? {height: '32px', fontSize: '14px', lineHeight: '1.5'} : {display: 'none'}}
                            valueType={'short'}
                            labelType={'full'}
                            onChange={v => setFieldsValue({'address.country': v})}
                        />
                    )}
                </FormItem>
                <FormItem  {...formItemLayout} label='Region:'>
                    {getFieldDecorator('address.region', {
                        rules: [
                            {
                                required: true,
                                message: 'Please Select a Region!'
                            }
                        ]
                    })(
                        <RegionDropdown
                            classes={'rcrs'}
                            countryValueType={'short'}
                            country={getFieldValue('address.country')}
                        />
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label='City'>
                    {getFieldDecorator('address.city', {
                        rules: [{
                            required: true,
                            message: 'City is required'
                        }]
                    })(
                        <Input style={showForm ? {} : {display: 'none'}}/>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label='Address'>
                    {getFieldDecorator('address.address', {
                        rules: [{
                            required: true,
                            message: 'Address is required'
                        }]
                    })(
                        <Input style={showForm ? {} : {display: 'none'}}/>
                    )}
                </FormItem>
                <FormItem {...formTailLayout}>
                    <Button
                        onClick={e => showForm ? resetFields() : this.setState({showForm: true})}>{showForm ? "Reset" : 'Edit'}</Button>
                    <Button style={{marginLeft: '10px'}} type="primary" htmlType="submit">
                        {showForm ? 'Submit' : 'Submit'}
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const Address = Form.create()(AddressForm);

export default Address