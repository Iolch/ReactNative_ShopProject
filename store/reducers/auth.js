import {LOGIN_USER, SINGUP_USER} from '../actions/auth';
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