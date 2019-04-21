import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {message, Icon, Tooltip, Button} from 'antd';
import IntlMessages from '../../components/utility/intlMessages';
import {
    FacebookShareButton,
    GooglePlusShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    PinterestShareButton,
} from 'react-share';

import {
    FacebookIcon,
    TwitterIcon,
    WhatsappIcon,
    GooglePlusIcon,
    LinkedinIcon,
    PinterestIcon,
} from 'react-share';

class SocialShareButtons extends React.Component {
    state = {
        value: this.props.share,
        copied: false,
    };

    render() {
        const shareUrl = this.props.share;
        const shareTitle = 'EKO - Next Generation Cryptocurrency with guaranteed ROI';
        const shareDescription = 'Veko is a decentralized Cryptocurrency with limited supply and guaranteed ROI. With the highest level of transparency and security through Blockchain and distributed ledger. Veko is exchangeable from the date of its pre-ICO and usable widely on the internet.';
        return (
            <div className="wrapper-share-box">
                <div className="share-box">
                    <CopyToClipboard text={this.props.share}
                                     onCopy={() => this.setState({copied: true})}>
                        <Tooltip title={<IntlMessages id="dashboard.clickToCopy"/>}>
                            <Button onClick={() => message.success('Copied')}>
                                <Icon type="copy" />
                                <IntlMessages id="dashboard.invite"/>
                            </Button>

                        </Tooltip>
                    </CopyToClipboard>

                    <FacebookShareButton url={shareUrl} quote={shareTitle}>
                        <FacebookIcon size={32} round={true}/>
                    </FacebookShareButton>

                    <TwitterShareButton url={shareUrl} title={shareTitle} via={shareDescription}>
                        <TwitterIcon size={32} round={true}/>
                    </TwitterShareButton>

                    <WhatsappShareButton url={shareUrl}>
                        <WhatsappIcon size={32} round={true}/>
                    </WhatsappShareButton>

                    <GooglePlusShareButton url={shareUrl}>
                        <GooglePlusIcon size={32} round={true}/>
                    </GooglePlusShareButton>

                    <LinkedinShareButton url={shareUrl} title={shareTitle} description={shareDescription}>
                        <LinkedinIcon size={32} round={true}/>
                    </LinkedinShareButton>

                    <PinterestShareButton url={shareUrl} description={shareDescription}>
                        <PinterestIcon size={32} round={true}/>
                    </PinterestShareButton>
                </div>
            </div>
        );
    }
}

export default SocialShareButtons;