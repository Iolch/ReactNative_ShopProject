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
import {useSelector,useDispatch} from 'react-redux';
import { removeFromCart } from '../store/actions/cart';

const CartScreen = (props) => {
  const products = useSelector(state => {
    const transformedCardItems = [];
    for(const key in state.cartReducer.items){
      transformedCardItems.push({
        id: key,
        title: state.cartReducer.items[key].title,
        price: state.cartReducer.items[key].price,
        quantity: state.cartReducer.items[key].quantity,
        total: state.cartReducer.items[key].total,
      });
      return transformedCardItems;
    }
  });

  
  const dispatch = useDispatch();

  const deleteFromCartHandler = (id) => {
        dispatch(removeFromCart(id));  
  }

  const renderCartProduct = (itemData) => {
    return (
      <CartItem
        id={itemData.item.id}
        title={itemData.item.title}
        quantity={itemData.item.quantity}
        price={itemData.item.price} 
        total = {itemData.item.total}
        onRemove = {(productId) => deleteFromCartHandler(productId)}
      />
      
    );
  }
  return (
    // <View></View>
    <FlatList keyExtractor={(item,index) => item.id} data={products} renderItem={renderCartProduct}/>
  );
};

const styles = StyleSheet.create({
});

export default CartScreen;
