import React, {useEffect, useState, useCallback} from 'react';
import {
  ActivityIndicator,  //built-in spinner
  Button,
  FlatList,
  StyleSheet,
  Text,
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
import {fetchProducts} from '../store/actions/products';


const ShopScreen = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState('');
  
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

  const loadProducts = useCallback(async () => {  //again, we could use then/catch in here
    setLoadingError(null);
    setIsLoading(true);
    try{
      await dispatch(fetchProducts());
    }catch(err){
      setLoadingError(err.message);
    }
    setIsLoading(false);
  },[dispatch, setIsLoading, setLoadingError]);

  useEffect(()=>{
    const willFocusSubscription = props.navigation.addListener('willFocus', loadProducts); //doing this, cuz drawer doesnt re-render when navigation changes

    return () => {    //this is a clean up return, it will execute when the component gets destroyed and at every cicle end
      willFocusSubscription.remove();
    };
  },[loadProducts]);

  // LOADING SCREEN 

  if(loadingError){
    return (
      <View style={{...DefaultStyle.full, backgroundColor:Colors.light}}>
        <Text>Someting went wrong...</Text>
        <Text style={DefaultStyle.textHighlight}> {loadingError} </Text>
        <Button
          title='Try Again'
          color={Colors.secondary}
          onPress={loadProducts}
        />
      </View>
    );
  }

  if(isLoading){
    return (
      <View style={{...DefaultStyle.full, backgroundColor:Colors.light}}>
        <ActivityIndicator size='large' color={Colors.secondary}/>
      </View>
    );
  }else{
    if(products.length === 0 || isNaN(products.length)){
      return(
        <View style={{...DefaultStyle.full, backgroundColor:Colors.light}}>
          <Text>Nothing to see here</Text>
          <Text style={DefaultStyle.textHighlight}>Maybe you could add some!</Text>
        </View>
      );
    }
  }

  // DEFAULT SCREEN
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
