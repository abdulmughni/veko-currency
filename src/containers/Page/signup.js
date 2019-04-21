import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import IntlMessages from '../../components/utility/intlMessages';
import SignUpStyleWrapper from './signup.style';
import Phone from 'react-phone-number-input';
import rawCountries from '../../helpers/countries'
import {Icon, Input, Select, Row} from 'antd';
import userActions from '../../redux/users/actions'
import Form from '../../components/uielements/form';
import Logo from '../../image/veko128b.png';
import {app} from '../../settings/index';


import {
    parseNumber,    
    isValidNumber,
    getNumberType,
} from 'libphonenumber-js/custom'

import metadata from 'libphonenumber-js/metadata.full.json'

const Option = Select.Option;

const FormItem = Form.Item;
const {createUser} = userActions;

class SignUp extends Component {
    state = {
        redirectToReferrer: false,
        phone: '',
        country: 'Singapore',
        region: 'Central Singapore',
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        address: '',
        zip: '',
        packageId: '',
        sponsorId: '',
        side: '',
        username: '',
        paymentDetail: {amount: '', date: '', detail: '', verified: false},
        regions: [],
        countries: []
    };

    componentDidMount() {
        const countries = rawCountries.map(country => {
            return <Option key={country.countryName} value={country.countryName}>{country.countryName}</Option>
        });
        this.setState({countries});
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
        let {form} = this.props;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                let phone = form.getFieldValue('mobile');
                let phoneObj = parseNumber(phone, metadata);
                if (isValidNumber(phone, metadata)) {
                    if (getNumberType(phoneObj, metadata) !== 'MOBILE') {
                        form.setFields({
                            mobile: {
                                value: phone,
                                errors: [new Error('Only mobile number is required!')]
                            }
                        });
                    } else {
                        const {createUser} = this.props;
                        createUser(Object.assign({}, values, {
                            _id: values.username,
                            address: {country: phoneObj.country}
                        }));
                    }

                } else {
                    form.setFields({mobile: {value: phone, errors: [new Error('Invalid mobile number')]}});
                }

            }
        });
    };

    /* handleLogin = () => {
       const { login } = this.props;
       login();
       this.props.history.push('/dashboard');
     };
     */

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    };
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords are inconsistent!');
        } else {
            callback();
        }
    };
    checkMobile = (rule, value, cb) => {
        // let phone = parseNumber(value);
        //console.log(phone);
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };
    checkUnique = (rule, value, cb) => {
        if (value && value.length > 3) {
            app.service('authManagement').create({action: 'checkUnique', value: {_id: value}, meta: {noErrMsg: {}}})
                .then(r => cb())
                .catch(e => cb(e.errors._id))
        } else {
            cb();
        }

    };
    onCountryChange = country => {
        try {
            this.props.form.setFields({country: {value: country}})
            let ctry = rawCountries.find(item => item.countryName === country)
            let regions = null
            if (ctry) {
                regions = ctry.regions.map(item => {
                    return <Option key={item.name} value={item.name}> {item.name} </Option>
                })
            }
            if (regions.length > 0) {
                this.setState({regions})
                this.props.form.setFields({
                    region: {value: ctry.regions[0]['name']}
                })
            }
        } catch (e) {

        }


    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <SignUpStyleWrapper className="isoSignUpPage">
                <div className="isoSignUpContentWrapper">
                    <div className="isoSignUpContent">
                        <Row type={'flex'} justify={'center'}>
                            <img src={Logo} alt="VEKO"/>
                        </Row>
                        <div className="isoLogoWrapper">
                            <Link to="/">
                                <IntlMessages id="page.signUpTitle"/>
                            </Link>
                        </div>

                        <Form className="isoSignUpForm" onSubmit={this.handleSubmit}>
                            <div className="isoInputWrapper isoLeftRightComponent">
                                <FormItem style={{margin: '0px', padding: '0px'}}>
                                    {getFieldDecorator('firstname', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your firstname!',
                                            },
                                        ],
                                    })(<Input name="firstname" id="firstname" placeholder='First Name'/>)}
                                </FormItem>
                                <FormItem style={{margin: '0px', padding: '0px'}}>
                                    {getFieldDecorator('lastname', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your lastname!',
                                            },
                                        ],
                                    })(<Input name="lastname" id="lastname" placeholder='Last Name'/>)}
                                </FormItem>
                            </div>
                            <FormItem className="isoInputWrapper">
                                {getFieldDecorator('username', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your username'
                                            }, {
                                                min: 4,
                                                message: 'minimum 4 characters are required'
                                            },
                                            {
                                                validator: this.checkUnique,
                                            },]
                                    }
                                )(<Input addonBefore="@" name='username' id='username'
                                         placeholder='username'/>)}
                            </FormItem>
                            <FormItem className='isoInputWrapper'>
                                {getFieldDecorator('email', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your email',
                                        },
                                        {
                                            type: 'email', message: 'The input is not valid E-mail!',
                                        }
                                    ]
                                })(<Input type={'email'} placeholder='email' id='email'
                                          addonBefore={<Icon type="mail"/>}/>)}
                            </FormItem>
                            <FormItem className='isoInputWrapper'>
                                {getFieldDecorator('mobile', {
                                    rules: [
                                        {
                                            required: true,
                                            message: 'Please input your Mobile'
                                        }
                                    ]
                                })(<Phone placeholder='mobile'/>)}
                            </FormItem>
                            <div className="isoInputWrapper isoLeftRightComponent">
                                <FormItem style={{margin: '0px', padding: '0px'}}>
                                    {getFieldDecorator('password', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please input your password!',
                                            },
                                            {
                                                min: 6,
                                                message: 'minimum 6 characters are required'
                                            }
                                        ],
                                    })(<Input type='password' name="password" id="password"
                                              placeholder='password'/>)}
                                </FormItem>
                                <FormItem style={{margin: '0px', padding: '0px'}}>
                                    {getFieldDecorator('confirm', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Please confirm your password!',
                                            },
                                            {
                                                validator: this.checkPassword,
                                            },
                                        ],
                                    })(<Input type='password' name="confirm" id="confirm"
                                              placeholder='confirm password'/>)}
                                </FormItem>
                            </div>
                            <div className="isoInputWrapper" style={{marginBottom: '50px'}}>
                                <Checkbox>
                                    <IntlMessages id="page.signUpTermsConditions"/>
                                </Checkbox>
                            </div>

                            <div className="isoInputWrapper">
                                <Button type="primary" htmlType="submit">
                                    <IntlMessages id="page.signUpButton"/>
                                </Button>
                            </div>
                            <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                                <Link to="/signin">
                                    <IntlMessages id="page.signUpAlreadyAccount"/>
                                </Link>
                            </div>
                        </Form>
                    </div>
                </div>
            </SignUpStyleWrapper>
        );
    }
}

const WrappedFormWIthSubmissionButton = Form.create()(SignUp);

export default connect(
    state => ({
        isLoggedIn: state.Auth.accessToken !== null,
    }),
    {createUser}
)(WrappedFormWIthSubmissionButton);
