import {PRODUCTS} from '../../data/dummy-data';
import {ADD_TO_CART} from '../actions/products';

const initialState = {
    shopProducts: PRODUCTS,
    userProducts: [],
    cartProducts: []    // [{product:product, quantity: qnt}]
};
const ProductsReducer = (state = initialState, action) => {
    switch(action.type){
        case (ADD_TO_CART):
            let updatedCartProducts = state.cartProducts;
            const index = updatedCartProducts.findIndex((element) => element.product.id === action.productId);
            if(index >= 0){
                updatedCartProducts[index].quantity =  updatedCartProducts[index].quantity + 1;
            }else{

                const product = state.shopProducts.find((product) => product.id === action.productId);
                const temporary = {product:product, quantity: 1};
                updatedCartProducts.push(temporary);
            }
            return {...state, cartProducts: updatedCartProducts} 
            
        default: return state;
    }
    return state;
}
export default ProductsReducer;