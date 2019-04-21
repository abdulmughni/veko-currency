import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import IntlMessages from '../../components/utility/intlMessages';
import PageHeader from '../../components/utility/pageHeader';

export default class ShowSellRecords extends Component {
    render() {
        return(
            <LayoutContentWrapper style={{padding: '40px 20px'}}>
                <PageHeader><IntlMessages id="sidebar.sellOutRecord"/></PageHeader>
                <LayoutContent>

                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}