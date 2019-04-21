import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import NewMember from '../../components/memberSignup/memberSignup'

export default class extends Component {
    render() {
        return (
            <LayoutContentWrapper style={{}}>
                <LayoutContent>
                    <NewMember />
                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}
