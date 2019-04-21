import React from 'react';
import io from 'socket.io-client';
//import process from 'os';
import feathers from '@feathersjs/client';
import IntlMessages from '../components/utility/intlMessages';

let apiUrl = '';
if (process.env.NODE_ENV === 'development') {
    //apiUrl = 'http://localhost:3030'
    apiUrl = 'https://veko-dev-api.dev.genesoft.org'
}
const socket = io(apiUrl, {
    transports: ['websocket']
});
// @feathersjs/client is exposed as the `feathers` global.
const app = feathers();

app.configure(feathers.socketio(socket));
app.configure(feathers.authentication({storage: localStorage}));
const Client = app;

export default {
    apiUrl
};


const siteConfig = {
    siteName: <IntlMessages id="logo.veko"/>,
    siteIcon: 'ion-flash',
    footerText: <IntlMessages id="veko.footerText"/>,
    termsTest: <a href="https://s3-ap-southeast-1.amazonaws.com/veko/Veko+Term+%26+Condition.pdf" target="_blank"
                  rel='noopener noreferrer'><IntlMessages id="veko.termsConditions"/></a>
};
const themeConfig = {
    topbar: 'themedefault',
    sidebar: 'themedefault',
    layout: 'themedefault',
    theme: 'themedefault',
};
const language = 'english';
export {
    app,
    siteConfig,
    language,
    themeConfig,
    apiUrl,
    Client
};
