import React, {Component} from 'react';
import {Form, InputNumber, Upload, Input, Button, Select, Icon, message} from 'antd';
import {connect} from 'react-redux';
import {app, apiUrl} from "../../../settings";


const FormItem = Form.Item;
const Option = Select.Option;
const {TextArea} = Input;
const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
};
const formTailLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18, offset: 6},
};

export class Deposit extends Component {
    state = {
        showForm: true
    };

    componentDidMount() {
    }

    uploadProps = {
        name: 'file',
        action: `${apiUrl}/uploads`,
        headers: {
            Authorization: this.props.access,
        },
    };
    checkUnique = (rule, value, cb) => {
        if (value && value.length > 3) {
            app.service('authManagement').create({action: 'checkUnique', value: {_id: value}, meta: {noErrMsg: {}}})
                .then(r => cb('Member doesn\'t exist'))
                .catch(e => cb())
        } else {
            cb();
        }

    };
    fileListChange = (info) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
        if (Array.isArray(info)) {
            return info;
        }
        return info && info.fileList;
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                let files = values.fileList;
                let final = [];
                files.forEach(file => {
                    if (file.response) {
                        let f = {};
                        f.name = file.name;
                        f.id = file.response.id;
                        f.url = file.response.url
                        final.push(f);

                    }
                });
                values.fileList = final;
                let data = {...values, type: 'deposit', purpose: 'membership'};
                this.props.submitDeposit(data)

            }
        });
    };
    handlePaymentChange = (value) => {
        switch (value) {
            case 'internet banking': {
                this.setState({PaymentPlaceholder: 'please state reference number'});
                break;
            }
            case 'cash payment': {
                this.setState({
                    PaymentPlaceholder: 'please state company cash voucher number'
                });
                break;
            }
            case 'bank deposit': {
                this.setState({PaymentPlaceholder: 'please state bank reference number'});
                break;
            }
            default: {
                return
            }
        }

    };

    render() {
        const {showForm,} = this.state;
        const {getFieldDecorator, getFieldValue, resetFields} = this.props.form;
        const {user} = this.props;

        //console.log(cash)
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label='Amount:'>
                    {getFieldDecorator('amount', {
                        initialValue: this.props.min,
                        rules: [
                            {
                                required: true
                            }],
                    })(
                        <InputNumber
                            size={'100px'}
                            //formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            //parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            style={showForm ? {} : {display: 'none'}} min={this.props.min}
                        />
                    )}
                    <span hidden={showForm}><b> $ {getFieldValue('amount')}</b></span>
                </FormItem>
                {user.sponsorId === undefined
                &&
                <FormItem hasFeedback={showForm} {...formItemLayout} label='Your Sponsor'>
                    {getFieldDecorator('meta.sponsorId', {
                        rules: [
                            {
                                min: 4,
                                message: 'minimum 4 characters are required'
                            },
                            {
                                validator: this.checkUnique
                            }
                        ]
                    })(
                        <Input placeholder={'optional'}
                               prefix={<Icon type="user"/>}
                               style={showForm ? {} : {display: 'none'}}/>
                    )}
                    <span hidden={showForm}><b>{getFieldValue('meta.sponsorId')}</b></span>
                </FormItem>
                }
                <FormItem  {...formItemLayout} label='Deposit Mode'>
                    {getFieldDecorator('mode', {
                        rules: [
                            {
                                required: true,
                                message: 'Deposit Mode is Required!'
                            }]
                    })(
                        <Select
                            style={showForm ? {} : {display: 'none'}}
                            showSearch
                            placeholder="Select a payment mode"
                            optionFilterProp="children"
                            onChange={this.handlePaymentChange}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="internet banking">Internet Banking</Option>
                            <Option value="bank deposit">Bank Deposit</Option>
                        </Select>
                    )}
                    <span hidden={showForm}><b>{getFieldValue('mode')}</b></span>

                </FormItem>
                <FormItem  {...formItemLayout} label='Description'>
                    {getFieldDecorator('description', {
                        rules: [
                            {
                                required: true,
                                message: 'Description is Required!'
                            }]
                    })(
                        <TextArea placeholder={this.state.PaymentPlaceholder} rows={3}
                                  style={showForm ? {} : {display: 'none'}}/>
                    )}
                    <span hidden={showForm}><b>{getFieldValue('description')}</b></span>

                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="Receipt"
                >
                    {getFieldDecorator('fileList', {
                        rules: [{
                            required: true,
                            message: 'Deposit Receipt is required'
                        }],
                        valuePropName: 'fileList',
                        getValueFromEvent: this.fileListChange,
                    })(
                        <Upload name="logo" {...this.uploadProps} onChange={e => this.fileListChange}
                        >
                            <Button style={showForm ? {} : {display: 'none'}}>
                                <Icon type="upload"/> Click to upload
                            </Button>
                        </Upload>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label='note:'>
                    {getFieldDecorator('note', {})(
                        <TextArea rows={4} style={showForm ? {} : {display: 'none'}}/>
                    )}
                    <span hidden={showForm}><b>{getFieldValue('note')}</b></span>
                </FormItem>
                <FormItem {...formTailLayout}>
                    <Button
                        onClick={e => showForm ? resetFields() : this.setState({showForm: true})}>{showForm ? "Reset" : 'Edit'}</Button>
                    <Button style={{marginLeft: '10px'}} type="primary" htmlType="submit">
                        {showForm ? 'Submit' : 'Submit'}
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const wrapper = Form.create()(Deposit);

export default connect(
    state => ({
        cash: state.Wallets.cash,
        user: state.Auth.profile,
        access: state.Auth.accessToken
    })
)(wrapper);
