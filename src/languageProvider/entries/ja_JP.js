import appLocaleData from 'react-intl/locale-data/ja';
import saMessages from '../locales/ja_JP.json';

const myLang = {
    messages: {
        ...saMessages
    },
    antd: null,
    locale: 'ja-JP',
    data: appLocaleData
};
export default myLang;
