import React, {Component} from 'react';
import {Row, Col, Divider, Icon,} from 'antd';
import {connect} from 'react-redux'
import logo from '../../image/veko128b.png'
import applicationActions from '../../redux/applications/actions';
import authActions from '../../redux/auth/actions';

const {logout} = authActions

const {findMyApplication} = applicationActions;

export class Applicant extends Component {
    componentWillMount() {
        const {findMyApplication} = this.props;
        findMyApplication();

    }

    logout = () => {
        const {logout} = this.props;
        logout();

    };


    render() {
        const {profile} = this.props;
        
        return (
            <div>
                <Row type={'flex'} align={'middle'} justify={'center'} style={{minHeight: '100vh'}}>
                    <Col>
                        <Row type={'flex'} align={'middle'} justify={'center'}>
                            <Col>
                                <img onClick={e => {
                                    this.logout()
                                }} src={logo} alt="VEKO"/>
                            </Col>
                        </Row>
                        <Row type={'flex'} align={'middle'} justify={'center'}>
                            <Col span={12}>
                                <h3 style={{textAlign: 'center'}}>{profile.firstname} {profile.lastname}</h3>
                                <Divider>Application Status</Divider>
                                <Row type={'flex'} align={'middle'} justify={'center'}>
                                    <div style={{
                                        padding: '30px',
                                        backgroundColor: 'orange',
                                        width: '500px',
                                        textAlign: 'center',
                                        color: 'black',
                                        border: '1px solid black'
                                    }}>Pending
                                    </div>
                                </Row>
                                <Divider> Contact </Divider>
                                <Row type={'flex'} align={'middle'} justify={'center'}>
                                    <h3>Vekota Ventures</h3>


                                </Row>
                                <Row type={'flex'} align={'middle'} justify={'center'}><Col> 61 Ubi Avenue 2
                                    #06-06</Col></Row>
                                <Row type={'flex'} align={'middle'} justify={'center'}><Col> Automobile MegaMart
                                    AML</Col></Row>
                                <Row type={'flex'} align={'middle'} justify={'center'}><Col> Singapore
                                    408898</Col></Row>
                                <Row type={'flex'} align={'middle'} justify={'center'}><Col><Icon
                                    type="phone"/> 69500896</Col></Row>
                                <Row type={'flex'} align={'middle'} justify={'center'}><Col><Icon
                                    type="mail"/> sales@veko.io</Col></Row>

                            </Col>
                        </Row>

                    </Col>

                </Row>


            </div>

        );
    }

}

export default connect(state => ({
    myApplication: state.Application.myApplication,
    profile: state.Auth.profile

}), {findMyApplication, logout})(Applicant)
