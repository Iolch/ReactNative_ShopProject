import Strings from '../../constants/Strings';
import Product from '../../models/product';

export const ADD_PRODUCT = 'ADD_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const REMOVE_PRODUCT = 'REMOVE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        try{
            const userId = getState().authReducer.userId;

            const response = await fetch(Strings.datasetUrl+'products.json');     //the default is a method get
            const responseData = await response.json();

            if(!response.ok){
                throw new Error('Problems with the consult.');
            }

            // so this is like this because of the way we retrieve the data from firedatabase

            let loadedProducts = [];
            for (const key in responseData){
                loadedProducts.push(new Product(key,
                                                userId,
                                                responseData[key].title,
                                                responseData[key].imageUrl,
                                                responseData[key].description,
                                                responseData[key].price));
            }
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userId:userId,
            });
        }catch (err){
            throw err;
        }
        
    };
};

export const removeProduct = (id) => {
    return async (dispatch, getState) => {
        
        const token = getState().authReducer.token;

        const response = await fetch(Strings.datasetUrl+`products/${id}.json?auth=${token}`,{
            method:'DELETE',
        }); 
        
        if(!response.ok){
            throw new Error ('Problems with the consult');
        }

        dispatch({
            type: REMOVE_PRODUCT, 
            productId: id
        });
    };
    // return {type: REMOVE_PRODUCT, productId: id};
};
export const addProduct = (title, imageUrl, price, description ) => {
    return async (dispatch, getState) => {    //because we're using redux-thunk
        
        const token = getState().authReducer.token;
        const userId = getState().authReducer.userId;

        // now we use async functions in here! :D
        const response = await fetch(Strings.datasetUrl+`products.json?auth=${token}`, {  // this could be also done with then/catch
            method: 'POST', 
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({title, imageUrl, price, description, userId})
        }); 
        const responseData = await response.json();

        dispatch ({
            type: ADD_PRODUCT, 
            userId: userId,
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
    return async (dispatch, getState) => {

        const token = getState().authReducer.token;

        const response = await fetch(Strings.datasetUrl+`products/${id}.json?auth=${token}`, {
            method:'PATCH',   //PUT fully overwrite and PATCH merge with the one there
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({title, imageUrl, description})
        });
        
        if(!response.ok){
            throw new Error ('Something went wrong');
        }

        dispatch({
            type: UPDATE_PRODUCT, 
            productId: id, 
            productTitle: title, 
            productImageURL: imageUrl, 
            productDescription: description
        });
    };
    // return {type: UPDATE_PRODUCT, productId: id, productTitle: title, productImageURL: imageUrl, productDescription: description};
};
