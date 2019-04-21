import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import ResetPasswordStyleWrapper from './resetPassword.style';
import Logo from '../../image/veko128b.png'
import {Row} from 'antd';
import {app} from "../../settings";
import {notification} from "../../components";

const authManagement = app.service('authManagement');
export default class extends Component {
    state = {
      loading: false
    }

    resetPassword = () => {
        if (this.state.username === undefined || this.state.username.length < 4) {
            notification('error', 'invalid Username!')
        } else if (this.state.token.length !== 6) {
            notification('error', 'invalid verification code!')
        } else if (this.state.password === undefined || this.state.password.length < 6 || this.state.password !== this.state.confirmPassword) {
            notification('error', 'invalid password minimum 6 characters are required!')
        } else {
            let data = {
                action: 'resetPwdShort',
                value: {
                    user: {_id: this.state.username.toLowerCase()}, // identify user, e.g. {email: 'a@a.com'}. See options.identifyUserProps.
                    token: this.state.token, // compares to .resetShortToken
                    password: this.state.password // new password
                }
            };
            //console.log(data);
            this.setState({loading: true})
            authManagement.create(data).then(res => {
                //console.log(res);
                this.setState({loading: false})
                notification('success', 'Password has been reset successfully!');
                this.props.history.push('/');
            }).catch(e => {
                //console.log(e.message);
                this.setState({loading: false})
                notification('error', e.message)
            });
        }

    }

    render() {
        return (
            <ResetPasswordStyleWrapper className="isoResetPassPage">
                <div className="isoFormContentWrapper">

                    <div className="isoFormContent">
                        <Row type={'flex'} justify={'center'}>
                            <img onClick={e => this.props.history.push('/')} src={Logo} alt="VEKO"/>
                        </Row>
                        <div className="isoLogoWrapper">
                            <IntlMessages id="sidebar.resetPw"/>
                        </div>

                        <div className="isoFormHeadText">
                            <h3>
                                <IntlMessages id="page.resetPassSubTitle"/>
                            </h3>
                            <p>
                                <IntlMessages id="page.resetPassDescription"/>
                            </p>
                        </div>

                        <div className="isoResetPassForm">
                            <div className="isoInputWrapper">
                                <Input onChange={e => this.setState({username: e.target.value.toLowerCase()})}
                                       size="large"
                                       placeholder="Username"
                                />
                            </div>
                            <div className="isoInputWrapper">
                                <Input onChange={e => this.setState({token: e.target.value})}
                                       size="large"
                                       placeholder="Verification token"
                                />
                            </div>
                            <div className="isoInputWrapper">
                                <Input onChange={e => this.setState({password: e.target.value})}
                                       size="large"
                                       type="password"
                                       placeholder="New Password"
                                />
                            </div>

                            <div className="isoInputWrapper">
                                <Input
                                    onChange={e => this.setState({confirmPassword: e.target.value})}
                                    size="large"
                                    type="password"
                                    placeholder="Confirm Password"
                                />
                            </div>

                            <div className="isoInputWrapper">
                                <Button onClick={e => this.resetPassword()} type="primary">
                                    <IntlMessages id="page.resetPassSave"/>
                                </Button>
                            </div>

                            <div className="isoCenterComponent isoHelperWrapper isoOtherLogin"
                                 style={{marginTop: '20px'}}>
                                <Link to="forgotpassword" className="isoForgotPass">
                                    <IntlMessages id="page.signInForgotPass"/>
                                </Link>
                            </div>
                            <div className="isoCenterComponent isoHelperWrapper isoOtherLogin"
                                 style={{marginTop: '10px'}}>
                                <Link to="signin">
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </ResetPasswordStyleWrapper>
        );
    }
}
