import React, {Component} from 'react';
import { Document, Page } from 'react-pdf';
import LayoutContentWrapper from '../../components/utility/layoutWrapper';
import LayoutContent from '../../components/utility/layoutContent';
import {Row, Col, Icon, Modal, Button} from "antd";
import IsoWidgetsWrapper from "../../components/Widgets/widgets-wrapper";
import basicStyle from "../../settings/basicStyle";
import StickerWidget from "../../components/Widgets/sticker/sticker-widget";
import {connect} from 'react-redux';
import Moment from 'react-moment';
import statsActions from '../../redux/stats/actions';
import SocialShare from '../../components/socialShare/socialShare';
import IntlMessages from '../../components/utility/intlMessages';
import PageHeader from '../../components/utility/pageHeader';
import Announcements from '../../components/Announcements/announcements';

const {stats} = statsActions;

export class MemberDash extends Component {
    state = {
        fileList: [],

        announceVisible: false,
        termsVisible: true,

        numPages: null,
        pageNumber: 1
    }

    onDocumentLoad = ({ numPages }) => {
      this.setState({ numPages });
    }

    alreadyRead = () => {
        this.setState({
            announceVisible: false
        });

        localStorage.setItem("alreadyRead", "Already Read");
    };

    termClosed = () => {
       this.setState({
           termsVisible: false
       });
       this.setState({
           announceVisible: true
       });

       localStorage.setItem("termsAccept", "Terms and Conditions Accepted");
    }

    componentWillMount() {

        const {stats, id} = this.props;
        stats(id)
    }


    render() {
        const { pageNumber, numPages } = this.state;
        //console.log(this.props.history.location);
        const {rowStyle, colStyle} = basicStyle;
        const {veko, cash, team, teamSales, user, special, consumption} = this.props;
        return (
            <LayoutContentWrapper style={{padding: '40px 20px'}}>
                <Row type={'flex'} style={{width: '100%', textAlign: 'center'}} gutter={6} justify={'space-around'}>
                    {
                        user.firstname
                        &&
                        <Col style={{marginBottom: '20px',}}>
                            <Row>
                                <Col style={{fontSize: '20px'}}>{`${user.firstname} ${user.lastname}`}</Col>
                                <Col><IntlMessages id="dashboard.title"/></Col>
                            </Row>
                        </Col>

                    }

                    <Col style={{marginBottom: '20px',}}>
                        <Row>
                            <Col style={{fontSize: '20px'}}>{`${user.package.title} ($ ${user.package.value})`}</Col>
                            <Col><IntlMessages id="dashboard.package"/></Col>
                        </Row>
                    </Col>
                    <Col style={{marginBottom: '20px',}}>
                        <Row>
                            <Col style={{fontSize: '20px'}}><Moment format="DD MMM YY - HH:mm">
                                {user.membershipDate}
                            </Moment></Col>
                            <Col><IntlMessages id="dashboard.membershipDate"/></Col>
                        </Row>
                    </Col>
                    {
                        user.sponsorId
                        &&
                        <Col style={{marginBottom: '20px',}}>
                            <Row>
                                <Col style={{fontSize: '20px'}}>{user.sponsorId}</Col>
                                <Col><IntlMessages id="member.register-member.sponsor" /></Col>
                            </Row>
                        </Col>
                    }

                </Row>

                <LayoutContent className={'dashboardBoxLayout'}>
                    <Row style={rowStyle} gutter={0} justify="start">

                        <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                {/* Sticker Widget */}
                                <StickerWidget
                                    number={veko.toFixed(3)}
                                    text={<IntlMessages id="dashboard.vekoWallet"/>}
                                    icon="veko-icon"
                                    fontColor="#ffffff"
                                    bgColor="#42A5F6"
                                />
                            </IsoWidgetsWrapper>
                        </Col>

                        <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                {/* Sticker Widget */}
                                <StickerWidget
                                    number={'$' + cash.toFixed(2)}
                                    text={<IntlMessages id="dashboard.cashWallet"/>}
                                    icon="ion-cash"
                                    fontColor="#ffffff"
                                    bgColor="#7ED320"
                                />
                            </IsoWidgetsWrapper>
                        </Col>
                        {
                            special && special > 0
                            &&
                            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
                                <IsoWidgetsWrapper>
                                    {/* Sticker Widget */}
                                    <StickerWidget
                                        number={'$' + special.toFixed(2)}
                                        text={<IntlMessages id="dashboard.specialWallet"/>}
                                        icon="ion-social-usd"
                                        fontColor="#ffffff"
                                        bgColor="#417af4"
                                    />
                                </IsoWidgetsWrapper>
                            </Col>
                        }
                        {
                            consumption && consumption > 0
                            &&
                            <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
                                <IsoWidgetsWrapper>
                                    {/* Sticker Widget */}
                                    <StickerWidget
                                        number={consumption.toFixed(2)}
                                        text={<IntlMessages id="dashboard.consumption"/>}
                                        icon="ion-logo-usd"
                                        fontColor="#ffffff"
                                        bgColor="#f47641"
                                    />
                                </IsoWidgetsWrapper>
                            </Col>
                        }
                        <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                {/* Sticker Widget */}
                                <StickerWidget
                                    number={team}
                                    text={<IntlMessages id="dashboard.teamMembers"/>}
                                    icon="ion-ios-people"
                                    fontColor="#ffffff"
                                    bgColor="#7266BA"
                                />
                            </IsoWidgetsWrapper>
                        </Col>
                        <Col lg={6} md={12} sm={12} xs={24} style={colStyle}>
                            <IsoWidgetsWrapper>
                                {/* Sticker Widget */}
                                <StickerWidget
                                    number={'$ ' + teamSales}
                                    text={<IntlMessages id="dashboard.teamSales"/>}
                                    icon="ion-ios-people"
                                    fontColor="#ffffff"
                                    bgColor="#f4a742"
                                />
                            </IsoWidgetsWrapper>
                        </Col>

                    </Row>
                    <Row>
                        <SocialShare share={`https://veko.io/?r=${this.props.id}`}/>
                    </Row>

                    {
                      !localStorage.getItem("alreadyRead")
                      &&
                      <div>
                          <Modal
                              visible={this.state.announceVisible}
                              footer={false}
                              destroyOnClose={true}
                              closable={false}
                          >
                              <div style={{textAlign: 'center', padding: '15px 0px 15px'}}>
                                  <Icon type="sound" style={{
                                      transform: 'rotate(320deg)',
                                      fontSize: 60,
                                      marginBottom: 20,
                                      color: '#1890ff'
                                  }}/>
                                  <h3 style={{fontSize: 22}}><IntlMessages id="dashboard.popupTitle"/></h3>
                                  <p style={{fontSize: 16, lineHeight: '30px'}}>Congratulations!, We had successfully
                                      achieved our FIRST SPLIT within 1.5 months, and now toward the SECOND SPLIT
                                      恭喜大家！短短一个半月，我们已经成功达到第一次拆分。而且也迅速迈向第二次拆分

                                  </p>
                                  <Button onClick={this.alreadyRead} type="primary" style={{marginTop: 20}}><IntlMessages
                                      id="dashboard.popupButton"/></Button>
                              </div>
                          </Modal>
                      </div>
                    }

                    {
                      !localStorage.getItem('termsAccept')
                      &&
                      <div>
                          <Modal
                              visible={this.state.termsVisible}
                              footer={false}
                              destroyOnClose={true}
                              closable={false}
                              className="termsPopup"
                          >
                              <div style={{textAlign: 'center', padding: '15px 0px 15px'}}>
                                  <h3 style={{fontSize: 22}}><IntlMessages id="veko.termsConditions"/></h3>
                                  <Document
                                    file="https://s3-ap-southeast-1.amazonaws.com/veko/Veko+Term+%26+Condition.pdf"
                                    onLoadSuccess={this.onDocumentLoad}
                                  >
                                    <Page pageNumber={pageNumber} />
                                  </Document>
                                  <p>Page {pageNumber} of {numPages}</p>
                                  <iframe src="https://s3-ap-southeast-1.amazonaws.com/veko/Veko+Term+%26+Condition.pdf" className={'pdfFile'} frameborder="0"></iframe>
                                  <Button onClick={this.termClosed} type="primary" style={{marginTop: 20}}><IntlMessages id="veko.iAccept"/></Button>
                              </div>
                          </Modal>
                      </div>
                    }

                </LayoutContent>

                <PageHeader><IntlMessages id="dashboard.announcements"/></PageHeader>
                <LayoutContent><Announcements/></LayoutContent>
            </LayoutContentWrapper>
        );
    }
}

export default connect(state => ({
    veko: state.Wallets.veko.balance,
    // consumption: state.Wallets.consumption.balance,
    // special: state.Wallets.special.balance,
    cash: state.Wallets.cash.balance,
    special: state.Wallets.special.balance,
    consumption: state.Wallets.consumption.balance,
    team: state.Stats.team,
    teamSales: state.Stats.teamSales,
    id: state.Auth.profile._id,
    user: state.Auth.profile
}), {stats})(MemberDash);
