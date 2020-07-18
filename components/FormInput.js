import React, {useReducer, useEffect} from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

// constants import 
import DefaultStyle from '../constants/DefaultStyle';
import Colors from '../constants/Colors';

const UPDATE_INPUT = 'UPDATE_INPUT';
const BLUR_INPUT = 'BLUR_INPUT';

const inputReducer = (state, action) => {
    switch(action.type){
        case UPDATE_INPUT:
            return{
                ...state,
                value: action.value,
                isValid: action.isValid
            };
        case BLUR_INPUT:
            return {
                ...state,
                altered: true
            };
        default: 
            return state;
    }
};

const FormInput = (props) => {

    const [inputState, dispatch] = useReducer(inputReducer,{
        value: props.initialValue ? props.initialValue : '',
        isValid: props.initiallyValid,
        altered: false
    });
    const textChangeHandler = text => {
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let isValid = true;
        if (props.required && text.trim().length === 0) {
            isValid = false;
        }
        if (props.email && !emailRegex.test(text.toLowerCase())) {
            isValid = false;
        }
        if (props.min != null && +text < props.min) {
            isValid = false;
        }
        if (props.max != null && +text > props.max) {
            isValid = false;
        }
        if (props.minLength != null && text.length < props.minLength) {
            isValid = false;
        }
        dispatch({type:UPDATE_INPUT, value: text, isValid: isValid});
    };
    const {onInputChange, id} = props;
    useEffect(()=>{
        if(inputState.altered){
            onInputChange(id, inputState.value, inputState.isValid);    //props.onInputChange
        }
    },[inputState, onInputChange, id]);
    const lostFocusHandler = () => {
        dispatch({type: BLUR_INPUT});

    }
    return (
        <View style={styles.formControl}>
            <Text style={DefaultStyle.textHighlight}>{props.label}</Text>
            <TextInput
                {...props}
                style={styles.input}
                value={inputState.value}
                onChangeText={textChangeHandler}
                onBlur={lostFocusHandler}
            />
            {(!inputState.isValid  && inputState.altered) ? (<Text style={styles.error}>Please, set a valid {props.label}.</Text>) : null}
        </View>
    );
};

const styles = StyleSheet.create({
    formControl:{
        width: '100%',
        marginVertical: 10,
    },
    error:{
        color: '#ccc',
        fontSize: 12
    },
    input: {
        paddingHorizontal:2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        backgroundColor:'#fff'
    },
});

export default FormInput;
