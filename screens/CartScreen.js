import React, {useCallback, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

//components imports
import CartItem from '../components/CartItem';

// constants import 
import DefaultStyle from '../constants/DefaultStyle';
import Colors from '../constants/Colors';

//redux
import {useSelector,useDispatch} from 'react-redux';
import { removeFromCart, clearCart } from '../store/actions/cart';
import { addOrder } from '../store/actions/orders';


const CartScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
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
 
  const totalAmount = useSelector(state => state.cartReducer.totalAmount);
  
  const dispatch = useDispatch();

  const deleteFromCartHandler = (id) => {
      dispatch(removeFromCart(id));  
  }

  const clearCartHandler = () => {
    dispatch(clearCart());
  }
  const placeOrderHandler = async () => {
      if(products.length >= 1){

        try{
          setIsLoading(true);
          await dispatch(addOrder(products, totalAmount));
          setIsLoading(false);
          clearCartHandler();
          props.navigation.navigate({routeName:'OrdersRoute'});

        }catch(err){
          Alert.alert(
            'We had a problem.', 
            'Are you connected to the intenet?',
            [{text:'Ok', style:'cancel'}]
          );
        } 
      }else{
        Alert.alert(
        'Soon you can order!', 
        'Add some items to your cart first',
        [{text:'Ok', style:'cancel'}]
        );
      }
  }
  const renderCartProduct = (itemData) => {
    return (
      <CartItem
        id={itemData.item.id}
        title={itemData.item.title}
        quantity={itemData.item.quantity}
        price={itemData.item.price} 
        total = {itemData.item.total}
        canRemove = {true}
        onRemove = {(productId) => deleteFromCartHandler(productId)}
      />
      
    );
  }
  let content = <View style={DefaultStyle.full}><Text>No products</Text></View>;
  if(products.length > 0){
    content = ( 
              <View>
                <View style={DefaultStyle.card}>
                  <View style={{...DefaultStyle.row, marginVertical:0, paddingHorizontal: 15}}>
                    <Text style={DefaultStyle.textHighlight}>Qanty.</Text>
                    <Text style={DefaultStyle.textHighlight}>Prodc.</Text>
                    <Text style={DefaultStyle.textHighlight}>Price.</Text>
                    <Text style={DefaultStyle.textHighlight}>Remove</Text>
                  </View>
                  <FlatList keyExtractor={(item,index) => item.id} data={products} renderItem={renderCartProduct}/>
                </View>
                <View style={styles.trashContainer}>
                  <Button title='Clear Cart' color={Colors.secondary} onPress={clearCartHandler}/>
                </View>
              </View>
              );
  }
  return (
      <View>
        <View style={DefaultStyle.row}>
          <Text style={DefaultStyle.textHighlight}>Total: {Math.round(totalAmount.toFixed(2)*100)/100}</Text>
          <View style={{flexDirection: 'row', justifyContent:'flex-end'}}>
            {isLoading ? <ActivityIndicator size='small' color={Colors.secondary}/>: null}
            <Button color={Colors.secondary} title='Place Order' onPress={placeOrderHandler}/>
          </View>
          
        </View>
        {content}
        
      </View>
    );
};
CartScreen.navigationOptions = (NavigationData) => {
  return {
    headerTitle: 'Cart'
  };
};
const styles = StyleSheet.create({
  trashContainer:{
    width: '100%',
    marginVertical: 15,
    alignItems: 'center',
  }
});

export default CartScreen;
