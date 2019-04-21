/**
 * Created by Mughni on 7/19/2018.
 */
import React from 'react';
import {Button, Form, Row, Col} from 'antd';
import IntlMessages from '../../components/utility/intlMessages';

const FormItem = Form.Item;

class BankView extends React.Component {
    render() {
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
                <Row gutter={0}>
                    <Col lg={12} xs={24}>
                        <FormItem {...formItemLayout} label={<IntlMessages id="member.settings.bankName"/>}>
                            <span>{this.props.user.bank ? this.props.user.bank.name : ''}</span>
                        </FormItem>
                    </Col>

                    <Col lg={12} xs={24}>
                        <FormItem  {...formItemLayout} label={<IntlMessages id="member.settings.bankAccountNumber"/>}>
                            <span>{this.props.user.bank ? this.props.user.bank.accountNumber : ''}</span>
                        </FormItem>
                    </Col>

                    <Col lg={12} xs={24}>
                        <FormItem {...formItemLayout} label={<IntlMessages id="member.settings.bankCode"/>}>
                            <span>{this.props.user.bank ? this.props.user.bank.code : ''}</span>
                        </FormItem>
                    </Col>

                    <Col lg={12} xs={24}>
                        <FormItem {...formItemLayout} label={<IntlMessages id="member.settings.bankAddress"/>}>
                            <span>{this.props.user.bank ? this.props.user.bank.address : ''}</span>
                        </FormItem>
                    </Col>

                    <Col lg={24} style={{textAlign: 'right'}}>
                        <FormItem>
                            <Button onClick={this.props.Edit}>
                                <IntlMessages id="member.settings.edit"/>
                            </Button>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        );
    }
}

const bankView = Form.create()(BankView);
export default bankView;