import React, {Component} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Input, Row} from 'antd';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import Logo from '../../image/veko128b.png'
import Form from '../../components/uielements/form';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitch'

const FormItem = Form.Item;


const {login} = authAction;

class SignIn extends Component {
    state = {
        confirmDirty: false
    };

    componentWillReceiveProps(nextProps) {
        if (
            this.props.isLoggedIn !== nextProps.isLoggedIn &&
            nextProps.isLoggedIn === true
        ) {
            this.setState({redirectToReferrer: true});
        }

    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                //console.log(this.props);
                const {login} = this.props;
                const info = {strategy: 'local', _id: values.username.toLowerCase(), password: values.password};
                login(info);
            }
        });
    };

    /*
    handleLogin = (e) => {
      const { login } = this.props;
      login({strategy: 'local', username: this.state.username, password: this.state.password});
      if(this.props.isLoggedIn) {
          this.props.history.push('/dashboard');
      }
    };
    */
    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const from = {pathname: '/dashboard'};
        if (this.props.isLoggedIn) {
            return <Redirect to={from}/>;
        }
        return (
            <SignInStyleWrapper className="isoSignInPage">
                <div className="isoLoginContentWrapper">
                    <div className="isoLoginContent">
                        <Row type={'flex'} justify={'center'}>
                            <LanguageSwitcher />
                        </Row>
                        <Row type={'flex'} justify={'center'}>
                            <img src={Logo} alt="VEKO"/>
                        </Row>
                        <Row type={'flex'} justify={'content'}>
                            <span style={{
                                width: '100%',
                                textAlign: 'center',
                                margin: '-20px 0 20px',
                                letterSpacing: 1
                            }}><IntlMessages id="page.mostSpendable"/></span>
                        </Row>
                        <div className="isoLogoWrapper">
                            <Link to="/">
                                <IntlMessages id="page.signInTitle"/>
                            </Link>
                        </div>

                        <div className="isoSignInForm">
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem className="isoInputWrapper" label={<IntlMessages id="SignIn.username"/>}>
                                    {getFieldDecorator('username', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your username!',
                                            },
                                        ],
                                    })(<Input name="username" id="username" />)}
                                </FormItem>
                                <FormItem className="isoInputWrapper" label={<IntlMessages id="SignIn.password"/>}>
                                    {getFieldDecorator('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            }
                                        ],
                                    })(<Input type="password" />)}
                                </FormItem>
                                <div className="isoInputWrapper isoLeftRightComponent">
                                    <Checkbox>
                                        <IntlMessages id="page.signInRememberMe"/>
                                    </Checkbox>
                                    <Button type="primary" htmlType="submit">
                                        <IntlMessages id="page.signInButton"/>
                                    </Button>
                                </div>

                                <div style={{
                                    padding: '20px',
                                    borderRadius: '4px',
                                    border: 'solid 1px rgb(255, 132, 132)',
                                    lineHeight: '30px'
                                }}>
                                    <IntlMessages id="page.forFirstTimeLogin"/> : <a
                                    href="https://goo.gl/B9uHaH" target="_blank" rel='noopener noreferrer'>https://goo.gl/B9uHaH</a>
                                </div>

                                <div className="isoCenterComponent isoHelperWrapper isoOtherLogin">
                                    <Link to="forgotpassword" className="isoForgotPass">
                                        <IntlMessages id="page.signInForgotPass"/>
                                    </Link>

                                </div>
                            </Form>
                        </div>
                        <div className="termsLink"><a href="https://s3-ap-southeast-1.amazonaws.com/veko/Veko+Term+%26+Condition.pdf" target="_blank" rel='noopener noreferrer'><IntlMessages id="veko.termsConditions"/></a></div>
                    </div>
                </div>
            </SignInStyleWrapper>
        );
    }

}

const WrappedFormWIthSubmissionButton = Form.create()(SignIn);

export default connect(
    state => ({
        isLoggedIn: state.Auth.accessToken !== null
    }),
    {login}
)(WrappedFormWIthSubmissionButton);
