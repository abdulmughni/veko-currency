import React, {Component} from 'react';
import {Form, Button} from 'antd'
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

class Payment extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        const {form} = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.props.amountSubmit(values.amount)
            }
        });

    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <FormItem {...formItemLayout} label={<IntlMessages id="member.register-member.walletBalance"/>}>
                    <span><b>$ {this.props.cash.toFixed(2)}</b></span>
                </FormItem>
                <FormItem {...formItemLayout} label={<IntlMessages id="member.wallets.transactions.amount"/>}>
                    <span><b>$ {this.props.min}</b></span>
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button onClick={e => this.props.previous()}><IntlMessages id="signUp.back"/></Button>
                    <Button style={{marginLeft: '10px'}} type={'primary'} htmlType={'submit'}> <IntlMessages id="wallet.submit"/> </Button>
                </FormItem>
            </form>
        )
    }
}

const wrapper = Form.create()(Payment);
export default wrapper
