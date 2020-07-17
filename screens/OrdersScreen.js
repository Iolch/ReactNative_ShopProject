import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// components imports
import {HeaderButton} from '../components/HeaderButton';
import OrderItem from '../components/OrderItem';

// custom imports
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

//import redux
import {useSelector} from 'react-redux';

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orderReducer.orders);

  const renderOrderItem = (itemData) =>{
    return (<OrderItem 
              id={itemData.item.id}
              date={itemData.item.date}
              items={itemData.item.items}
              totalAmount={itemData.item.totalAmount}/>);
  };

  return (
    <FlatList data={orders} renderItem={renderOrderItem}/>
  );
};

OrdersScreen.navigationOptions = (NavigationData) =>{
  return {
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}><Item title='menu' iconName='menu-fold' onPress={() => NavigationData.navigation.toggleDrawer()}/></HeaderButtons>,
  };
};

const styles = StyleSheet.create({
});

export default OrdersScreen;
