import React, {Component} from 'react';
import {connect} from 'react-redux';
import actions from '../../redux/languageSwitcher/actions';
import config from './config';
import {Popover, Row, Icon} from 'antd';
import "../App/global.css"

const {changeLanguage} = actions;

class LanguageSwitcher extends Component {

    content = <div className="themeSwitchBtnWrapper">
        {
            config.options.map(option => {
                //console.log(option);
                const {changeLanguage} = this.props;
                const {languageId, icon} = option;

                return (
                    <Row>
                        <img height={'30px'} key={languageId} width={'35px'} onClick={() => {
                            changeLanguage(languageId);
                        }} src={process.env.PUBLIC_URL + icon} alt="flag"/>

                    </Row>

                );
            })}
    </div>

    render() {
        const {
            language,
        } = this.props;
        let icon;
        let changedLanguage;
        config.options.forEach(option => {
            if (option.languageId === language.languageId) {
                icon = option.translateId;
                changedLanguage = option.languageId;
            }
        });


        return (
            <div className="isoButtonWrapper">
                <Popover content={this.content} trigger="click">
                    <div style={{fontSize: 15, letterSpacing: 1, textTransform: 'capitalize'}}>
                        {changedLanguage === "chinese" ? <span style={{ fontWeight: 'bold', fontSize: 17 }}>{icon}</span> : icon}
                        <Icon className="languageArrow" type="down" />
                    </div>
                </Popover>

            </div>
        );
    }
}

export default connect(
    state => ({
        ...state.LanguageSwitcher
    }),
    {changeLanguage}
)(LanguageSwitcher);
