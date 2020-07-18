export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';

export const removeProduct = (id) => {
    return {type: REMOVE_PRODUCT, productId: id};
};
export const addProduct = (title, imageUrl, price, description ) => {
    return {type: ADD_PRODUCT, productTitle: title, productImageURL: imageUrl, productPrice: price, productDescription: description};
};
export const updateProduct = (id, title, imageUrl, description) => {
    return {type: UPDATE_PRODUCT, productId: id, productTitle: title, productImageURL: imageUrl, productDescription: description};
};
