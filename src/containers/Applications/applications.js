import React, {Component} from 'react'
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import PageHeader from "../../components/utility/pageHeader";
import Applications from './index'

export default class Application extends Component {
    render() {
        return (
            <LayoutContentWrapper style={{}}>
                <PageHeader>Applications</PageHeader>
                <LayoutContent>
                    <Applications></Applications>
                </LayoutContent>

            </LayoutContentWrapper>
        );
    }
}