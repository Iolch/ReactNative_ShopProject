import 'react-native-gesture-handler';

import React from 'react';
import {View} from 'react-native';

// navigator import
// import Navigator from './navigators/mainNavigations';
import NavigationContainer from './navigators/navigationContainer';
import {enableScreens} from 'react-native-screens';

//redux imports
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk'; //this middleware allow us to use assync functions, using to control http requests
import {Provider} from 'react-redux';

// import reducers
import AuthReducer from './store/reducers/auth';
import CartReducer from './store/reducers/cart';
import ProductsReducer from './store/reducers/products';
import OrderReducer from './store/reducers/orders';


enableScreens();

const rootReducer = combineReducers({
  authReducer: AuthReducer,
  productsReducer: ProductsReducer,
  cartReducer: CartReducer,
  orderReducer: OrderReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store ={store}> 
      <NavigationContainer/>
    </Provider>
  );
};

export default App;
