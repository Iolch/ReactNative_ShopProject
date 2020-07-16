import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Button,
} from 'react-native';
import { useSelector } from 'react-redux';

// constants import 
import DefaultStyle from '../constants/DefaultStyle';

const ProductsDetailScreen = (props) => {
  const productId = props.navigation.getParam('productId');

  const product = useSelector((state)=> state.productsReducer.shopProducts).find((product) => product.id == productId);
  return (
    <View style={{...DefaultStyle.screen, padding:0}}>
      <View style={styles.imageContainer}> 
          <ImageBackground source={{uri: product.imageUrl}} style={styles.image}>
          </ImageBackground>
      </View>
      <View style={styles.content}> 
        <Text style={DefaultStyle.title}>{product.price}</Text>
        <Text style={DefaultStyle.textCenter}>{product.description}</Text>
        <Button title='To Cart' onPress={()=>{props.navigation.navigate({routeName:'CartRoute', params:{productId: product.id}})}}/>
      </View>
    </View>
  );
};
ProductsDetailScreen.navigationOptions = (NavigationData) => {
  const title = NavigationData.navigation.getParam('productTitle');
  return {
    headerTitle: title,
  };
};

const styles = StyleSheet.create({

  imageContainer:{
    width:'100%'
  },
  image:{
    width:'100%',
    height: 250
  },
  content:{
    flex: 1,
    padding: 10,
    justifyContent: 'space-evenly',
    alignItems:'center',
  }
});

export default ProductsDetailScreen;
