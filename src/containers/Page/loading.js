import React, {Component} from 'react';
import {Row, Col, Spin} from 'antd'
import Logo from '../../image/veko128b.png'

export default class Loading extends Component {
    render() {
        return (
            <Row style={{minHeight: '100vh'}} type={'flex'} justify={'center'} align={'middle'}>
                <Col>
                    <Row type={'flex'} justify={'center'} align={'middle'}>
                        <Col><img style={{marginRight: 'auto', marginLeft: 'auto'}} src={Logo} alt={'VEKO'}/></Col>
                    </Row>

                    <Row style={{marginBottom: '40px'}} type={'flex'} justify={'center'} align={'middle'}>
                        <Col><h4 style={{color: '#797979'}}>The Most Spendable Cryptocurrency</h4></Col>
                    </Row>
                    <Row type={'flex'} justify={'center'} align={'middle'}>
                        <Col><Spin size="large" tip={'loading...'}/></Col>
                    </Row>
                </Col>


            </Row>


        )
    }
}