import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// components imports
import {HeaderButton} from '../components/HeaderButton';
import OrderItem from '../components/OrderItem';
import LoadingScene from '../components/LoadingScene';
import MessageScene from '../components/MessageScene';

// custom imports
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

//import redux
import {useSelector, useDispatch} from 'react-redux';
import {fetchOrders} from '../store/actions/orders';
import DefaultStyle from '../constants/DefaultStyle';


const OrdersScreen = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState('');

   const orders = useSelector((state) => state.orderReducer.orders);

  const renderOrderItem = (itemData) =>{
    return (<OrderItem 
              id={itemData.item.id}
              date={itemData.item.date}
              items={itemData.item.items}
              totalAmount={itemData.item.totalAmount}/>);
  };
  const dispatch = useDispatch();
  
  const loadOrders = useCallback(async () => {
      setLoadingError(null);
      setIsLoading(true);
      try{
        await dispatch(fetchOrders());
      }catch(err){
        setLoadingError(err.message);
      }
      setIsLoading(false);
  },[dispatch, setIsLoading, setLoadingError]);

  useEffect(()=>{
    const willFocusSubscription = props.navigation.addListener('willFocus', loadOrders); //doing this, cuz drawer doesnt re-render when navigation changes

    return () => {    //this is a clean up return, it will execute when the component gets destroyed and at every cicle end
      willFocusSubscription.remove();
    };
  },[loadOrders]);

  useEffect(()=>{   //this needs to be here, cuz in first exec, the function above doesnt get triggered
    loadOrders();
  },[loadOrders]);

  if(loadingError){
    return(
      <MessageScene title='Something went wrong...' message={loadingError}/>
    );
  }
  if(isLoading){
    return(<LoadingScene />);
  }else{
    if(orders.length === 0 || isNaN(orders.length)){
      return(
        <MessageScene title='Nothing to see here' message='Start shoping!'/>
      );
    }
  }
  return (
    <View style={{...DefaultStyle.screen, alignItems:'center'}}>
      <FlatList data={orders} renderItem={renderOrderItem}/>
    </View>
  );
};

OrdersScreen.navigationOptions = (NavigationData) =>{
  
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}><Item title='menu' iconName='menu-fold' onPress={() => NavigationData.navigation.toggleDrawer()}/></HeaderButtons>,
  };
};

const styles = StyleSheet.create({
});

export default OrdersScreen;
