import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
    StyleSheet,
    View,
} from 'react-native';

// constants import 
import DefaultStyles from '../constants/DefaultStyle';
import Colors from '../constants/Colors';

// components import
import LoadingScene from '../components/LoadingScene';

// redux import
import {authenticateUser} from '../store/actions/auth';
import {useDispatch} from 'react-redux';


const StartupScreen = (props) => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const tryLogin = async () =>{
            const userData = await AsyncStorage.getItem('authData');
            if(!userData) {
                props.navigation.navigate('AuthRoute');
                return;
            }
            const transformedData = JSON.parse(userData);
            const {token, userId, expirationDate} = transformedData;
            
            const tokenExpirationDate = new Date(expirationDate);
            if(tokenExpirationDate <= new Date() || !token || !userId){
                props.navigation.navigate('AuthRoute');
                return;
            }
            await dispatch(authenticateUser(token, userId));
            props.navigation.navigate('ShopRoute');
        };
        tryLogin();
    },[dispatch]);
    return (
        <LoadingScene />
    );
};

const styles = StyleSheet.create({
});

export default StartupScreen;
