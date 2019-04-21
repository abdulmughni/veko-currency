/**
 * Created by Mughni on 7/20/2018.
 */

import React from 'react';
import {Button, Form, Row, Col} from 'antd';
import IntlMessages from '../../components/utility/intlMessages';

const FormItem = Form.Item;

export default class extends React.Component {
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
        const {user} = this.props
        return (
            <div style={{maxWidth: '1000px'}}>
                <Row gutter={0}>
                    <Col lg={12} xs={24}>
                        <FormItem {...formItemLayout} label={<IntlMessages id="member.sponsored-members.country"/>}>
                            <span>{user.address.country}</span>
                        </FormItem>
                    </Col>

                    <Col lg={12} xs={24}>
                        <FormItem  {...formItemLayout} label={<IntlMessages id="member.settings.region"/>}>
                            <span>{user.address.region}</span>
                        </FormItem>
                    </Col>

                    <Col lg={12} xs={24}>
                        <FormItem {...formItemLayout} label={<IntlMessages id="member.settings.city"/>}>
                            <span>{user.address.city}</span>
                        </FormItem>
                    </Col>

                    <Col lg={12} xs={24}>
                        <FormItem {...formItemLayout} label={<IntlMessages id="member.settings.address"/>}>
                            <span>{user.address.address}</span>
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