import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import Announcements from '../../components/Announcements/announcements';
import IntlMessages from '../../components/utility/intlMessages';
import PageHeader from '../../components/utility/pageHeader';

export default class ShowAnnouncements extends Component {
    render() {
        return(
            <LayoutContentWrapper style={{padding: '40px 20px'}}>
                <PageHeader><IntlMessages id="dashboard.announcements"/></PageHeader>
                <LayoutContent>
                    <Announcements/>
                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}