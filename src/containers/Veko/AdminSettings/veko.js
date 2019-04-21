import React, {Component} from 'react';
import {connect} from 'react-redux';

export class Veko extends Component {
    render() {
        return (
            <div>hello veko</div>
        )
    }
}

export default connect(state => ({
    ...state.Veko.toJS(),
    user: state.Auth.profile,
    wallets: state.Wallets
}))(Veko)