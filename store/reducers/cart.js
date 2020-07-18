import {ADD_TO_CART, CLEAR_CART, REMOVE_FROM_CART} from '../actions/cart';
import {REMOVE_PRODUCT} from '../actions/products';
import CartItem from '../../models/cart-item';

const initialState = {
    items: {},
    totalAmount: 0
};
const CartReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_TO_CART:
            if(state.items[action.productId]){
                const updatedCartItem = new CartItem (
                                                        state.items[action.productId].quantity + 1, 
                                                        state.items[action.productId].price,
                                                        state.items[action.productId].title,
                                                        state.items[action.productId].total + state.items[action.productId].price,
                                                    );

                return {...state, 
                        items:{...state.items, [action.productId]: updatedCartItem},
                        totalAmount: state.totalAmount + updatedCartItem.price};
            }else{
                const newCartItem = new CartItem(1, action.price, action.title, action.price);
                return {...state, items:{...state.items, [action.productId]: newCartItem}, totalAmount: state.totalAmount + action.price};
            }
        case CLEAR_CART:
            return ({items: {}, totalAmount: 0});
        case REMOVE_FROM_CART:
            if (state.items[action.productId].quantity > 1){
                const updatedCartItem = new CartItem (
                    state.items[action.productId].quantity - 1, 
                    state.items[action.productId].price,
                    state.items[action.productId].title,
                    state.items[action.productId].total - state.items[action.productId].price,
                );

                return {...state, items:{...state.items, [action.productId]: updatedCartItem}, totalAmount: state.totalAmount - updatedCartItem.price};
            }else{
                const updatedCartItems = state.items;
                const removedProduct = updatedCartItems[action.productId];
                delete updatedCartItems[action.productId];
                return {...state, items: updatedCartItems, totalAmount: state.totalAmount - removedProduct.price};
            }
        case REMOVE_PRODUCT:
            if(!state.items[action.productId]) return state;

            const updatedItems = state.items;
            const removedProduct = updatedItems[action.productId];
            delete updatedItems[action.productId];
            return {...state, items: updatedItems, totalAmount: state.totalAmount - removedProduct.price};
        default: return state;
    }
    return state;
}
export default CartReducer;