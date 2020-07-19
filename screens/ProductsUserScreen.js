import React, { useCallback, useState } from 'react';
import {
  Alert,
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

//redux
import {useSelector, useDispatch} from 'react-redux';
import {removeProduct} from '../store/actions/products';

const ProductsUserScreen = (props) => {

  const [isRefreshing, setIsRefreshing] = useState(false);
  const userProducts = useSelector((state) => state.productsReducer.userProducts);
  const dispatch = useDispatch();
  const onEditHandler = (id, title) => {
    props.navigation.navigate({routeName: 'ProductsEditRoute', params:{productId: id, productTitle: title}});
  };

  const onDeleteHandler = (id) => {
    Alert.alert(
      'You sure?', 
      'You wont be able to retrieve it.',
      [
        {text:'No, im not.', style:'cancel'},
        {text:'Yes!', style:'destructive', onPress: () => {dispatch(removeProduct(id))}},
      ]
    );
  };
  const loadUserProducts = useCallback(() => {
    setIsRefreshing(true);
    userProducts = useSelector((state) => state.productsReducer.userProducts);
    setIsRefreshing(false);
  },[userProducts]);

  const renderUserProductsItem = (itemData) => {    
    return (<ProductItem 
            id={itemData.item.id} 
            price={itemData.item.price} 
            title={itemData.item.title} 
            image={itemData.item.imageUrl}
            onSelect = {(id, title) => {onEditHandler(id, title)}}
            >
              <Button title='Edit' color={Colors.primary} onPress={()=> {onEditHandler(itemData.item.id, itemData.item.title)}}/>
              <Button title='Delete' color={Colors.primary} onPress={() => {onDeleteHandler(itemData.item.id)}}/>

            </ProductItem>
    );
  };
  return (
    <View style={DefaultStyle.screen}>
      <FlatList 
        onRefresh={loadUserProducts}
        refreshing={isRefreshing}
        data={userProducts} 
        renderItem={renderUserProductsItem}/>
    </View>

  );
};

ProductsUserScreen.navigationOptions = (NavigationData) => {
  return {
    headerTitle: 'Your Products',
    headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}><Item title='menu' iconName='menu-fold' onPress={() => NavigationData.navigation.toggleDrawer()}/></HeaderButtons>,
    headerRight: () => <HeaderButtons HeaderButtonComponent={HeaderButton}><Item title='create' iconName='create' onPress={() => NavigationData.navigation.navigate({routeName: 'ProductsEditRoute'})}/></HeaderButtons>,
    
  };
};
const styles = StyleSheet.create({
});

export default ProductsUserScreen;
