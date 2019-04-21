/**
 * Created by Mughni on 7/26/2018.
 */
import React, {Component} from 'react';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import PageHeader from "../../components/utility/pageHeader";
import LayoutContent from '../../components/utility/layoutBox';
import { Tabs, Row, Col } from 'antd';
import transactionsActions from '../../redux/transactions/actions';
import {connect} from 'react-redux';
import IntlMessages from '../../components/utility/intlMessages';
import AllBonusesTable from './allBonusesTable';
import SponsorshipTable from "./sponsorshipTable";
import LeadershipTable from "./leadershipTable";
import PairingBonusTable from "./pairingTable";
import FastStartTable from "./fastStartTable";
import ReEntryTable from "./reentryTable";

const TabPane = Tabs.TabPane;
const {findTransaction} = transactionsActions;
class BonusesView extends Component {

    onChange = (e) => {
        //console.log("Here is tab id: " + e);
        this.letFindTrandsction(e)
    }
    state = {
        all: {
            query: {
                $sort: {
                    createdAt: -1
                },
                mainType: 'bonus',

            }
        },
        pairing: {
            query: {
                $sort: {
                    createdAt: -1
                },
                mainType: 'bonus',
                type:'pairing'

            }
        },
        leadership: {
            query: {
                $sort: {
                    createdAt: -1
                },
                mainType: 'bonus',
                type:'leadership'

            }
        },
        powerStart: {
            query: {
                $sort: {
                    createdAt: -1
                },
                mainType: 'bonus',
                type:'powerStart'

            }
        },
        reentry: {
            query: {
                $sort: {
                    createdAt: -1
                },
                mainType: 'bonus',
                type:'reentry'

            }
        },
        sponsorship: {
            query: {
                $sort: {
                    createdAt: -1
                },
                mainType: 'bonus',
                type:'sponsorship'

            }
        }
    };
    letFindTrandsction = (id) => {
        const {findTransaction} = this.props;

        if('1' === id) {
            console.log(id);
            findTransaction({
                query: {
                    ...this.state.all.query
                }
            })
        }

        if('2' === id) {
            findTransaction({
                query: {
                    ...this.state.sponsorship.query
                }
            })
        }

        if('3' === id) {
            findTransaction({
                query: {
                    ...this.state.leadership.query
                }
            })
        }

        if('4' === id) {
            findTransaction({
                query: {
                    ...this.state.pairing.query
                }
            })
        }

        if('5' === id) {
            findTransaction({
                query: {
                    ...this.state.powerStart.query
                }
            })
        }

        if('6' === id) {
            findTransaction({
                query: {
                    ...this.state.reentry.query
                }
            })
        }

    };
    render() {
        return (
            <LayoutContentWrapper>
                <PageHeader><IntlMessages id="sidebar.bonuses"/></PageHeader>

                <Row type='flex' justify="center" style={{width: '100%', marginBottom: '20px'}}>
                    <Col sm={18} xs={24}>
                        <LayoutContent>
                            <Tabs defaultActiveKey="1" onChange={this.onChange} size="large">
                                <TabPane tab={<IntlMessages id="bonuses.all"/>} key="1">
                                    <AllBonusesTable />
                                </TabPane>
                                <TabPane tab={<IntlMessages id="wallet.sponsorshipBonus"/>} key="2"><SponsorshipTable/></TabPane>
                                <TabPane tab={<IntlMessages id="wallet.leadershipBonus"/>} key="3"><LeadershipTable/></TabPane>
                                <TabPane tab={<IntlMessages id="wallet.pairingBonus"/>} key="4"><PairingBonusTable/></TabPane>
                                <TabPane tab={<IntlMessages id="wallet.faststartBonus"/>} key="5"><FastStartTable/></TabPane>
                                <TabPane tab={<IntlMessages id="wallet.reentryBonus"/>} key="6"><ReEntryTable/></TabPane>
                            </Tabs>
                        </LayoutContent>
                    </Col>
                </Row>
            </LayoutContentWrapper>
        );
    }
}

export default connect(state => ({
    transactions: state.Transaction.transactions,
    total: state.Transaction.total,
    user: state.Auth.profile
}), {findTransaction})(BonusesView)
