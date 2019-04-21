import React from 'react';
import {language} from "../../settings";
import IntlMessages from '../../components/utility/intlMessages';
import englishLang from "../../image/flag/uk.svg";
import chineseLang from "../../image/flag/china.svg";

const config = {
    defaultLanguage: language,
    options: [
        {
            languageId: "english",
            translateId: <IntlMessages id="language.english" />,
            locale: "en",
            text: "English",
            icon: englishLang
        },
        {
            languageId: "chinese",
            translateId: <IntlMessages id="language.chinese" />,
            locale: "zh",
            text: "Chinese",
            icon: chineseLang
        }
    ]
};

export function getCurrentLanguage(lang) {
    let selecetedLanguage = config.options[0];
    config.options.forEach(language => {
        if (language.languageId === lang) {
            selecetedLanguage = language;
        }
    });
    return selecetedLanguage;
}

export default config;


/*
,
        {
            languageId: "malay",
            locale: "my",
            text: "Malay",
            icon: malayLang
        },
        {
            languageId: "japanese",
            locale: "ja",
            text: "Japanese",
            icon: japaneseLang
        }
 */
