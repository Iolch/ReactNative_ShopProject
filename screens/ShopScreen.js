import React from 'react';
import {
  Button,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';


// components imports
import {HeaderButton} from '../components/HeaderButton';
import ProductItem from '../components/ProductItem';

// constants import 
import DefaultStyle from '../constants/DefaultStyle';
import Colors from '../constants/Colors';

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
  const viewDetailHandler = (id, title) =>{
    props.navigation.navigate({routeName:'ProductsDetailRoute', params:{productId: id, productTitle:title}})
  }

  const renderProductItem = (itemData) =>{
    return (<ProductItem 
              id={itemData.item.id} 
              price={itemData.item.price} 
              title={itemData.item.title} 
              image={itemData.item.imageUrl}
              onSelect = {(id, title) => viewDetailHandler(id, title)}
              >
                <Button title='More' color={Colors.primary} onPress={()=> viewDetailHandler(itemData.item.id, itemData.item.title) }/>
                <Button title='Cart' color={Colors.primary} onPress={() => addToCartHandler(itemData.item.id, itemData.item.title, itemData.item.price) }/>

              </ProductItem>
            );
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
    headerTitle: 'Shop',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}><Item title='menu' iconName='menu' onPress={() => navigationData.navigation.toggleDrawer()}/></HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}><Item title='cart' iconName='shoppingcart' onPress={() => {navigationData.navigation.navigate({routeName:'CartRoute'})}}/></HeaderButtons>
  };
};

const styles = StyleSheet.create({

});

export default ShopScreen;
