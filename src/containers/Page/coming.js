import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Row} from 'antd'
import IntlMessages from '../../components/utility/intlMessages';
import FourZeroFourStyleWrapper from './coming.style';
import Logo from '../../image/veko128b.png'

export default class extends Component {
    render() {
        return (
            <FourZeroFourStyleWrapper className="iso404Page">
                <div className="iso404Content">
                    <Row type={'flex'} justify={'center'}>
                        <img src={Logo} alt={'VEKO'}/>
                    </Row>


                    <p>
                        Thank you for being the part of the Vekota family. You should be able to login on 27th july 2018
                        2359hrs !
                    </p>
                </div>


            </FourZeroFourStyleWrapper>
        );
    }
}
