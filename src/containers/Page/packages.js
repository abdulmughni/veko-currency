import React, { Component } from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import PageHeader from "../../components/utility/pageHeader";


export default class extends Component {
    render() {
        return (
            <LayoutContentWrapper style={{ height: '100vh' }}>
                <PageHeader>Packages</PageHeader>
                <LayoutContent>
                    <h1>Packages</h1>
                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}
