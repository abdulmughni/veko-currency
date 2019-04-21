import React, {Component} from 'react';
import {SaleWidgetWrapper} from './style';

export default class extends Component {
    render() {
        const {fontColor, title, value, sponsor, pairing, fast, leadership, levelcap, leaderlevels, selected} = this.props;

        const textColor = {
            color: fontColor
        };

        return (
            <SaleWidgetWrapper className="isoSaleWidget" style={{ borderColor: selected ? '#1890ff' : ''}}>
                <h3 className="isoSaleLabel">{title}</h3>
                <span className="isoSalePrice" style={textColor}>
          $ {value}
        </span>
                <p className="isoSaleDetails"><span>Sponsor Bonus:</span>
                    <span style={{float: 'right'}}> {sponsor} %</span></p>
                <p className="isoSaleDetails"><span>Pairing Commission:</span>
                    <span style={{float: 'right'}}> {pairing} %</span></p>
                <p className="isoSaleDetails"><span>Fast Start Commission:</span>
                    <span style={{float: 'right'}}> {fast} %</span></p>
                <p className="isoSaleDetails"><span>Leadership Commission:</span>
                    <span style={{float: 'right'}}> {leadership} %</span></p>
                <p className="isoSaleDetails"><span>Level Pairing Cap:</span>
                    <span style={{float: 'right'}}>$ {levelcap}</span></p>
                <p className="isoSaleDetails"><span>Leadership level depth:</span>
                    <span style={{float: 'right'}}> {leaderlevels}</span></p>
            </SaleWidgetWrapper>
        );
    }
}
