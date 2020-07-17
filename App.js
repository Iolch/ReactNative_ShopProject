import 'react-native-gesture-handler';

import React from 'react';
import {View} from 'react-native';

// navigator import
import Navigator from './navigators/mainNavigations';
import {enableScreens} from 'react-native-screens';

//redux imports
import {createStore, combineReducers} from 'redux';
import {Provider} from 'react-redux';

// import reducers
import ProductsReducer from './store/reducers/products';
import CartReducer from './store/reducers/cart';


enableScreens();

const rootReducer = combineReducers({
  productsReducer: ProductsReducer,
  cartReducer: CartReducer
});

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store ={store}> 
      <Navigator/>
    </Provider>
  );
};

export default App;
