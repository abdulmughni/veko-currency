import Auth from './auth/reducer';
import App from './app/reducer';
import Users from './users/reducer';
import Packages from './packages/reducer';
import Application from './applications/reducer';
import Transaction from './transactions/reducer';
import Adjustment from './adjustments/reducer';
import Tree from './tree/reducer'
import Wallets from './wallets/walletRedux'
import Stats from './stats/reducer';
import Veko from './veko/reducer';
import LanguageSwitcher from './languageSwitcher/reducer';
import ThemeSwitcher from './themeSwitcher/reducer';
import Position from './positions/reducer';
import Tickets from './help/reducer';


export default {
    Auth,
    App,
    LanguageSwitcher,
    Users,
    Packages,
    Application,
    Transaction,
    Tree,
    Stats,
    Wallets,
    Veko,
    Adjustment,
    ThemeSwitcher,
    Position,
    Tickets
};
