import React, {Component} from 'react';
import Input from '../../components/uielements/input';
import Button from '../../components/uielements/button';
import {Row} from 'antd';
import {app} from '../../settings/index'
import IntlMessages from '../../components/utility/intlMessages';
import ForgotPasswordStyleWrapper from './forgotPassword.style';
import Logo from '../../image/veko128b.png'
import {connect} from 'react-redux'
import {notification} from '../../components'
import authActions from '../../redux/auth/actions';

const {logout} = authActions

const authManagement = app.service('authManagement');

export class Verify extends Component {
    state = {
        verify: true,
        code: '',

        loading: false
    };
    logout = () => {
        const {logout} = this.props;
        logout();

    };

    componentWillMount() {
    }

    resendCode = () => {
        const {profile} = this.props;
        this.setState({loading: true})
        authManagement.create({
            action: 'resendVerifySignup',
            value: {_id: profile._id},
            notifierOptions: {preferredComm: 'mobile'}
        })
            .then(e => {
                this.setState({loading: false})
                notification('success', 'Verification code resent!')
                this.setState({verify: true})
            })
            .catch(
              this.setState({loading: false})
            );
    };
    verifyMe = () => {
        // console.log(this.state.code)
        const {profile} = this.props;
        if (this.state.code !== undefined || this.state.code !== '') {
            this.setState({loading: true})
            authManagement.create({
                action: 'verifySignupShort',
                value: {
                    user: {_id: profile._id},
                    token: this.state.code,
                }
            })
                .then(e => {
                    this.setState({loading: false})
                    notification('success', 'You have been verified successfully!')
                    if (this.props.profile.role === 'guest' || this.props.profile.role === 'applicant') {
                        this.props.history.push('/home')
                    }
                    else if (this.props.profile.role === 'member') {
                        this.props.history.push('/member')
                    }
                    else if (this.props.profile.role === 'admin') {
                        this.props.history.push('/admin')
                    } else {
                        this.props.history.push('/')
                    }
                })
                .catch(e => {
                    this.setState({loading: false})
                    if (e.message === 'Verification token has expired.') {
                        this.setState({verify: false});
                        notification('error', 'Verification code has expired.');
                    } else {
                        notification('error', e.message);
                    }
                })
        }
    };

    render() {
        const {verify} = this.state;
        const {profile} = this.props;
        const Compo = verify ? <div>
                <div className="isoFormHeadText">
                    <h3>
                        <IntlMessages id="page.verifySubTitle"/>
                    </h3>
                    <p>
                        <IntlMessages id="page.verifyDescription"/>
                    </p>
                </div>
                <div className="isoForgotPassForm">
                    <div className="isoInputWrapper">
                        <Input onChange={e => this.setState({code: e.target.value})} size="large"
                               placeholder="verification code"/>
                    </div>

                    <div className="isoInputWrapper">
                        <Button onClick={e => this.verifyMe()}

                                type="primary">
                            <IntlMessages id="page.verifyMe"/>
                        </Button>
                    </div>
                    <div className="isoCenterComponent isoHelperWrapper isoOtherLogin">
                        <div onClick={e => this.setState({verify: false})} className="isoForgotPass">
                            Get new code
                        </div>

                    </div>
                </div>
            </div>
            : <div>
                <div className="isoFormHeadText">

                    <p>
                        Please click button below to resend code to {profile.mobile}
                    </p>
                </div>
                <div className="isoForgotPassForm">


                    <div className="isoInputWrapper">
                        <Button onClick={e => this.resendCode()}

                                type="primary">
                            Resend verification code
                        </Button>
                    </div>
                </div>
            </div>
        return (
            <ForgotPasswordStyleWrapper className="isoForgotPassPage">
                <div className="isoFormContentWrapper">
                    <div className="isoFormContent">
                        <Row type={'flex'} justify={'center'}>
                            <img onClick={e => this.logout()} src={Logo} alt="VEKO"/>
                        </Row>

                        {Compo}
                    </div>
                </div>
            </ForgotPasswordStyleWrapper>
        );
    }
}

export default connect(
    state => ({
        isLoggedIn: state.Auth.accessToken !== null,
        profile: state.Auth.profile
    }),
    {logout}
)(Verify);
