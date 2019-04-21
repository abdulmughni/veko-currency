import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import {connect} from 'react-redux';

import { LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';

import {AppLocale} from './dashApp';


import App from './containers/App/App';
import Applicant from './containers/Page/applicant';
import Guest from './containers/Page/guest';
import asyncComponent from './helpers/AsyncFunc';

const RestrictedRoute = ({component: Component, isLoggedIn, ...rest}) => (
    <Route
        {...rest}
        render={props => isLoggedIn
            ? <Component {...props} />
            : <Redirect
                to={{
                    pathname: '/signin',
                    state: {from: props.location},
                }}
            />}
    />
);

const userHome = (key) => {
    if (key === 'applicant') {
        return Applicant;
    }
    if (key === 'guest') {
        return Guest;
    }
};
const PublicRoutes = ({history, isLoggedIn, user, isLoaded, locale}) => {
    //console.log(isLoaded);
    const Home = isLoggedIn ? userHome(user.role) : '';
    let routes;
    if (isLoaded) {
        routes = <div>

            <Route
                exact
                path={'/'}
                component={asyncComponent(() => import('./containers/Page/signin'))}
            />
            <Route
                exact
                path={'/signin'}
                component={asyncComponent(() => import('./containers/Page/signin'))}
            />
            <Route
                exact
                path={'/signup'}
                component={asyncComponent(() => import('./containers/Page/signup'))}
            />

            <Route
                exact
                path={'/verify'}
                component={asyncComponent(() => import('./containers/Page/verify'))}
            />
            <Route
                exact
                path={'/forgotpassword'}
                component={asyncComponent(() => import('./containers/Page/forgotPassword'))}
            />
            <Route
                exact
                path={'/resetpassword'}
                component={asyncComponent(() => import('./containers/Page/resetPassword'))}
            />
            <RestrictedRoute
                path="/admin"
                component={App}
                isLoggedIn={isLoggedIn}
            />
            <RestrictedRoute
                path="/member"
                component={App}
                isLoggedIn={isLoggedIn}
            />
            <RestrictedRoute
                path="/home"
                component={Home}
                isLoggedIn={isLoggedIn}
            />

        </div>;
    } else {
        routes = <div>
            <Route
                path={''}
                component={asyncComponent(() => import('./containers/Page/loading'))}
            />
        </div>;
    }

    //const {locale} = this.props;
    const currentAppLocale = AppLocale[locale];
    return (
        <LocaleProvider locale={currentAppLocale.antd}>
            <IntlProvider
                locale={currentAppLocale.locale}
                messages={currentAppLocale.messages}
            >
                <ConnectedRouter history={history}>
                    {routes}
                </ConnectedRouter>
            </IntlProvider>
        </LocaleProvider>
    );
};

export default connect(state => ({
    locale: state.LanguageSwitcher.language.locale,
    isLoggedIn: state.Auth.accessToken !== null,
    user: state.Auth.profile,
    isLoaded: state.App.toJS().isLoaded
}))(PublicRoutes);
