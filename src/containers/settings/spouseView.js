/**
 * Created by Mughni on 7/21/2018.
 */
import React from 'react';
import {Button, Form, Row, Col} from 'antd';
import IntlMessages from '../../components/utility/intlMessages';

const FormItem = Form.Item;

class SpouseView extends React.Component {
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
                        <FormItem {...formItemLayout} label={<IntlMessages id="member.register-member.name"/>}>
                            <span>{this.props.user.spouse ? this.props.user.spouse.name : ''}</span>
                        </FormItem>
                    </Col>

                    <Col lg={12} xs={24}>
                        <FormItem {...formItemLayout} label={<IntlMessages id="member.settings.passport"/>}>
                            <span>{this.props.user.spouse ? this.props.user.spouse.passport : ''}</span>
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

const spouseView = Form.create()(SpouseView);
export default spouseView;
