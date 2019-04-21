import React, {Component} from 'react';
import {Form, Input, Col, Button, Select} from 'antd';
import {app} from "../../settings";
import Phone from 'react-phone-number-input';
import IntlMessages from '../../components/utility/intlMessages';
import {CountryDropdown} from 'react-country-region-selector';

import {
    parseNumber,
    isValidNumber,
    getNumberType,
} from 'libphonenumber-js/custom'


import metadata from 'libphonenumber-js/metadata.full.json'


const Option = Select.Option;
const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 18},
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 18,
            offset: 6,
        },
    },
};

class SignUp extends Component {
    state = {
        placements: []
    }

    componentDidMount() {
        const {user} = this.props;

        const {setFieldsValue} = this.props.form;
        if (user !== undefined) {
            app.service('tree').get(user.sponsorId, {query: {action: 'freeNodes'}})
                .then(res => {
                    this.setState({placements: res});
                });
            delete user.address;
            setFieldsValue(user);

        } else {
            app.service('tree').get(this.props.sponsorId, {query: {action: 'freeNodes'}})
                .then(res => {
                    this.setState({placements: res});
                    setFieldsValue({sponsorId: this.props.sponsorId, parentId: this.props.parentId});
                });

        }
    }

    compareToFirstPassword = (rule, value, callback) => {
        const {getFieldValue} = this.props.form;
        if (value && value !== getFieldValue('password')) {
            callback('Two passwords are inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    };

    handleSubmit = (e) => {
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
                        //let data = Object.assign({}, values, {address: {country: phoneObj.country}});
                        this.props.onRegistration(values);
                    }

                } else {
                    form.setFields({mobile: {value: phone, errors: [new Error('Invalid mobile number')]}});
                }

            }
        });
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
    checkExist = (rule, value, cb) => {
        const {setFieldsValue} = this.props.form;
        if (value && value.length > 3) {
            app.service('authManagement').create({action: 'checkUnique', value: {_id: value}, meta: {noErrMsg: {}}})
                .then(r => {
                    setFieldsValue({parentId: undefined});
                    cb('Member doesn\'t exist!')
                })
                .catch(e => {
                    app.service('tree').get(value, {query: {action: 'freeNodes'}})
                        .then(res => {
                            this.setState({placements: res});
                        });
                    cb();
                })
        } else {
            setFieldsValue({parentId: undefined});
            cb();
        }

    };

    render() {
        const {getFieldDecorator} = this.props.form;
        let freeNodes = this.state.placements.map(parent => {
            return <Option value={parent} key={parent}>{parent}</Option>
        });

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label={<IntlMessages id="member.register-member.sponsor"/>}
                >
                    {getFieldDecorator('sponsorId', {
                        rules: [{
                            required: true, message: 'Please input Sponsor!',
                        }, {
                            min: 4,
                            message: 'Minimum 4 characters are required!'
                        }, {
                            validator: this.checkExist,
                        }
                        ],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={<IntlMessages id="member.register-member.placement"/>}
                >
                    {getFieldDecorator('parentId', {
                        rules: [{
                            required: true, message: 'Please Select Placement!',
                        },
                        ],
                    })(
                        <Select
                            showSearch
                            style={{width: 200}}
                            placeholder={<IntlMessages id="member.register-member.selectAvailablePlacement"/>}
                            optionFilterProp="children"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {freeNodes}
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={<IntlMessages id="member.register-member.username"/>}
                >
                    {getFieldDecorator('_id', {
                        rules: [{
                            required: true, message: 'Please input Username!',
                        }, {
                            min: 4,
                            message: 'Minimum 4 characters are required!'
                        }, {
                            validator: this.checkUnique,
                        }
                        ],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem
                    label={<IntlMessages id="member.register-member.name"/>}
                    {...formItemLayout}
                >
                    <Col span={11}>
                        <FormItem>
                            {getFieldDecorator('firstname', {
                                rules: [{
                                    required: true, message: "Please input First Legal Name!",
                                }
                                ],
                            })(
                                <Input placeholder="Please input First Legal Name!"/>
                            )}

                        </FormItem>
                    </Col>
                    <Col span={2}>
        <span style={{display: 'inline-block', width: '100%', textAlign: 'center'}}>
          -
        </span>
                    </Col>
                    <Col span={11}>
                        <FormItem>
                            {getFieldDecorator('lastname', {
                                rules: [{
                                    required: true, message: "Please input Last Legal Name!",
                                }
                                ],
                            })(
                                <Input placeholder="Please input Last Legal Name!"/>
                            )}
                        </FormItem>
                    </Col>
                </FormItem>


                <FormItem {...formItemLayout} label={<IntlMessages id="member.sponsored-members.country"/>}>
                    {getFieldDecorator('address.country', {

                        rules: [
                            {
                                required: true,
                                message: 'Please Select Country'
                            }],
                    })(
                        <CountryDropdown
                            classes={'rcrs registerFormCountry'}
                            valueType={'short'}
                            labelType={'full'}

                        />
                    )}
                </FormItem>


                <FormItem
                    {...formItemLayout}
                    label={<IntlMessages id="member.register-member.mobile#"/>}
                >
                    {getFieldDecorator('mobile', {
                        rules: [{
                            required: true, message: "Please input your mobile #",
                        }],
                    })(
                        <Phone placeholder="International Format Like +65XXXXYYYY"/>
                    )}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label={<IntlMessages id="member.register-member.email"/>}
                >
                    {getFieldDecorator('email', {
                        rules: [{
                            type: 'email', message: 'The input is not valid E-mail!',
                        }, {
                            required: true, message: 'Please input your E-mail!',
                        }],
                    })(
                        <Input/>
                    )}
                </FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button onClick={e => this.props.onCancel()}><IntlMessages
                        id="member.register-member.cancel"/></Button> <Button style={{marginLeft: '10px'}}
                                                                              type="primary"
                                                                              htmlType="submit"><IntlMessages
                    id="member.register-member.next"/></Button>

                </FormItem>
            </Form>
        )
    }

}

const wrapper = Form.create()(SignUp);
export default wrapper
