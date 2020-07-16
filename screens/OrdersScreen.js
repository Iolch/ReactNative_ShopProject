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

const OrdersScreen = () => {
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
