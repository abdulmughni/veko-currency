import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import Popover from '../../components/uielements/popover';
import IntlMessages from '../../components/utility/intlMessages';
import authAction from '../../redux/auth/actions';
import TopbarDropdownWrapper from './topbarDropdown.style';

const { logout } = authAction;

class TopbarUser extends Component {
  constructor(props) {
    super(props);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hide = this.hide.bind(this);
    this.state = {
      visible: false
    };
  }
  hide() {
    this.setState({ visible: false });
  }
  handleVisibleChange() {
    this.setState({ visible: !this.state.visible });
  }

  render() {
    const content = (
      <TopbarDropdownWrapper className="isoUserDropdown">
        {
          this.props.profile.role === 'member'
          &&
          <Link to="/member/profile/settings" className="isoDropdownLink">
            <IntlMessages id="themeSwitcher.settings" />
          </Link>
        }

        {
          this.props.profile.role === 'admin'
          &&
          <Link to="/admin" className="isoDropdownLink">
            <IntlMessages id="themeSwitcher.settings" />
          </Link>
        }

        <Link to="/member" className="isoDropdownLink">
          <IntlMessages id="sidebar.feedback" />
        </Link>
        <Link to="/member" className="isoDropdownLink">
          <IntlMessages id="sidebar.help" />
        </Link>
        <Link to="" className="isoDropdownLink" onClick={this.props.logout}>
          <IntlMessages id="topbar.logout" />
        </Link>
      </TopbarDropdownWrapper>
    );

    return (
      <Popover
        content={content}
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        arrowPointAtCenter={true}
        placement="bottomLeft"
      >
        <div style={{ width: 'auto' }} className="isoImgWrapper">
            <span style={{ fontSize: 20, float: 'left' }}>{this.props.profile._id}</span>
            <span style={{ position: 'absolute', top: 15, right: -10 }} className="userActivity online" />
        </div>
      </Popover>
    );
  }
}
export default connect(
    state => ({
        profile: state.Auth.profile
    }), { logout })(TopbarUser);
