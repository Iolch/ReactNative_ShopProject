import 'react-native-gesture-handler';

import React from 'react';
import {View} from 'react-native';

// navigator import
import Navigator from './navigators/mainNavigations';
import {enableScreens} from 'react-native-screens';

//redux imports
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ReduxThunk from 'redux-thunk'; //this middleware allow us to use assync functions, using to control http requests
import {Provider} from 'react-redux';

// import reducers
import ProductsReducer from './store/reducers/products';
import CartReducer from './store/reducers/cart';
import OrderReducer from './store/reducers/orders';


enableScreens();

const rootReducer = combineReducers({
  productsReducer: ProductsReducer,
  cartReducer: CartReducer,
  orderReducer: OrderReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store ={store}> 
      <Navigator/>
    </Provider>
  );
};

export default App;
