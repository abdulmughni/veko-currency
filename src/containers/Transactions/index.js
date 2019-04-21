import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import PageHeader from "../../components/utility/pageHeader";
import IntlMessages from '../../components/utility/intlMessages';
import Transaction from './transactions'


export default class Transactions extends Component {


    render() {

        return (
            <LayoutContentWrapper style={{}}>
                <PageHeader><IntlMessages id="wallet.transactions"/></PageHeader>
                <LayoutContent><Transaction></Transaction></LayoutContent>

            </LayoutContentWrapper>
        );
    }
}
