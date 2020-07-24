import {LOGIN_USER, SINGUP_USER, LOGOUT_USER} from '../actions/auth';
const initialState = {
    token: null,
    userId: null
};
const AuthReducer = (state=initialState, action) => {
    switch(action.type){
        case LOGIN_USER:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
            };
        case LOGOUT_USER:
            return initialState;
        case SINGUP_USER:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
            };
        default:
            return state;
    }
};
export default AuthReducer;