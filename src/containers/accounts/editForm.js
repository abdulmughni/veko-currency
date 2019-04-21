import React from 'react';
import { Form, Icon, Input, Button, Switch } from 'antd';

const FormItem = Form.Item;

class HorizontalLoginForm extends React.Component {

    componentDidMount() {
        const { setFieldsValue } = this.props.form;
        const {user} = this.props;
        // console.log(user);
        this.props.form.validateFields();
        setFieldsValue({
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            mobile: user.mobile,
            email: user.email,
            active: user.active
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {onUserEditSubmit} = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                onUserEditSubmit(values);
            }
        });
    };

    render() {
        const { cancelButton } = this.props;

        const { getFieldDecorator } = this.props.form;

        return (
            <Form layout="vertical" onSubmit={this.handleSubmit}>
                {getFieldDecorator('_id', {

                })(
                    <Input type="hidden" />
                )}
                <FormItem>
                    {getFieldDecorator('firstname', {

                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="First Name" />
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('lastname', {

                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Last Name" />
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('email', {

                    })(
                        <Input type="email" prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('mobile', {

                    })(
                        <Input type="tel" prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Phone" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('active', {
                        valuePropName: 'checked'
                    })(
                        <Switch />
                    )}


                </FormItem>


                <FormItem>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginRight: '10px' }}
                    >
                        Update
                    </Button>

                    <Button
                        onClick={ cancelButton() }
                    >
                        Cancel
                    </Button>
                </FormItem>
            </Form>

        );
    }
}

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);
export default WrappedHorizontalLoginForm;