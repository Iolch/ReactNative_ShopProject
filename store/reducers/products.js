import {PRODUCTS} from '../../data/dummy-data';

const initialState = {
    shopProducts: PRODUCTS,
    userProducts: [],
    cartProducts: []
};
const ProductsReducer = (state = initialState, action) => {
    return state;
}
export default ProductsReducer;