import React from 'react';

// navigators imports
import { createAppContainer, Header } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';

//screen imports
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProductsUserScreen from '../screens/ProductsUserScreen';
import ProductsDetailScreen from '../screens/ProductsDetailScreen';
import ProductsEditScreen from '../screens/ProductsEditScreen';
import ShopScreen from '../screens/ShopScreen';

//custom import
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AuthScreen from '../screens/AuthScreen';

const ShopNavigatorStack = createStackNavigator({
    ShopRoute: ShopScreen,
    CartRoute: CartScreen,
    ProductsDetailRoute: ProductsDetailScreen
},{
    navigationOptions:{
        headerTitle: 'Shop',
        drawerIcon: (drawerConfig) =>  <Icon name="tag" size={23} color={Colors.primary} />
    },
});
const ProductsNavigatorStack = createStackNavigator({
    ProductsUserRoute: ProductsUserScreen,
    ProductsEditRoute: ProductsEditScreen
},{
    navigationOptions:{
        headerTitle: 'My Products',
        drawerIcon: (drawerConfig) =>  <Icon name="heart" size={23} color={Colors.primary} />
    },
});
const OrdersNavigatorStack = createStackNavigator({
    OrdersRoute: OrdersScreen,
},{
    navigationOptions:{
        headerTitle: 'My Orders',
        drawerIcon: (drawerConfig) =>  <Icon name="check" size={23} color={Colors.primary} />
    },
});
const AuthNavigator = createStackNavigator({
    AuthRoute: AuthScreen,
});
const MainNavigator = createDrawerNavigator({
    ShopMenuRoute: ShopNavigatorStack,
    OrdersMenuRoute: OrdersNavigatorStack,
    ProductsUserMenuRoute: ProductsNavigatorStack
},{
    contentOptions:{
        activeTintColor: Colors.primary
    }
});

export default createAppContainer(AuthNavigator);