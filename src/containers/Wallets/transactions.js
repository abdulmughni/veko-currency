import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import Transactions from '../Transactions'

export default class extends Component {
    render() {
        return (
            <LayoutContentWrapper style={{minHeight: '100vh'}}>

                <Transactions></Transactions>
               
            </LayoutContentWrapper>
        );
    }
}
