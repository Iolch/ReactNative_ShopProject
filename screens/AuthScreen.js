import React, { useCallback, useReducer, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Button,
    KeyboardAvoidingView,
} from 'react-native';

// components import 
import FormInput from '../components/FormInput';
import LoadingScene from '../components/LoadingScene';

// constants import 
import Colors from '../constants/Colors';
import DefaultStyle from '../constants/DefaultStyle';

// redux imports
import {useDispatch} from 'react-redux';
import {loginUser, singUpUser} from '../store/actions/auth';

const FORM_UPDATE = 'UPDATE';
const formReducer = (state, action) => {
    if(action.type === FORM_UPDATE){
      const updateValues = {
        ...state.inputValues,
        [action.input]: action.value
      };
      const updateValidaties = {
        ...state.inputValidities,
        [action.input]: action.isValid
      };
      let updatedFormIsValid = true;
      for(const key in updateValidaties){
        updatedFormIsValid = updatedFormIsValid && updateValidaties[key];
      }
      return {...state, inputValues: updateValues, inputValidities: updateValidaties, formIsValid: updatedFormIsValid};

    }
};

const AuthScreen = (props) => {
    
    // validation states
    const [isLoading, setIsLoading] = useState(false);
    const [formState, dispatchFormState] = useReducer( formReducer,{
        inputValues:{
            email: '',
            password: '',
        }, 
        inputValidities:{
            email: false,
            password: false,
        }, 
        formIsValid: false
    });

    const dispatch = useDispatch();

    const onSubmitHandler = useCallback(async (mode) => {
        if(!formState.formIsValid) {
            Alert.alert('An error ocurred!', 'The fields can not be empty.', [{text:'Ok'} ]);
            return;
        };
        
        let action = null;
        if(mode === 'singup'){
            action = singUpUser(formState.inputValues.email, formState.inputValues.password);
        }else{
            action = loginUser(formState.inputValues.email, formState.inputValues.password);
        }

        setIsLoading(true);
        try{
            await dispatch(action);
            props.navigation.navigate('ShopDrawer');
        }catch(err){
            Alert.alert('An error ocurred!', err.message, [{text:'Ok'} ]);    
            setIsLoading(false);
        }
    },[dispatch, setIsLoading, formState]);


    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValid) => {
        dispatchFormState({type:FORM_UPDATE, value: inputValue, isValid: inputValid, input: inputIdentifier});
    }, [dispatchFormState]);

    
    return (
        <KeyboardAvoidingView style={{flex:1}}>
            <ScrollView style={{...DefaultStyle.screen}}>
                <View style={styles.form}>
                    <View style={{...DefaultStyle.card, padding: 20}}>
                        <FormInput 
                            id='email'
                            label='Email' 
                            keoardType='email-address'
                            returnKeyType='next'
                            initialValue = ''
                            initiallyValid = {false}
                            onInputChange={inputChangeHandler}
                            email
                            required
                        />
                        <FormInput 
                            id='password'
                            label='Password' 
                            returnKeyType='next'
                            secureTextEntry
                            initialValue = ''
                            initiallyValid = {false}
                            onInputChange={inputChangeHandler}
                            required
                        />
                        
                        {isLoading ? <ActivityIndicator size='small' color={Colors.secondary}/> : null}

                        <View style={DefaultStyle.row}>
                            <View style={styles.button}><Button title='Sing up' color={Colors.secondary} onPress={()=>onSubmitHandler('singup')}/></View>
                            <View style={styles.button}><Button title='Login' color={Colors.primary} onPress={()=>onSubmitHandler('login')}/></View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    
    );
};

AuthScreen.navigationOptions = (NavigationData) =>{
    return {
        headerTitle: 'Login',
        headerTintColor: '#fff',
        headerTitleStyle:{
            textAlign: 'center',
        },
        headerStyle:{
            backgroundColor:Colors.blue
        }
    };
};
const styles = StyleSheet.create({
    form:{
        flex:1,
        marginVertical: 20,
    },
    button:{
        width: '40%',
    }
});

export default AuthScreen;
