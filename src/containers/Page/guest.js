import React, {Component} from 'react';
import {connect} from 'react-redux'
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import {Steps, Button, Row, Col} from 'antd';
import basicStyle from "../../settings/basicStyle";
import packageActions from '../../redux/packages/actions';
import usersActions from '../../redux/users/actions';
import applicationActions from '../../redux/applications/actions';
import {notification} from '../../components'
import Logo from '../../image/veko128b.png'
import authActions from '../../redux/auth/actions';
import {message} from "antd/lib/index";
import PricingTable from '../../components/pricingTable/pricingTable'
import Deposit from './GuestForms/depositForm'
import {Client} from '../../settings'

const {logout} = authActions;

const UserService = Client.service('users');
const paymentService = Client.service('payments');
const {findPackage} = packageActions;
const {patchUser} = usersActions;
const {createApplication} = applicationActions;

const Step = Steps.Step;
const {rowStyle} = basicStyle;

const stepsAction = {
    marginTop: '24px'
};


export class Guest extends Component {
    state = {
      loading: false
    }
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
            wizard: false,
            sponsorId: '',
            selectedId: 0
        };

    }

    componentDidMount() {
        const {profile, findPackage} = this.props
        this.setState({country: profile.address.country})
        findPackage({});
    }

    packageChange = (id) => {
        this.setState({selectedId: id});
        const {packages} = this.props;
        packages.map(p => {
            if (p._id === id) {
                this.setState({packageValue: p.value})
            }
        });
        this.setState({loading: true})
        UserService.patch(this.props.profile._id, {packageId: id})
            .then(() => {
              this.setState({loading: false});
                //this.setState({current: this.state.current + 1})
            })
            .catch(e => {
              this.setState({loading: false})
              message('error', e.message)
          });
    };

    logout = () => {
        const {logout} = this.props;
        logout();

    };
    handlePaymentChange = (value) => {
        switch (value) {
            case 'internet banking': {
                this.setState({paymentMode: 'internet banking', PaymentPlaceholder: 'please state reference number'});
                break;
            }
            case 'cash payment': {
                this.setState({
                    paymentMode: 'cash payment',
                    PaymentPlaceholder: 'please state company cash voucher number'
                });
                break;
            }
            case 'bank deposit': {
                this.setState({paymentMode: 'bank deposit', PaymentPlaceholder: 'please state bank reference number'});
                break;
            }
            default: {
                return
            }
        }

    };
    addressSubmited = (address) => {

        const {findPackage} = this.props
        this.setState({loading: true})
        UserService.patch(this.props.profile._id, address)
            .then(() => {
                this.setState({loading: false})
                findPackage({});
                this.setState({current: this.state.current + 1})
            })
            .catch(e => {
              this.setState({loading: false})
              notification('error', e.message)
          });

    };


    prev() {
        const current = this.state.current - 1;
        this.setState({current});
    }

    next = () => {
        const current = this.state.current + 1;
        this.setState({current});
    }

    selectPackage = (plan) => {
        this.setState({packageId: plan._id, package: plan, min: plan.value, amount: plan.value});
    };
    submitDeposit = (deposit) => {
        //console.log(deposit);
        if (deposit.meta.sponsorId) {
            UserService.patch(this.props.profile._id, {sponsorId: deposit.meta.sponsorId});
        }
        this.setState({loading: true})
        paymentService.create(deposit)
            .then(r => {
                this.setState({loading: false})
                notification('success', 'your application has been submitted');
                this.logout();

            }).catch(e => {
              this.setState({loading: false})
              notification('error', e.message)
          });
    };


    render() {
        const {packages, profile} = this.props;
        const {current} = this.state;

        const steps = [
            /*{
                title: 'Contact information',
                content: (
                    <div>
                        <Row type={'flex'} align={'middle'} justify={'space-around'}>
                            <Col xs={24} md={12}>
                                <Address addrs={profile} addressSubmit={this.addressSubmited}></Address>
                            </Col>
                        </Row>
                    </div>
                )

            },*/

            {
                title: 'Select your package',
                content: (
                    <div>
                        <Row style={rowStyle} gutter={0} justify="center">
                            <PricingTable data={packages} selectedId={this.state.selectedId}
                                          packageChange={this.packageChange}></PricingTable>
                        </Row>

                    </div>
                ),
            }, {
                title: 'Payment',
                content: (<div>
                    <Row type={'flex'} align={'middle'} justify={'space-around'}>
                        <Col xs={24} md={12}>
                            <Deposit min={this.state.packageValue} submitDeposit={this.submitDeposit}></Deposit>
                        </Col>
                    </Row>
                </div>),
            }];
        const header = (
            <Row type="flex" justify="center">
                <Col>
                    <Row type="flex" justify="center">
                        <img onClick={e => {
                            this.logout()
                        }} style={{marginRight: 'auto', marginLeft: 'auto'}} src={Logo} alt={'VEKO'}/>
                    </Row>
                    <Row type="flex" justify="center"><h4>Registration</h4></Row>

                </Col>
            </Row>
        )
        const wizard = (<LayoutContentWrapper style={{minHeight: '100vh'}}>
            <LayoutContent>
                <div>
                    <Steps current={current}>
                        {steps.map(item => <Step key={item.title} title={item.title}/>)}
                    </Steps>
                    <div
                        style={{marginTop: '60px'}}>
                        {steps[this.state.current].content}
                    </div>
                    <div className={stepsAction} style={{float: 'right'}}>
                        {
                            this.state.current > 0
                            &&
                            <Button style={{marginRight: 8}} onClick={() => this.prev()}>
                                Previous
                            </Button>
                        }
                        {
                            this.state.current === 0 && this.state.selectedId !== 0
                            &&
                            <Button type={'primary'} onClick={() => this.next()}>Next</Button>
                        }

                    </div>
                </div>
            </LayoutContent>
        </LayoutContentWrapper>)
        const welcome =
            <Row type={'flex'} justify={'space-around'} align={'middle'}
                 style={{minHeight: '100vh', flexDirection: 'flex-row'}}>
                <Col>
                    <Row type="flex" justify="center">
                        <img onClick={e => {
                            this.logout()
                        }} style={{marginRight: 'auto', marginLeft: 'auto'}} src={Logo} alt={'VEKO'}/>
                    </Row>
                    <h3 style={{textAlign: 'center', marginBottom: '20px'}}> {profile.firstname} {profile.lastname}</h3>
                    <h1>Welcome to Vekota Ventures</h1>
                    <Button type={'primary'} size={'large'} style={{width: '100%'}}
                            onClick={e => this.setState({wizard: true})}> Complete your Registration</Button>

                </Col>

            </Row>
        let wizardHome = <Row type={'flex'}>
            <Col span={24}>
                <h1>{header}</h1>
            </Col>
            <Col span={24}>{wizard}</Col>
        </Row>
        let Display = this.state.wizard ? wizardHome : welcome;
        return (
            <div>{Display}</div>
        );
    }
}

export default connect(
    state => ({
        packages: state.Packages.packages,
        profile: state.Auth.profile,
        access: state.Auth.accessToken,
    }),
    {findPackage, patchUser, createApplication, logout}
)(Guest);
