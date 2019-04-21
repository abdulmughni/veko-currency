import React, {Component} from "react";
import {Route} from "react-router-dom";
import asyncComponent from "../../helpers/AsyncFunc";

const adminRoutes = [
    {
        path: '',
        exact: true,
        component: asyncComponent(() => import('../dashboard'))
    },
    {
        path: 'packages',
        exact: true,
        component: asyncComponent(() => import('../admin/Packages/Packages'))
    },
    {
        path: 'packages/create',
        exact: true,
        component: asyncComponent(() => import('../admin/Packages/PackageForm'))
    },
    {
        path: 'accounts',
        exact: true,
        component: asyncComponent(() => import('../accounts/index'))
    },
    {
        path: 'applications',
        component: asyncComponent(() => import('../Applications/applications'))
    },
    {
        path: 'transactions',
        component: asyncComponent(() => import('../Transactions'))
    }
    ,
    {
        path: 'exchange',
        component: asyncComponent(() => import('../Veko/AdminSettings'))
    },
    {
        path: "wallets",
        component: asyncComponent(() => import('../Wallets/wallets'))
    },
    {
        path: "adjustments",
        component: asyncComponent(() => import('../Adjustments'))
    },

    {
        path: "trade-market/bidding",
        component: asyncComponent(() => import('../bidding/index'))
    },
    {
        path: "help/all-tickets",
        component: asyncComponent(() => import('../help/AllTickets'))
    },    
    {
        path: "help/ticket-chat/:id",
        component: asyncComponent(() => import('../help/TicketChat'))
    },
    {
        path: "help/tickets",
        component: asyncComponent(() => import('../help/RelatedCategoryTickets'))
    }
];
const memberRoutes = [
    {
        path: '',
        component: asyncComponent(() => import('../Page/member'))
    },
    {
        path: 'trade-market/buy-sell',
        component: asyncComponent(() => import('../Veko/Exchange/Exchange'))
    },
    {
        path: "tree",
        component: asyncComponent(() => import("../Network/tree"))
    },
    {
        path: "register-member",
        component: asyncComponent(() => import("../Network/add-member"))
    },
    {
        path: "sponsored-members",
        component: asyncComponent(() => import('../accounts/index'))
    },
    {
        path: "upgrade",
        component: asyncComponent(() => import('../Network/upgrade'))
    },
    {
        path: "referred-members",
        component: asyncComponent(() => import('../Network/referred-members'))
    },
    {
        path: "transfer/deposit",
        component: asyncComponent(() => import('../Transfer/deposit'))
    },
    {
        path: "transfer/withdraw",
        component: asyncComponent(() => import('../Transfer/withdraw'))
    },
    {
        path: "transfer/transfer",
        component: asyncComponent(() => import('../Transfer/transfer'))
    },
    {
        path: "bonuses",
        component: asyncComponent(() => import('../Bonuses/bonuses'))
    },
    {
        path: "bonuses/sponsorship",
        component: asyncComponent(() => import('../Bonuses/sponsorship'))
    },
    {
        path: "bonuses/leadership",
        component: asyncComponent(() => import('../Bonuses/leadership'))
    },
    {
        path: "bonuses/pairing",
        component: asyncComponent(() => import('../Bonuses/pairing'))
    },
    {
        path: "bonuses/powerstart",
        component: asyncComponent(() => import('../Bonuses/fastStart'))
    },
    {
        path: "bonuses/re-entry",
        component: asyncComponent(() => import('../Bonuses/reentry'))
    },
    {
        path: "trade-market/bidding",
        component: asyncComponent(() => import('../bidding/index'))
    },
    {
        path: "transactions",
        component: asyncComponent(() => import('../Transfer/Transactions'))
    },

    {
        path: "profile/settings",
        component: asyncComponent(() => import('../settings/settings'))
    },
    {
        path: 'profile/reset-password',
        component: asyncComponent(() => import('../settings/changePassword'))
    },

    {
        path: "announcement",
        component: asyncComponent(() => import('../Announcement/Announcements'))
    },
    {
        path: "trade-market/portfolio-history",
        component: asyncComponent(() => import('../PorfolioHistory/PortfolioHistory'))
    },
    {
        path: "trade-market/buy-in-record",
        component: asyncComponent(() => import('../Records/BuyInRecords'))
    },
    {
        path: "trade-market/sell-out-record",
        component: asyncComponent(() => import('../Records/SellOutRecords'))
    },
    {
        path: "send-mail",
        component: asyncComponent(() => import('../SendEmail/SendMail'))
    },

    {
        path: "help/create-ticket",
        component: asyncComponent(() => import('../help/ShowCreateTicket'))
    },
    {
        path: "help/tickets",
        component: asyncComponent(() => import('../help/AllTickets'))
    },
    {
        path: "help/ticket-chat/:id",
        component: asyncComponent(() => import('../help/TicketChat'))
    }
];


export default class AppRouter extends Component {
    render() {

        const {url, style, profile} = this.props;
        const routes = profile.role === 'admin' ? adminRoutes : memberRoutes;

        return (
            <div style={style}>
                {routes.map(singleRoute => {
                    const {path, exact, ...otherProps} = singleRoute;
                    return (
                        <Route
                            exact={exact !== false}
                            key={singleRoute.path}
                            path={`${url}/${singleRoute.path}`}
                            {...otherProps}
                        />
                    );
                })}
            </div>
        );
    }
}
