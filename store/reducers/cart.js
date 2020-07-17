import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart';
import CartItem from '../../models/cart-item';

const initialState = {
    items: {},
    totalAmount: 0
};
const CartReducer = (state = initialState, action) => {
    switch(action.type){
        case (ADD_TO_CART):
            if(state.items[action.productId]){
                const updatedCartItem = new CartItem (
                                                        state.items[action.productId].quantity + 1, 
                                                        state.items[action.productId].price,
                                                        state.items[action.productId].title,
                                                        state.items[action.productId].total + state.items[action.productId].price,
                                                    );

                
                return {...state, items:{...state.items, [action.productId]: updatedCartItem}, totalAmount: state.totalAmount + updatedCartItem.price}
            }else{
                const newCartItem = new CartItem(1, action.price, action.title, action.price);
                let temp = state.items
                return {...state, items:{...state.items, [action.productId]: newCartItem}, totalAmount: state.totalAmount + action.price}
            }

        case (REMOVE_FROM_CART):
            if (state.items[action.productId].quantity > 1){
                const updatedCartItem = new CartItem (
                    state.items[action.productId].quantity - 1, 
                    state.items[action.productId].price,
                    state.items[action.productId].title,
                    state.items[action.productId].total - state.items[action.productId].price,
                );

                return {...state, items:{...state.items, [action.productId]: updatedCartItem}, totalAmount: state.totalAmount - updatedCartItem.price}
            }else{
                const updatedCartItems = state.items;
                const removeProduct = updatedCartItems[action.productId];
                delete updatedCartItems[action.productId];
                return {...state, items: updatedCartItems, totalAmount: state.totalAmount - removeProduct.price}
            
            }
            

            

        default: return state;
    }
    return state;
}
export default CartReducer;