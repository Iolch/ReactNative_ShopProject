import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


const ProductsDetailScreen = (props) => {
  const productId = props.navigation.getParam('productId');

  return (
    <View><Text>OI!</Text></View>
  );
};
ProductsDetailScreen.navigationOptions = (NavigationData) => {
  const title = NavigationData.navigation.getParam('productTitle');
  return {
    headerTitle: title,
  };
};

const styles = StyleSheet.create({
});

export default ProductsDetailScreen;
