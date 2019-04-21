/**
 * Created by Mughni on 7/19/2018.
 */
import React from 'react';
import {Button, Form, Row, Col} from 'antd'
import {connect} from 'react-redux';
import IntlMessages from '../../components/utility/intlMessages';

const FormItem = Form.Item;
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

export class ProfileView extends React.Component {
    render() {
        const {profile} = this.props
        return (

            <div style={{maxWidth: '1000px'}}>
                <Row gutter={0}>
                    <Col lg={12} xs={24}>
                        <FormItem {...formItemLayout} label={<IntlMessages id="member.settings.firstName"/>}>
                            <span>{profile.firstname}</span>
                        </FormItem>
                    </Col>

                    <Col lg={12} xs={24}>
                        <FormItem {...formItemLayout} label={<IntlMessages id="member.settings.lastName"/>}>
                            <span>{profile.lastname}</span>
                        </FormItem>
                    </Col>

                    <Col lg={12} xs={24}>
                        <FormItem {...formItemLayout} label={<IntlMessages id="member.settings.mobileNumber"/>}>
                            <span>{profile.mobile}</span>
                        </FormItem>
                    </Col>

                    <Col lg={12} xs={24}>
                        <FormItem {...formItemLayout} label={<IntlMessages id="member.settings.emailAddress"/>}>
                            <span>{profile.email}</span>
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
        )
    }
}

export default connect(
    state => ({
        profile: state.Auth.profile
    })
)(ProfileView)