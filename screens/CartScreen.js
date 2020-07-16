import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

//components imports
import CartItem from '../components/CartItem';

//redux
import {useSelector} from 'react-redux';

const CartScreen = (props) => {

  const products = useSelector(state => state.productsReducer.cartProducts);

  const renderCartProduct = (itemData) => {
    return (
      <CartItem
        id={itemData.item.product.id}
        title={itemData.item.product.title}
        quantity={itemData.item.quantity}
        priceUnity={itemData.item.product.price} 
      />
      
    );
  }
  return (
    // <View></View>
    <FlatList keyExtractor={(item,index) => item.product.id} data={products} renderItem={renderCartProduct}/>
  );
};

const styles = StyleSheet.create({
});

export default CartScreen;
