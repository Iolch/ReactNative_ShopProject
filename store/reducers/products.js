import {PRODUCTS} from '../../data/dummy-data';
import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/products';

const initialState = {
    shopProducts: PRODUCTS,
    userProducts: [],
    cartProducts: []    // [{product:product, quantity: qnt}]
};
const ProductsReducer = (state = initialState, action) => {
    
    switch(action.type){
        default: return state;
    }
    return state;
}
export default ProductsReducer;