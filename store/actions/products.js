import Strings from '../../constants/Strings';
import Product from '../../models/product';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async dispatch => {
        try{
            const response = await fetch(Strings.datasetUrl+'products.json');     //the default is a method get
            const responseData = await response.json();

            if(!response.ok){
                throw new Error('Somethig is weird.');
            }

            // so this is like this because of the way we retrieve the data from firedatabase

            let loadedProducts = [];
            for (const key in responseData){
                loadedProducts.push(new Product(key,
                                                'u1',
                                                responseData[key].title,
                                                responseData[key].imageUrl,
                                                responseData[key].description,
                                                responseData[key].price));
            }
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts
            });
        }catch (err){
            throw err;
        }
        
    };
};

export const removeProduct = (id) => {
    return {type: REMOVE_PRODUCT, productId: id};
};
export const addProduct = (title, imageUrl, price, description ) => {
    return async dispatch => {    //because we're using redux-thunk

        // now we use async functions in here! :D
        const response = await fetch(Strings.datasetUrl+'products.json', {  // this could be also done with then/catch
            method: 'POST', 
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({title, imageUrl, price, description})
        }); 
        const responseData = await response.json();

        dispatch ({
            type: ADD_PRODUCT, 
            productId: responseData.name,
            productTitle: title, 
            productImageURL: imageUrl, 
            productPrice: price, 
            productDescription: description
        });

    };
    // return {type: ADD_PRODUCT, productTitle: title, productImageURL: imageUrl, productPrice: price, productDescription: description};
};
export const updateProduct = (id, title, imageUrl, description) => {
    return {type: UPDATE_PRODUCT, productId: id, productTitle: title, productImageURL: imageUrl, productDescription: description};
};
