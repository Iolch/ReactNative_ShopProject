import React from 'react';
import {Button, View, SafeAreaView} from 'react-native';

// navigators imports
import { createAppContainer, createSwitchNavigator, Header } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';

//screen imports

import AuthScreen from '../screens/AuthScreen';
import CartScreen from '../screens/CartScreen';
import OrdersScreen from '../screens/OrdersScreen';
import ProductsUserScreen from '../screens/ProductsUserScreen';
import ProductsDetailScreen from '../screens/ProductsDetailScreen';
import ProductsEditScreen from '../screens/ProductsEditScreen';
import ShopScreen from '../screens/ShopScreen';
import StartupScreen from '../screens/StartupScreen';


//custom import
import Icon from 'react-native-vector-icons/FontAwesome';
import { Colors } from 'react-native/Libraries/NewAppScreen';

//redux imports
import {useDispatch} from 'react-redux';
import {logoutUser} from '../store/actions/auth';


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
const AuthNavigatorStack = createStackNavigator({
    AuthRoute: AuthScreen,
});

const ShopNavigatorDrawer = createDrawerNavigator({
    ShopMenuRoute: ShopNavigatorStack,
    OrdersMenuRoute: OrdersNavigatorStack,
    ProductsUserMenuRoute: ProductsNavigatorStack
},{
    contentOptions:{
        activeTintColor: Colors.primary
    },
    contentComponent: (props) => {
        const dispatch = useDispatch();
        return(
            <View style={{flex:1}}>
                <SafeAreaView forceInset={{top:'always', horizontal:'never'}}>
                    <DrawerItems {...props} />
                    <Button 
                        title="Logout" 
                        color={Colors.primary} 
                        onPress={()=>{  
                                        dispatch(logoutUser());
                                        // props.navigation.navigate('AuthDrawerRoute');
                                        // the navigation will be done at navigationContainer
                                    }} 
                    />
                </SafeAreaView>
            </View>
        );
    }
});

const MainNavigator = createSwitchNavigator({
    StartupRoute: StartupScreen,
    AuthDrawerRoute: AuthNavigatorStack,
    ShopDrawer: ShopNavigatorDrawer
});

export default createAppContainer(MainNavigator);