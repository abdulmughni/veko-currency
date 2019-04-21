import {Row, Col, InputNumber, Button, Popconfirm, Form} from 'antd';

import debouce from 'debounce';
import React from 'react';
import IntlMessages from '../../../components/utility/intlMessages';

const FormItem = Form.Item;

export class OrderWindow extends React.Component {
    constructor(props) {
        super(props);
        this.qtyChanges = debouce(this.qtyChanges, 300);
        this.amountChanges = debouce(this.amountChanges, 300);
    }

    state = {
        amount: 0,
        qty: 0,
    };
    checkQuantity = (rule, value, cb) => {
        const {type, vekos} = this.props;
        if (type === 'sell' && value > vekos) {
            cb(`${vekos.toFixed(4)} only available in wallet`)
        }
        cb()
    };
    checkAmount = (rule, value, cb) => {
        const {type, cash} = this.props;
        if (type === 'buy' && value > cash) {
            cb(`${cash.toFixed(4)} only available in wallet`);
        }
        cb()

    };
    qtyChanges = (qty) => {
        const {setFieldsValue} = this.props.form;
        setFieldsValue({amount: qty * this.props.rate})

    };
    amountChanges = (amount) => {
        const {setFieldsValue} = this.props.form;
        setFieldsValue({quantity: amount / this.props.rate})
    };

    cancel() {

    }

    componentDidMount() {

        this.setState({
            qty: 1,
            amount: this.props.rate
        })
    }

    orderSubmit = (e) => {
        let {form} = this.props;
        form.validateFieldsAndScroll((err, values) => {
                if (!err) {
                    this.props.handleOrder(Object.assign({}, values, {type: this.props.type}));
                }

            }
        )
    };

    render() {
        const {getFieldDecorator} = this.props.form
        return (
            <div>
                <form onSubmit={this.orderSubmit}>
                    <Row type={'flex'} justify={'center'}>
                        <span style={{marginTop: '30px', marginRight: '10px'}}><IntlMessages id="dashboard.rate"/></span>
                        <h1
                            style={this.props.type === 'sell' ? {
                                color: '#f5222d',
                                fontSize: '300%'
                            } : {color: '#1890ff', fontSize: '300%'}}>{this.props.rate}</h1> <span
                        style={{marginTop: '30px', marginLeft: '10px'}}><IntlMessages id="exchange.usd" /></span>
                    </Row>
                    <Row style={{marginTop: '15px'}} type={'flex'} justify={'center'}>
                        <Col lg={4} sm={6} xs={6} style={{paddingTop: 9}}><IntlMessages id="exchange.vekos"/> :</Col>
                        <Col><FormItem>
                            {getFieldDecorator('quantity', {
                                rules: [
                                    {
                                        required: true,
                                        message: 'Quantity is required!'
                                    },
                                    {
                                        validator: this.checkQuantity,
                                    }]
                            })(
                                <InputNumber min={0}
                                    onChange={e => this.qtyChanges(e)}
                                />
                            )}

                        </FormItem>
                        </Col>
                    </Row>
                    <Row style={{marginTop: '10px'}} type={'flex'} justify={'center'}>
                        <Col lg={4} sm={6} xs={6} style={{paddingTop: 9}}><IntlMessages id="wallet.amount"/> :</Col>
                        <Col>
                            <FormItem>
                                {getFieldDecorator('amount', {
                                    rules: [{
                                        required: true,
                                        message: 'Amount is required!',

                                    }, {
                                        validator: this.checkAmount
                                    }]
                                })(
                                    <InputNumber
                                        onChange={e => this.amountChanges(e)}
                                    />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row type={'flex'} style={{marginTop: '20px', width: '100%'}} justify={'end'}>
                        <Button onClick={e => this.props.onCancelOrder()} style={{marginRight: '10px'}}><IntlMessages id="member.register-member.cancel"/></Button>
                        <Popconfirm title={`Are you sure to ${this.props.type}?`}
                                    onConfirm={this.orderSubmit} onCancel={this.cancel()} okText="Yes" cancelText="No">
                            <a><Button
                                type={this.props.type === 'sell' ? 'danger' : 'primary'}>{this.props.type === 'sell' ? <IntlMessages id="dashboard.sell"/> : <IntlMessages id="dashboard.buy"/>}</Button></a>
                        </Popconfirm>

                    </Row>
                </form>
            </div>

        )
    }


}

const Wrapper = Form.create()(OrderWindow);
export default Wrapper
