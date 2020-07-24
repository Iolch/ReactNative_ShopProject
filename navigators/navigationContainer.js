import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

// constants import 
import DefaultStyles from '../constants/DefaultStyle';
import Colors from '../constants/Colors';

import Navigator from './mainNavigations';
import { useSelector } from 'react-redux';
import { NavigationActions } from 'react-navigation';

const NavigationContainer = (props) => {
    const navRef = useRef();    //with this we can control a object that is on the screen
    const isAuth = useSelector(state => !!state.authReducer.token);
    useEffect(()=>{
        if(!isAuth){
            navRef.current.dispatch(NavigationActions.navigate({routeName:'AuthDrawerRoute'}));
        }
    }, [isAuth]);
  return (<Navigator ref={navRef}/>);
};

const styles = StyleSheet.create({
});

export default NavigationContainer;
