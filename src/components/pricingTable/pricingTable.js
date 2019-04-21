/**
 * Created by Mughni on 6/21/2018.
 */
import React, {Component} from 'react';
import IntlMessages from '../utility/intlMessages';
import {connect} from 'react-redux';
import './custom.css';

export class PricingTable extends Component {
    selectPackage = (id) => {
        const {packageChange} = this.props;
        packageChange(id);
    };
    defaultButtons = (item, selectedId) => {
        if (selectedId === item._id) {
            return <button className="button is-fullwidth" disabled="disabled"><IntlMessages id="member.register-member.currentPlan"/></button>;
        } else {
            return <button onClick={e => this.selectPackage(item._id)} className="button is-fullwidth"><IntlMessages id="wallet.choose" /></button>
        }
    };



    render() {
        let {leadershipBonus, sponsorshipBonus, pairingBonus, faststartBonus, leadershipLevels, maxLevelBonus} = '';
        const {language} = this.props;

        if(language.languageId === 'english') { leadershipBonus = "Leadership Bonus"; }
        if(language.languageId === 'chinese') { leadershipBonus = "领袖奖金"; }

        if(language.languageId === 'english') { sponsorshipBonus = "Sponsorship Bonus"; }
        if(language.languageId === 'chinese') { sponsorshipBonus = "推荐奖金"; }

        if(language.languageId === 'english') { pairingBonus = "Pairing Bonus"; }
        if(language.languageId === 'chinese') { pairingBonus = "对碰奖金"; }

        if(language.languageId === 'english') { faststartBonus = "Power Start Bonus"; }
        if(language.languageId === 'chinese') { faststartBonus = "快速启动奖金"; }

        if(language.languageId === 'english') { leadershipLevels = "Leadership Levels"; }
        if(language.languageId === 'chinese') { leadershipLevels = "领袖奖层级"; }

        if(language.languageId === 'english') { maxLevelBonus = "Max Level Bonus"; }
        if(language.languageId === 'chinese') { maxLevelBonus = "对碰层封顶"; }


        const {data, selectedId} = this.props;
        const plans = data.map(item =>
            <div key={item._id} className={"pricing-plan " + (item._id === selectedId ? "is-active" : '')}>
                <div className={"plan-header"}>{item.title}</div>
                <div className={"plan-price"}><span className="plan-price-amount"><span
                    className="plan-price-currency">$</span>{item.value}</span></div>
                <div className={"plan-items"}>
                    <div className={"plan-item"} data-feature={leadershipBonus}>{item.leadership} %</div>
                    <div className={"plan-item"} data-feature={sponsorshipBonus}>{item.sponsor} %</div>
                    <div className={"plan-item"} data-feature={pairingBonus}>{item.pairing} %</div>
                    <div className={"plan-item"} data-feature={faststartBonus}>{item.fast} %</div>
                    <div className={"plan-item"} data-feature={leadershipLevels}>{item.leaderlevels}</div>
                    <div className={"plan-item"} data-feature={maxLevelBonus}>$ {item.levelcap}</div>
                </div>
                <div className="plan-footer">
                    {this.defaultButtons(item, selectedId)}
                </div>

            </div>
        );
        return (
            <div className="pricing-table is-comparative">
                <div className="pricing-plan is-features">
                    <div className="plan-header"><IntlMessages id="package.features"/></div>
                    <div className="plan-price"><span className="plan-price-amount">&nbsp;</span></div>
                    <div className="plan-items">
                        <div className="plan-item"><IntlMessages id="wallet.leadershipBonus"/></div>
                        <div className="plan-item"><IntlMessages id="wallet.sponsorshipBonus"/></div>
                        <div className="plan-item"><IntlMessages id="wallet.pairingBonus"/></div>
                        <div className="plan-item"><IntlMessages id="wallet.faststartBonus"/></div>
                        <div className="plan-item"><IntlMessages id="wallet.leadershipLevels"/></div>
                        <div className="plan-item"><IntlMessages id="wallet.maxLevelBonus"/></div>
                    </div>
                </div>

                {plans}


            </div>
        )
    }
}

export default connect(
    state => ({
        ...state.LanguageSwitcher
    }),
    {}
)(PricingTable);
