import React, {useEffect, useCallback, useState, useReducer} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

// components import
import {HeaderButton} from '../components/HeaderButton';
import FormInput from '../components/FormInput';
import LoadingScene from '../components/LoadingScene';

// custom imports
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {addProduct, updateProduct} from '../store/actions/products';

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

const ProductsEditScreen = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState('');

  const productId = props.navigation.getParam('productId');
  const product = useSelector((state)=>state.productsReducer.userProducts.find((product)=> product.id === productId));

  // validation states
  
  const [formState, dispatchFormState] = useReducer( formReducer,{
                                              inputValues:{
                                                title: product ? product.title : '',
                                                imageUrl: product ? product.imageUrl : '',
                                                price: '',
                                                description: product ? product.description : ''
                                              }, 
                                              inputValidities:{
                                                title: product ? true : false,
                                                imageUrl: product ? true : false,
                                                price: product ? true : false,
                                                description: product ? true : false,
                                              }, 
                                              formIsValid: product ? true : false
                                          });

  const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValid) =>{
    dispatchFormState({type:FORM_UPDATE, value: inputValue, isValid: inputValid, input: inputIdentifier});
  },[dispatchFormState]);

  // other functions
  const dispatch = useDispatch();
  const onSubmitHandler = useCallback(
    async () => {

      if( !formState.formIsValid) {
          Alert.alert('Wrong information', 'Please check again', [{text:'Ok'} ]);
          return;
      }
      setLoadingError(null);
      setIsLoading(true);

      try{
        if(product){
            await dispatch(updateProduct(productId, 
                                         formState.inputValues.title, 
                                         formState.inputValues.imageUrl, 
                                         formState.inputValues.description));   
          
        }else{
            await dispatch(addProduct(formState.inputValues.title, 
                                      formState.inputValues.imageUrl, 
                                      +formState.inputValues.price, 
                                      formState.inputValues.description));
        }
      props.navigation.goBack();

      }catch(err){
        setLoadingError(err.message);
      }   

      setIsLoading(false);

    },[dispatch, formState, productId]
  );
  
  useEffect(()=>{
    if(loadingError){
      Alert.alert('An error occurred!', loadingError, [{text:'Ok'} ]);
    }
  },[loadingError]);
  useEffect(()=>{
    props.navigation.setParams({onSubmit: onSubmitHandler});
  }, [onSubmitHandler]);


  // LOADING SCREEN
  if(isLoading){
    return (<LoadingScene />);
  }
  
  // DEFAULT SCREEN
  return (
    <KeyboardAvoidingView style={{flex:1, backgroundColor:'#fff'}} behavior="padding" keyboardVerticalOffset={30}>
      <ScrollView>
        <View style={styles.form}>
            <FormInput 
              id='title'
              label='Title'
              autoCapitalize='sentences'  
              autoCorrect
              returnKeyType='next'
              initialValue = {product ? product.title : ''}
              initiallyValid = {product ? true : false}
              onInputChange={inputChangeHandler}
              required
            />

            <FormInput 
              id='imageUrl'
              label='Image URL'
              returnKeyType='next'
              initialValue = {product ? product.imageUrl : ''}
              initiallyValid = {product ? true : false}
              onInputChange={inputChangeHandler}
              required
            />
            {product ? null : <FormInput 
                                id= 'price'
                                label='Price'
                                returnKeyType='next'
                                keyboardType='decimal-pad'            
                                onInputChange={inputChangeHandler}
                                required
                                min={0}
                              />
            }
            <FormInput 
              id='description'
              label='Description'
              autoCapitalize='sentences'  
              autoCorrect
              multiline
              numberOfLines={3}
              initialValue = {product ? product.description : ''}
              initiallyValid = {product ? true : false}
              onInputChange={inputChangeHandler}
              required
              minLength={5}
            />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
ProductsEditScreen.navigationOptions = (NavigationData) => {

  let header = NavigationData.navigation.getParam('productTitle');



  if(!header) title='New Product';

  return {
    headerTitle: header,
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}><Item title='save' iconName='save' onPress={NavigationData.navigation.getParam('onSubmit')}/></HeaderButtons>
  };
};
const styles = StyleSheet.create({
  form:{
    marginVertical: 20,
  },
});

export default ProductsEditScreen;
