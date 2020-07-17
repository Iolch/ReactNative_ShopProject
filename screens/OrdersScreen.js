import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

// components imports
import {HeaderButton} from '../components/HeaderButton';
// custom imports
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

//import redux
import {useSelector} from 'react-redux';

const OrdersScreen = (props) => {
  const orders = useSelector((state) => state.orderReducer.orders);
  console.log(orders);
  return (
    <View><Text>OI!</Text></View>
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
