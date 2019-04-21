import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import ForgotPasswordStyleWrapper from './forgotPassword.style';
import {app} from "../../settings";

import Logo from '../../image/veko128b.png'
import {Row} from 'antd';
import {notification} from '../../components'

const authManagement = app.service('authManagement');
export default class extends Component {
    state = {
      loading: false
    }
    sendResetCode = () => {
        if (this.state.id === undefined || this.state.id.length < 4 || this.state.mobile === undefined || this.state.mobile.length < 6) {
            notification('error', 'you have entered incorrect information!')
        } else {
            this.setState({loading: true})
            authManagement.create({
                action: 'sendResetPwd',
                value: {_id: this.state.id, mobile: this.state.mobile}
            })
                .then(res => {
                    this.setState({loading: false})
                    notification('success', 'reset password token has been sent to your mobile!')
                    this.props.history.push('/resetpassword')
                })
                .catch(e => {
                    this.setState({loading: false})
                    notification('error', e.message);
                })
        }

    }

    render() {
        return (
            <ForgotPasswordStyleWrapper className="isoForgotPassPage">
                <div className="isoFormContentWrapper">
                    <div className="isoFormContent">
                        <Row type={'flex'} justify={'center'}>
                            <img onClick={e => this.props.history.push('/')} src={Logo} alt="VEKO"/>
                        </Row>
                        <div className="isoLogoWrapper">
                            <IntlMessages id="SignUp.forgotPassword"/>
                        </div>

                        <div className="isoFormHeadText">
                            <h3>
                                <IntlMessages id="page.forgetPassSubTitle"/>
                            </h3>
                            <p>
                                <IntlMessages id="page.forgetPassDescription"/>
                            </p>
                        </div>

                        <div className="isoForgotPassForm">
                            <div className="isoInputWrapper">
                                <Input size="large" onChange={e => this.setState({id: e.target.value.toLowerCase()})}
                                       placeholder="Username"/>
                            </div>
                            <div className="isoInputWrapper">
                                <Input size="large" onChange={e => this.setState({mobile: e.target.value})}
                                       placeholder="Mobile"/>
                            </div>

                            <div className="isoInputWrapper">
                                <Button type="primary" onClick={e => this.sendResetCode()}>
                                    <IntlMessages id="page.sendRequest"/>
                                </Button>
                            </div>

                            <div className="isoCenterComponent isoHelperWrapper isoOtherLogin"
                                 style={{marginTop: '20px'}}>
                                <Link to="signin">
                                    <IntlMessages id="SignIn"/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </ForgotPasswordStyleWrapper>
        );
    }
}
