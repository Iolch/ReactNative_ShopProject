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
    
    Object.entries(state.cartReducer.items).forEach(([key, item]) => {
        transformedCardItems.push({
          id: key,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          total: item.total,
        });
    });
    return transformedCardItems;
  });
 
  const totalAmount = useSelector(state => {state.cartReducer.totalAmount});
  
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
   
      <FlatList keyExtractor={(item,index) => item.id} data={products} renderItem={renderCartProduct}/>
    );
};

const styles = StyleSheet.create({
});

export default CartScreen;
