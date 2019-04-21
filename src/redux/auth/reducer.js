import actions from './actions';

const initState = {
    accessToken: null,
    profile: null,
    isAdmin: false,
    isMember: false,
    isGuest: false,
    isApplicant: false
};

export default function authReducer(state = initState, action) {
    switch (action.type) {
        case actions.LOGIN_SUCCESS:
            // noinspection UnterminatedStatementJS
            return Object.assign({}, state, {
                accessToken: action.accessToken,
                profile: action.profile,
                isMember: action.profile.role === 'member',
                isGuest: action.profile.role === 'guest',
                isAdmin: action.profile.role === 'admin',
                isApplicant: action.profile.role === 'applicant'
            });
        case actions.UPDATE_AUTH_PROFILE:
            // noinspection UnterminatedStatementJS
            if (state.profile.role !== action.profile.role) {
                actions.logout();
            }
            return Object.assign({}, state, {profile: Object.assign({}, state.profile, action.profile)});
        case actions.LOGOUT:
            return initState;
        default:
            return state;
    }
}
