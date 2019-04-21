import Enlang from './entries/en-US';
import Zhlang from './entries/zh-Hans-CN';
import Mylang from './entries/my_MY';
import Jalang from './entries/ja_JP';
import {addLocaleData} from 'react-intl';

const AppLocale = {
    en: Enlang,
    zh: Zhlang,
    my: Mylang,
    ja: Jalang,
};
addLocaleData(AppLocale.en.data);
addLocaleData(AppLocale.zh.data);
addLocaleData(AppLocale.my.data);
addLocaleData(AppLocale.ja.data);

export default AppLocale;
