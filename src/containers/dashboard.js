import React, {Component} from 'react';
import LayoutContentWrapper from '../components/utility/layoutWrapper';
import LayoutContent from '../components/utility/layoutContent';
import {Row, Col} from "antd";
import IsoWidgetsWrapper from "../components/Widgets/widgets-wrapper";
import basicStyle from "../settings/basicStyle";
import StickerWidget from "../components/Widgets/sticker/sticker-widget";
import {connect} from 'react-redux';
import statsActions from '../redux/stats/actions';
import Announcements from '../components/Announcements/announcements'
import PageHeader from "../components/utility/pageHeader";


const {adminStats} = statsActions;

export class Admin extends Component {
    componentWillMount() {
        const {adminStats, id} = this.props;
        adminStats(id);
    }

    render() {
        const {rowStyle, colStyle} = basicStyle;
        const {applications, members, sales, withdraws, deposits, veko, wallets, special} = this.props;
        return (
            <LayoutContentWrapper>
                <LayoutContent>
                    <Row style={rowStyle} gutter={0} justify="start">
                        <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                {/* Sticker Widget */}
                                <StickerWidget
                                    number={members}
                                    text={'Members'}
                                    icon="ion-ios-people"
                                    fontColor="#ffffff"
                                    bgColor="#7266BA"
                                />
                            </IsoWidgetsWrapper>
                        </Col>

                        <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                {/* Sticker Widget */}
                                <StickerWidget
                                    number={veko.toFixed(2)}
                                    text={'VEKO'}
                                    icon="ion-logo-usd"
                                    fontColor="#ffffff"
                                    bgColor="#42A5F6"
                                />
                            </IsoWidgetsWrapper>
                        </Col>

                        <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                {/* Sticker Widget */}
                                <StickerWidget
                                    number={'$ ' + sales}
                                    text={'Sales'}
                                    icon="ion-ios-usd"
                                    fontColor="#ffffff"
                                    bgColor="#7ED320"
                                />
                            </IsoWidgetsWrapper>
                        </Col>

                        <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                {/* Sticker Widget */}
                                <StickerWidget
                                    number={applications}
                                    text={'Applications'}
                                    icon="info-circle"
                                    fontColor="#ffffff"
                                    bgColor="#f4b942"
                                />
                            </IsoWidgetsWrapper>
                        </Col>
                        <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                {/* Sticker Widget */}
                                <StickerWidget
                                    number={'$' + wallets.toFixed(2)}
                                    text={'Wallets Balance'}

                                    fontColor="#ffffff"
                                    bgColor="#f4b942"
                                />
                            </IsoWidgetsWrapper>
                        </Col>
                        <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                {/* Sticker Widget */}
                                <StickerWidget
                                    number={special.toFixed(2)}
                                    text={'Special Wallets'}
                                    icon="ion-logo-usd"
                                    fontColor="#ffffff"
                                    bgColor="#42A5F6"
                                />
                            </IsoWidgetsWrapper>
                        </Col>
                        <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                {/* Sticker Widget */}
                                <StickerWidget
                                    number={'$ ' + withdraws}
                                    text={'Withdraw'}
                                    icon="ion-ios-usd"
                                    fontColor="#ffffff"
                                    bgColor="#7ED320"
                                />
                            </IsoWidgetsWrapper>
                        </Col>
                        <Col lg={6} md={24} sm={24} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                {/* Sticker Widget */}
                                <StickerWidget
                                    number={deposits}
                                    text={'Deposits'}
                                    icon="ion-logo-usd"
                                    fontColor="#ffffff"
                                    bgColor="#42A5F6"
                                />
                            </IsoWidgetsWrapper>
                        </Col>

                    </Row>
                    <Row>

                    </Row>
                </LayoutContent>

                <PageHeader>Announcements</PageHeader>
                <LayoutContent>
                    <Announcements/>
                </LayoutContent>
            </LayoutContentWrapper>
        );
    }
}

export default connect(state => ({
    ...state.Stats,
    id: state.Auth.profile._id,
    accessToken: state.Auth.accessToken,
    profile: state.Auth.profile,
}), {adminStats})(Admin)
