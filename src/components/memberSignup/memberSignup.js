import React, {Component} from 'react';
import {connect} from 'react-redux';
import Register from './registerForm';
import {Steps, Icon, Button, Alert, message} from 'antd';
import packageActions from '../../redux/packages/actions';
import PricingTable from '../pricingTable/pricingTable';
import PaymentForm from './paymentForm';
import IntlMessages from '../../components/utility/intlMessages';
import Confirm from './confirmForm';
import {Client} from '../../settings';
import TreeActions from '../../redux/tree/actions'


const {getTree, selectMember, pushRoute} = TreeActions

const UserService = Client.service('users');
const PaymentService = Client.service('payments');

const {findPackage} = packageActions;
const Step = Steps.Step;

class SignUp extends Component {
    state = {
        current: 0,
        id: 0
    };

    componentDidMount() {
        if (this.props.parent) {

        }
    }

    packageChange = (id) => {
        const {packages} = this.props;
        packages.map(p => {
            if (p._id === id) {
                this.setState({id, packageValue: p.value, amount: p.value, packageTitle: p.title}, () => {
                        //this.setStatus()
                    }
                )
            }
        })


    };
    previous = () => {
        const current = this.state.current - 1;
        this.setState({current});

    };
    onRegistration = (user) => {
        const {findPackage} = this.props;
        const {current} = this.state;
        user._id = user._id.toString().toLowerCase();
        findPackage({country: user.address.country});
        this.setState({user, current: current + 1}, () => {

        })
    };
    onCancel = () => {
        this.props.onCancel();
    }
    submitApplication = () => {
        const {getTree, selectMember, profile, pushRoute} = this.props
        let user = this.state.user;
        user.packageId = this.state.id
        UserService.create(user)
            .then(e => {
                PaymentService.create({
                    type: 'transfer',
                    mode: 'wallet',
                    userId: this.props.profile._id,
                    amount: this.state.amount,
                    associatedUserId: this.state.user._id,
                    purpose: 'membership',
                })
                    .then(e => {
                        // getTree(profile._id);
                        // selectMember(undefined);
                        message.success('Application processed successfully!');

                        if (this.props.parent) {
                            getTree(profile._id);
                            selectMember(undefined);
                            pushRoute('/member');
                            this.props.onCancel()
                        } else {
                            this.setState({
                                id: 0, packageValue: undefined, packageTitle: undefined, user: undefined,
                                current: 0
                            })
                        }
                    })
                    .catch(e => message.error(e.message))
            })
            .catch(e => message.error(e.message))

    }

    paymentSubmit = (value) => {
        this.setState({amount: this.state.packageValue}, () => {
            this.setState({current: this.state.current + 1})
        })
    }

    render() {
        const {current} = this.state;
        const steps = [
            {
                status: "process",
                title: <IntlMessages id="member.register-member.memberRegistration"/>,
                content: <Register parentId={this.props.parent} sponsorId={this.props.parent}
                                   user={this.state.user} onCancel={e => this.onCancel()}
                                   onRegistration={(v) => this.onRegistration(v)}/>,
                icon: <Icon type="user"/>
            }, {
                title: <IntlMessages id="member.register-member.packageSelection"/>,
                content: <div>
                    <PricingTable data={this.props.packages} selectedId={this.state.id}
                                  packageChange={e => this.packageChange(e)}/>
                    <div style={{marginTop: '20px', alignContent: 'center'}}>
                        <Button onClick={e => this.previous()}><IntlMessages id="signUp.back"/></Button>
                        <Button type={'primary'}
                                style={this.state.id !== 0 && this.props.cash.availableBalance > this.state.packageValue ? {marginLeft: '10px'} : {display: 'none'}}
                                onClick={e => {
                                    this.setState({current: this.state.current + 1, 'user.packageId': this.state.id});
                                }}><IntlMessages id="member.register-member.next"/></Button>
                    </div>
                </div>,
                icon: <Icon type="solution"/>
            }, {
                title: <IntlMessages id="member.register-member.payment"/>,
                content: <div><PaymentForm previous={e => this.previous()} amount={this.state.packageValue}
                                           cash={this.props.cash.availableBalance}
                                           min={this.state.packageValue}
                                           amountSubmit={e => this.paymentSubmit(e)}/>

                </div>,
                icon: <Icon type="swap"/>
            }, {
                title: <IntlMessages id="member.register-member.done"/>,
                content: <Confirm previous={e => this.previous()} user={this.state.user}
                                  amount={this.state.packageValue}
                                  packageTitle={this.state.packageTitle}
                                  submitApplication={e => this.submitApplication()}/>,
                icon: <Icon type="check"/>
            }];
        return (
            <div>
                {
                    this.state.packageValue > this.props.cash.availableBalance
                    &&
                    <Alert message="You don't have enough balance for this Package!" type="error"/>
                }
                <Steps current={current}>
                    {steps.map(item => <Step key={item.title} icon={item.icon} title={item.title}/>)}

                </Steps>
                <div className="steps-content" style={{marginTop: '20px'}}>{steps[current].content}</div>
            </div>
        )
    }

}

export default connect(
    state => ({
        profile: state.Auth.profile,
        cash: state.Wallets.cash,
        packages: state.Packages.packages,

    }), {findPackage, getTree, selectMember, pushRoute}
)(SignUp)
