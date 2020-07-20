import Strings from '../../constants/Strings';
export const LOGIN_USER = 'LOGIN_USER';
export const SINGUP_USER = 'SINGUP_USER';

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
            console.log(errorData);
            errorHandler(errorData.error.message.split(' ')[0]);
        }

        const responseData = await response.json();
        dispatch({  type: LOGIN_USER,
                    email: email, 
                    password: password});
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
            console.log(errorData);
            errorHandler(errorData.error.message.split(' ')[0]);
        }
        const responseData = await response.json();
        dispatch({type: SINGUP_USER, 
                  email: email, 
                  password: password});
    };
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