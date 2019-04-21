import React, {Component} from 'react';
import {Form, InputNumber, Upload, Input, Button, Select, Icon, message} from 'antd';
import {connect} from 'react-redux';
import {app, apiUrl} from "../../settings";
import IntlMessages from '../../components/utility/intlMessages';

const paymentService = app.service('payments');

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
        showForm: true,

        loading: false
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
        const {resetFields} = this.props.form;
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
                if (this.state.showForm) {

                    this.setState({showForm: false})
                } else {

                    let data = {...values, type: 'deposit', mode: 'bank deposit'};
                    this.setState({loading: true})
                    paymentService.create(data)
                        .then(() => {
                            this.setState({loading: false})
                            message.success("Payment deposit request has been submitted!");
                            resetFields();
                            this.setState({showForm: true})

                        })
                        .catch(e => {
                          this.setState({loading: false});
                          message.error(e.message)
                        });
                }

            }
        });
    };
    handlePaymentChange = (value) => {
        switch (value) {
            case 'internet banking': {
                this.setState({PaymentPlaceholder: 'please state reference number'});
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
        const {showForm} = this.state;
        const {getFieldDecorator, getFieldValue, resetFields} = this.props.form;

        //console.log(cash)
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label={<IntlMessages id="wallet.amount"/>}>
                    {getFieldDecorator('amount', {
                        initialValue: 1,
                        rules: [
                            {
                                required: true
                            }],
                    })(
                        <InputNumber
                            min={1}
                            size={'100px'}
                            //formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            //parser={value => value.replace(/\$\s?|(,*)/g, '')}
                            style={showForm ? {} : {display: 'none'}}
                        />
                    )}
                    <span hidden={showForm}><b> $ {getFieldValue('amount')}</b></span>
                </FormItem>
                <FormItem  {...formItemLayout} label={<IntlMessages id="wallet.depositMode"/>}>
                    {getFieldDecorator('mode', {
                        rules: [
                            {
                                required: true,
                                message: 'Account Number is Required!'
                            }]
                    })(
                        <Select
                            style={showForm ? {} : {display: 'none'}}
                            showSearch
                            placeholder={<IntlMessages id="deposit.selectAPayMode"/>}
                            optionFilterProp="children"
                            onChange={this.handlePaymentChange}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="internet banking"><IntlMessages id="deposit.internetBanking"/></Option>
                            <Option value="bank deposit"><IntlMessages id="deposit.bankDeposit"/></Option>
                        </Select>
                    )}
                    <span hidden={showForm}><b>{getFieldValue('mode')}</b></span>

                </FormItem>
                <FormItem  {...formItemLayout} label={<IntlMessages id="wallet.description"/>}>
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
                    label={<IntlMessages id="wallet.receipt"/>}
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
                                <Icon type="upload"/> <IntlMessages id="wallet.clickToUpload"/>
                            </Button>
                        </Upload>
                    )}
                </FormItem>
                <FormItem {...formItemLayout} label={<IntlMessages id="wallet.note"/>}>
                    {getFieldDecorator('note', {})(
                        <TextArea rows={4} style={showForm ? {} : {display: 'none'}}/>
                    )}
                    <span hidden={showForm}><b>{getFieldValue('note')}</b></span>
                </FormItem>
                <FormItem {...formTailLayout}>
                    <Button
                        onClick={e => showForm ? resetFields() : this.setState({showForm: true})}>{showForm ?
                        <IntlMessages id="wallet.reset"/> : 'Edit'}</Button>
                    <Button style={{marginLeft: '10px'}} type="primary" htmlType="submit">
                        {showForm ? <IntlMessages id="wallet.initiate"/> :
                            <IntlMessages id="wallet.submit"/>}
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
