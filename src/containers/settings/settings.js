/**
 * Created by Mughni on 7/19/2018.
 */
import React from 'react';
import {Tabs, message} from 'antd';
import {connect} from 'react-redux';
import {Client} from '../../settings'
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import ProfileView from './profileView'
import ProfileForm from './profileForm'
import AddressView from './address';
import AddressForm from './addressForm';
import BankView from './bankView';
import BankForm from './bankForm';
import BeneficiaryView from './beneficiaryView';
import BeneficiaryForm from './beneficiaryForm';
import SpouseView from './spouseView';
import SpouseForm from './spouseForm';
import IntlMessages from '../../components/utility/intlMessages';


const TabPane = Tabs.TabPane;
const UserService = Client.service('users')

export class Profile extends React.Component {
    state = {
        profileEdit: false,
        fansEdit: false,
        bankEdit: false,
        editBeneficiary: false,
        editSpouse: false
    };
    onChange = () => {

    };
    editProfileForm = () => {
        this.setState({profileEdit: true});
    };
    cancelProfileForm = () => {
        this.setState({profileEdit: false});
    };
    submitProfileForm = (values) => {
        UserService.patch(this.props.profile._id, values).then(res => {
            message.success('Profile information has been updated!')
        });
        this.setState({profileEdit: false});
    };

    editAddressForm = () => {
        this.setState({fansEdit: true});
    };
    cancelAddressForm = () => {
        this.setState({fansEdit: false});
    };

    submitAddressForm = (values) => {
        UserService.patch(this.props.profile._id, {address: values}).then(res => {
            message.success('Profile information has been updated!')
        });
        this.setState({fansEdit: false});
    };

    editBankForm = () => {
        this.setState({bankEdit: true});
    };
    cancelBankForm = () => {
        this.setState({bankEdit: false});
    };

    submitBankForm = (values) => {
        UserService.patch(this.props.profile._id, {bank: values}).then(res => {
            message.success('Bank information has been updated!')
        });

        this.setState({bankEdit: false});
    };

    editBeneficiaryForm = () => {
        this.setState({beneficiaryEdit: true});
    };
    cancelBeneficiaryForm = () => {
        this.setState({beneficiaryEdit: false});
    };

    submitBeneficiaryForm = (values) => {
        UserService.patch(this.props.profile._id, {beneficiary: values}).then(res => {
            message.success('Beneficiary information has been updated!')
        });
        this.setState({beneficiaryEdit: false});
    };

    editSpouseForm = () => {
        this.setState({editSpouse: true});
    };
    cancelSpouseForm = () => {
        this.setState({editSpouse: false});
    };

    submitSpouseForm = (values) => {
        UserService.patch(this.props.profile._id, {spouse: values}).then(res => {
            message.success('Spouse information has been updated!')
        });
        this.setState({editSpouse: false});
    };


    render() {
        return (
            <LayoutContentWrapper style={{padding: '40px 20px'}}>
                <LayoutContent>
                    <Tabs defaultActiveKey="1" onChange={this.onChange}>
                        <TabPane tab={<IntlMessages id="member.settings.memberProfile"/>} key="1">
                            {
                                !this.state.profileEdit
                                &&
                                <ProfileView user={this.props.profile} Edit={this.editProfileForm}/>
                            }
                            {
                                this.state.profileEdit
                                &&
                                <ProfileForm user={this.props.profile} Submit={this.submitProfileForm} Cancel={this.cancelProfileForm}/>
                            }
                        </TabPane>
                        <TabPane tab={<IntlMessages id="member.settings.address"/>} key="2">
                            {
                                !this.state.fansEdit
                                &&
                                <AddressView user={this.props.profile} Edit={this.editAddressForm}/>
                            }
                            {
                                this.state.fansEdit
                                &&
                                <AddressForm user={this.props.profile} Submit={this.submitAddressForm} Cancel={this.cancelAddressForm}/>
                            }
                        </TabPane>
                        <TabPane tab={<IntlMessages id="member.settings.bankInformation"/>} key="3">
                            {
                                !this.state.bankEdit
                                &&
                                <BankView user={this.props.profile} Edit={this.editBankForm}/>
                            }
                            {
                                this.state.bankEdit
                                &&
                                <BankForm user={this.props.profile} Submit={this.submitBankForm} Cancel={this.cancelBankForm}/>
                            }
                        </TabPane>
                        <TabPane tab={<IntlMessages id="member.settings.beneficiaryInformation"/>} key="4">
                            {
                                !this.state.beneficiaryEdit
                                &&
                                <BeneficiaryView user={this.props.profile} Edit={this.editBeneficiaryForm}/>
                            }
                            {
                                this.state.beneficiaryEdit
                                &&
                                <BeneficiaryForm user={this.props.profile} Submit={this.submitBeneficiaryForm} Cancel={this.cancelBeneficiaryForm}/>
                            }
                        </TabPane>

                        <TabPane tab={<IntlMessages id="member.settings.spouseInformation"/>} key="5">
                            {
                                !this.state.editSpouse
                                &&
                                <SpouseView user={this.props.profile} Edit={this.editSpouseForm}/>
                            }
                            {
                                this.state.editSpouse
                                &&
                                <SpouseForm user={this.props.profile} Submit={this.submitSpouseForm} Cancel={this.cancelSpouseForm}/>
                            }
                        </TabPane>
                    </Tabs>
                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}

export default connect(
    state => ({
        profile: state.Auth.profile
    })
)(Profile)
