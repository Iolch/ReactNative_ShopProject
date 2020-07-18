import React, {useEffect, useCallback, useState} from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

// components import
import {HeaderButton} from '../components/HeaderButton';

// constants import 
import DefaultStyle from '../constants/DefaultStyle';
import Colors from '../constants/Colors';

// custom imports
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

//redux
import {useSelector, useDispatch} from 'react-redux';
import {addProduct, updateProduct} from '../store/actions/products';

const ProductsEditScreen = (props) => {
  const productId = props.navigation.getParam('productId');
  const product = useSelector((state)=>state.productsReducer.userProducts.find((product)=> product.id === productId));
  
  const [title, setTitle] = useState(product ? product.title : '');
  const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : '');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(product ? product.description : '');
 
  const dispatch = useDispatch();
  const onSubmitHandler = useCallback(
    () => {
      if(product){
        dispatch(updateProduct(productId, title, imageUrl, description));      
      }else{
        dispatch(addProduct(title, imageUrl, +price, description));
      }
      props.navigation.goBack();
    },[dispatch, title, imageUrl, price, description, productId]
  );

  useEffect(()=>{
    navigation.setParams({onSubmit: onSubmitHandler});
  }, [onSubmitHandler]);

  return (
    <ScrollView style={{...DefaultStyle.screen, backgroundColor:'#fff'}}>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={DefaultStyle.textHighlight}>Title</Text>
          <TextInput style={styles.input} value={title} onChangeText={(text) => setTitle(text)}/>
        </View>

        <View style={styles.formControl}>
          <Text style={DefaultStyle.textHighlight}>Image URL</Text>
          <TextInput style={styles.input} value={imageUrl} onChangeText={(url) => setImageUrl(url)}/>
        </View>
        
        {product ? null : <View style={styles.formControl}>
                            <Text style={DefaultStyle.textHighlight}>Price</Text>
                            <TextInput style={styles.input} value={price} onChangeText={(price) => setPrice(price)}/>
                          </View>
        }

        <View style={styles.formControl}>
          <Text style={DefaultStyle.textHighlight}>Description</Text>
          <TextInput style={styles.input} value={description} onChangeText={(description) => setDescription(description)}/>
        </View>
      </View>

    </ScrollView>
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
  formControl:{
    width: '100%',
    marginVertical: 5,
  },
  input: {
    paddingHorizontal:2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    backgroundColor:'#fff'
  },
});

export default ProductsEditScreen;
