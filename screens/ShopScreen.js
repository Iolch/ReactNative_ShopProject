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
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../store/actions/cart';

const ShopScreen = (props) => {

  let products = useSelector(state => state.productsReducer.shopProducts);
  const dispatch = useDispatch();
  const addToCartHandler = (id, title, price) => {  
      dispatch(addToCart(id, title, price));  
      props.navigation.navigate({routeName:'CartRoute'});
  };

  const renderProductItem = (itemData) =>{
    return (<ProductItem 
              navigation={props.navigation} 
              id={itemData.item.id} 
              price={itemData.item.price} 
              title={itemData.item.title} 
              image={itemData.item.imageUrl}
              onAdd={(id, title, price) => addToCartHandler(id, title, price)}
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
