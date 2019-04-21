import React, {Component} from "react";
import {connect} from "react-redux";
import {Layout, LocaleProvider} from 'antd';
import {IntlProvider} from 'react-intl';
import {Debounce} from "react-throttle";
import WindowResizeListener from "react-window-size-listener";
import {ThemeProvider} from "styled-components";
import authAction from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";
import AppRouter from "./AppRouter";
import {AppLocale} from '../../dashApp';
import {siteConfig} from "../../settings";
import themes from "../../settings/themes";
import {themeConfig} from "../../settings";
import AppHolder from "./commonStyle";
import "./global.css";

const {Content, Footer} = Layout;
const {logout} = authAction;
const {toggleAll} = appActions;

const MINUTES_UNITL_AUTO_LOGOUT = 5; // in mins
const CHECK_INTERVAL = 15000; // in ms
const STORE_KEY = 'lastAction';

export class App extends Component {

    constructor(props) {
        super(props);
        this.check();
        this.initListener();
        this.initInterval();
        this.state = {
            reload: false
        }
    }

    getLastAction() {
        return parseInt(localStorage.getItem(STORE_KEY));
    }

    setLastAction(lastAction: number) {
        localStorage.setItem(STORE_KEY, lastAction.toString());
    }

    initListener() {
        document.body.addEventListener('click', () => this.reset());
        document.body.addEventListener('mouseover', () => this.reset());
        document.body.addEventListener('mouseout', () => this.reset());
        document.body.addEventListener('keydown', () => this.reset());
        document.body.addEventListener('keyup', () => this.reset());
        document.body.addEventListener('keypress', () => this.reset());
    }

    reset() {
        this.setLastAction(Date.now());
    }

    initInterval() {
        setInterval(() => {
            this.check();
        }, CHECK_INTERVAL);
    }

    check() {
        const now = Date.now();
        const timeleft = this.getLastAction() + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
        const diff = timeleft - now;
        const isTimeout = diff < 0;
        if (isTimeout) {
            localStorage.removeItem(STORE_KEY);
            localStorage.removeItem('feathers-jwt');
            window.location.reload(true);
        }
    }


    render() {
        const {url} = this.props.match;
        const {height, profile, role, locale, wallet} = this.props;
        const currentAppLocale = AppLocale[locale];
        return (
            <LocaleProvider locale={currentAppLocale.antd}>
                <IntlProvider
                    locale={currentAppLocale.locale}
                    messages={currentAppLocale.messages}
                >
                    <ThemeProvider theme={themes[themeConfig.theme]}>
                        <AppHolder>
                            <Layout style={{height: "100vh"}}>
                                <Debounce time="1000" handler="onResize">
                                    <WindowResizeListener
                                        onResize={windowSize =>
                                            this.props.toggleAll(
                                                windowSize.windowWidth,
                                                windowSize.windowHeight
                                            )
                                        }
                                    />
                                </Debounce>
                                <Topbar url={url}/>
                                <Layout style={{flexDirection: "row", overflowX: "hidden"}}>
                                    <Sidebar url={url} user={profile} role={role} wallet={wallet}/>
                                    <Layout
                                        className="isoContentMainLayout"
                                        style={{
                                            height: height
                                        }}
                                    >
                                        <Content
                                            className="isomorphicContent"
                                            style={{
                                                padding: "70px 0 0",
                                                flexShrink: "0",
                                                background: "#f1f3f6",
                                                position: "relative"
                                            }}
                                        >
                                            <AppRouter profile={profile} url={url}/>
                                        </Content>
                                        <Footer
                                            style={{
                                                background: "#ffffff",
                                                textAlign: "center",
                                                borderTop: "1px solid #ededed"
                                            }}
                                        >
                                            {siteConfig.footerText} {siteConfig.termsTest}
                                        </Footer>
                                    </Layout>
                                </Layout>
                            </Layout>
                        </AppHolder>
                    </ThemeProvider>

                </IntlProvider>
            </LocaleProvider>
        );
    }
}

export default connect(
    state => ({
        locale: state.LanguageSwitcher.language.locale,
        auth: state.Auth,
        height: state.App.toJS().height,
        profile: state.Auth.profile,
        role: state.Auth.profile.role,
        wallet: state.Wallets
    }),
    {logout, toggleAll}
)(App);
