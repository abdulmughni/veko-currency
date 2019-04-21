import React, {Component} from "react";
import {connect} from "react-redux";
import {Layout} from "antd";
import appActions from "../../redux/app/actions";
import TopbarUser from "./topbarUser";
import TopbarWrapper from "./topbar.style";
import themes from "../../settings/themes";
import {themeConfig} from "../../settings";

import TopbarNotification from './topbarNotification';
import TopbarMessage from './topbarMessage';
import LanguageSwitch from '../LanguageSwitcher/LanguageSwitch'

const {Header} = Layout;
const {toggleCollapsed} = appActions;
const customizedTheme = themes[themeConfig.theme];

class Topbar extends Component {
    breakPoint = {
        mobile: 500
    };

    render() {
        const {toggleCollapsed, locale, wallets, user} = this.props;
        const collapsed = this.props.collapsed && !this.props.openDrawer;
        const styling = {
            background: customizedTheme.backgroundColor,
            position: "fixed",
            width: "100%",
            height: 70
        };

        return (
            <TopbarWrapper>
                <Header
                    style={styling}
                    className={
                        collapsed ? "isomorphicTopbar collapsed" : "isomorphicTopbar"
                    }
                >
                    <div className="isoLeft">
                        <button
                            className={
                                collapsed ? "triggerBtn menuCollapsed" : "triggerBtn menuOpen"
                            }
                            style={{color: customizedTheme.textColor}}
                            onClick={toggleCollapsed}
                        />
                    </div>

                    <ul className="isoRight">
                        <li className="isoSearch">
                            <LanguageSwitch/>

                        </li>
                        {
                            (user.role !== 'admin' && window.innerWidth >= 500)
                            &&
                            <li
                                onClick={() => this.setState({selectedItem: 'cash'})}
                                className="isoNotify desktopView"
                            >
                                <i
                                    className="ion-social-usd"
                                />
                                <span
                                    style={{
                                        marginLeft: '3px',
                                        fontSize: 25,
                                        lineHeight: 1.5
                                    }}>{wallets.cash.balance.toFixed(2)}</span>

                            </li>
                        }

                        {
                            (user.role !== 'admin' && window.innerWidth >= 500)
                            &&
                            <li
                                onClick={() => this.setState({selectedItem: 'cash'})}
                                className="isoNotify desktopView"
                            >
                                <i
                                    className="veko-icon-topBar"
                                />
                                <span
                                    style={{
                                        marginLeft: '3px',
                                        fontSize: 25,
                                        lineHeight: 1.5
                                    }}>{wallets.veko.balance.toFixed(3)}</span>

                            </li>
                        }
                        <li
                            onClick={() => this.setState({selectedItem: 'notification'})}
                            className="isoNotify"
                        >
                            <TopbarNotification locale={locale}/>
                        </li>

                        <li
                            onClick={() => this.setState({selectedItem: 'message'})}
                            className="isoMsg"
                        >
                            <TopbarMessage locale={locale}/>
                        </li>

                        <li
                            onClick={() => this.setState({selectedItem: "user"})}
                            className="isoUser"
                        >
                            <TopbarUser/>
                        </li>
                    </ul>
                </Header>
            </TopbarWrapper>
        );
    }
}

export default connect(
    state => ({
        ...state.App.toJS(),
        wallets: state.Wallets,
        user: state.Auth.profile
    }),
    {toggleCollapsed}
)(Topbar);
