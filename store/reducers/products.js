import {PRODUCTS} from '../../data/dummy-data';
import {SET_PRODUCTS, ADD_PRODUCT, REMOVE_PRODUCT, UPDATE_PRODUCT} from '../actions/products';
import Product from '../../models/product';

const initialState = {
    shopProducts: [],
    userProducts: [],
};
const ProductsReducer = (state = initialState, action) => {
    
    switch(action.type){
        case SET_PRODUCTS:
            return{...state,
                    shopProducts: action.products,
                    userProducts: action.products.filter(product => product.ownerId === 'u1')
                    };
        case ADD_PRODUCT:
            const newProduct = new Product( action.productId, 
                                            'u1', 
                                            action.productTitle, 
                                            action.productImageURL, 
                                            action.productDescription, 
                                            action.productPrice);

            return {...state, 
                    userProducts: state.userProducts.concat(newProduct), 
                    shopProducts: state.shopProducts.concat(newProduct),
                    };
        case UPDATE_PRODUCT:
            const removedProduct = state.shopProducts.find((product) => product.id === action.productId);
            const updatedProduct = new Product( removedProduct.id, 
                                                removedProduct.ownerId, 
                                                action.productTitle, 
                                                action.productImageURL, 
                                                action.productDescription, 
                                                removedProduct.price);
            
            const newShopProducts = state.shopProducts.filter((product) => product.id !== removedProduct.id);
            const newUserProducts = state.userProducts.filter((product) => product.id !== removedProduct.id);
            return {...state,
                    shopProducts: newShopProducts.concat(updatedProduct),
                    userProducts: newUserProducts.concat(updatedProduct),
                    
                    };
        case REMOVE_PRODUCT:
            return {...state, 
                    userProducts: state.userProducts.filter((product) => product.id !== action.productId),
                    shopProducts: state.shopProducts.filter((product) => product.id !== action.productId),
                    };
        default: return state;
    }
    return state;
}
export default ProductsReducer;