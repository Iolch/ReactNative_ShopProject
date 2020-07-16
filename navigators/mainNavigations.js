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

const ShopNavigatorStack = createStackNavigator({
    ShopRoute: ShopScreen,
    CartRoute: CartScreen,
    ProductsDetailRoute: ProductsDetailScreen
});
const ProductsNavigatorStack = createStackNavigator({
    ProductsUserRoute: ProductsUserScreen,
    ProductsEditRoute: ProductsEditScreen
});
const OrdersNavigatorStack = createStackNavigator({
    OrdersRoute: OrdersScreen,
});

const MainNavigator = createDrawerNavigator({
    ShopMenuRoute: ShopNavigatorStack,
    OrdersMenuRoute: OrdersNavigatorStack,
    ProductsUserMenuRoute: ProductsNavigatorStack
});

export default createAppContainer(MainNavigator);