import React from 'react';
import {
  FlatList,
  StyleSheet,
  View,
} from 'react-native';


// components imports
import {HeaderButton} from '../components/HeaderButton';
import ProductItem from '../components/ProductItem';

// constants import 
import DefaultStyle from '../constants/DefaultStyle';

// custom imports
import {HeaderButtons, Item} from 'react-navigation-header-buttons';


// redux
import {useSelector} from 'react-redux';

const ShopScreen = (props) => {

  let products = useSelector(state => state.productsReducer.shopProducts);
  const renderProductItem = (itemData) =>{
    console.log(itemData.item.id);
    return (<ProductItem 
              navigation={props.navigation} 
              id={itemData.item.id} 
              price={itemData.item.price} 
              title={itemData.item.title} 
              image={itemData.item.imageUrl}
              />);
  };
  return (
    <View style={DefaultStyle.screen}>
      <FlatList 
        data={products} 
        renderItem={renderProductItem}
      />
    </View>
  );
};

ShopScreen.navigationOptions = (navigationData) =>{
  return {
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}><Item title='menu' iconName='menu' onPress={() => navigationData.navigation.toggleDrawer()}/></HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}><Item title='cart' iconName='shoppingcart' onPress={() => {navigationData.navigation.navigate({routeName:'CartRoute'})}}/></HeaderButtons>
  };
};

const styles = StyleSheet.create({
});

export default ShopScreen;
