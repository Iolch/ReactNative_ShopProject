import Strings from '../../constants/Strings';

import AsyncStorage from '@react-native-community/async-storage'; //this allow us to store data even when the app closes

export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER = 'LOGIN_USER';
export const SINGUP_USER = 'SINGUP_USER';

let timer;
export const authenticateUser = (token, userId, expirationDate) => {
    return async dispatch =>{
        dispatch({  type:LOGIN_USER, 
                    token: token, 
                    userId:userId});
    // dispatch(setLogoutTimer(expirationDate));
    }; 
};
export const loginUser = (email, password) => {
    return async dispatch => {
        const response = await fetch (Strings.authUrl+`signInWithPassword?key=${Strings.apiKey}`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({  email: email, 
                                    password: password,
                                    returnSecureToken: true})
        }); 
        if(!response.ok){
            const errorData = await response.json();
            errorHandler(errorData.error.message.split(' ')[0]);
        }

        const responseData = await response.json();
        dispatch({  type: LOGIN_USER, 
                    token: responseData.idToken, 
                    userId: responseData.localId});
        
        const tokenExpirationDate = new Date((new Date()).getTime() + parseInt(responseData.expiresIn) * 1000);
        saveAuthData(responseData.idToken, responseData.localId, tokenExpirationDate);
        // dispatch(setLogoutTimer(parseInt(responseData.exipiresIn)*1000));
    };
};

export const logoutUser = () => {
    clearLogoutTimer();
    AsyncStorage.removeItem('authData');
    return {type: LOGOUT_USER};
};
const clearLogoutTimer = () => {
    if(timer) clearTimeout(timer);
};
const setLogoutTimer = (expirationTime) => {
    return dispatch => {
        timer = setTimeout(() => {
            dispatch(logoutUser());
        }, expirationTime);
    };
};

export const singUpUser = (email, password) => {
    return async dispatch => {

        const response = await fetch (Strings.authUrl+`signUp?key=${Strings.apiKey}`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({  email: email, 
                                    password: password,
                                    returnSecureToken: true})
        });
        if(!response.ok){
            const errorData = await response.json();
            errorHandler(errorData.error.message.split(' ')[0]);
        }
        const responseData = await response.json();
        dispatch({  type: SINGUP_USER, 
                    token: responseData.idToken, 
                    userId: responseData.localId});
        const tokenExpirationDate = new Date(new Date().getTime() + parseInt(responseData.exipiresIn) * 1000);
        saveAuthData(responseData.idToken, responseData.localId, tokenExpirationDate);
        // dispatch(setLogoutTimer(sparseInt(responseData.exipiresIn)*1000));
        
    };
};

const saveAuthData = (token, userId, expirationDate) => {
    AsyncStorage.setItem('authData', 
        JSON.stringify({token:token, userId:userId, expirationDate: expirationDate.toISOString()})
    );
};
const errorHandler = (message) =>{
    switch(message){
        case 'WEAK_PASSWORD':
            throw new Error('Your password should be at least 6 characters long.');
        case 'EMAIL_EXISTS':
            throw new Error('This email is no longer available.');
        case 'EMAIL_NOT_FOUND':
            throw new Error('This email does not exist.');
        case 'INVALID_PASSWORD':
            throw new Error('This password does not match.');
        default: 
            throw new Error('Something went wrong');
    }
}