const options = [
    {
        key: "",
        label: "sidebar.home",
        leftIcon: "ion-flash"
    },
    {
        key: 'profile',
        label: "sidebar.myProfile",
        leftIcon: 'ion-person',
        children: [
            {
                key: 'profile/settings',
                label: 'sidebar.settings'
            },
            {
                key: 'profile/reset-password',
                label: 'sidebar.resetPassword'
            }/*,
            {
                key: 'profile/security-password',
                label: 'sidebar.securityPassword'
            } */
        ]
    },
    {
        key: 'trade-market',
        label: 'sidebar.exchange',
        leftIcon: 'ion-arrow-graph-up-right',
        children: [
            {
                key: 'trade-market/buy-sell',
                label: "sidebar.buySell"
            }/* ,
            {
                key: 'trade-market/bidding',
                label: "bidding.title"
            } ,
            {
                key: 'trade-market/buy-in-record',
                label: "sidebar.buyInRecord"
            },
            {
                key: 'trade-market/sell-out-record',
                label: 'sidebar.sellOutRecord'
            },
            {
                key: 'trade-market/portfolio-history',
                label: "sidebar.portfolioHistory"
            },

             {
             key: 'upgrade',
             label: 'sidebar.upgrade',
             }*/

        ]
    },
    {
        key: "network",
        label: "sidebar.network",
        leftIcon: "ion-android-menu",
        children: [
            {
                key: 'tree',
                label: "sidebar.genealogy-tree"
            },
            {
                key: 'register-member',
                label: "sidebar.registermember"
            },
            {
                key: 'sponsored-members',
                label: 'sidebar.sponsoredmembers'
            },
            {
                key: 'bonuses',
                label: "sidebar.bonuses"
            }
            /*
           {
               key: 'upgrade',
               label: 'sidebar.upgrade',
           }*/

        ]
    },

    // {
    //     key: 'ewallets',
    //     label: "sidebar.ewallets",
    //     leftIcon: 'ion-ios-barcode',
    //     children: [
    //         {
    //             key: 'wallets/transactions',
    //             label: 'sidebar.transactions'
    //         }
    //     ]
    // },

    {
        key: 'transfer',
        label: "sidebar.transferMain",
        leftIcon: 'ion-arrow-swap',
        children: [
            {
                key: 'transfer/deposit',
                label: "sidebar.deposit"
            },
            {
                key: 'transfer/withdraw',
                label: 'sidebar.withdraw'
            },
            {
                key: 'transfer/transfer',
                label: 'sidebar.transfer'
            },
            {
                key: 'transactions',
                label: 'sidebar.transactions'
            }
        ]
    },
    {
        key: 'announcement',
        label: 'sidebar.announcement',
        leftIcon: 'ion-android-volume-up'
    },
    {
      key: 'help',
      label: 'sidebar.help',
      leftIcon: 'ion-help',
      children: [
          {
            key: 'help/create-ticket',
            label: 'sidebar.createTicket'
          },
          {
            key: 'help/tickets',
            label: 'sidebar.allTickets'
          }
      ]
    } /*,
    {
        key: 'send-mail',
        label: 'sidebar.sendMail',
        leftIcon: 'ion-email'
    }*/

    /*
    {
        key: 'trade',
        label: 'sidebar.trade',
        leftIcon: 'ion-arrow-graph-up-right'
    }*/
    // {
    //     key: 'bonuses',
    //     label: "sidebar.bonuses",
    //     leftIcon: 'ion-ios-box',
    //     children: [
    //         {
    //             key: 'bonuses/sponsorship',
    //             label: "wallet.sponsorshipBonus"
    //         },
    //         {
    //             key: 'bonuses/leadership',
    //             label: 'wallet.leadershipBonus'
    //         },
    //         {
    //             key: 'bonuses/pairing',
    //             label: 'wallet.pairingBonus'
    //         },
    //         {
    //             key: 'bonuses/powerstart',
    //             label: 'wallet.faststartBonus'
    //         },
    //         {
    //             key: 'bonuses/re-entry',
    //             label: 'wallet.reentryBonus'
    //         }
    //     ]
    // },

];
export default options;
