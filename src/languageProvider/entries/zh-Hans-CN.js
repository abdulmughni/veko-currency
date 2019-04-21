import antdZH from 'antd/lib/locale-provider/zh_CN';
import appLocaleData from 'react-intl/locale-data/zh';
import zhMessages from '../locales/zh-Hans.json';

const ZhLan = {
    messages: {
        ...zhMessages
    },
    antd: antdZH,
    locale: 'zh-Hans',
    data: appLocaleData
};
export default ZhLan;
