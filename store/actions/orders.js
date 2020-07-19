import Strings from '../../constants/Strings';
import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';


export const fetchOrders = () => {
    
    return async dispatch => {
        try{
            const response = await fetch(Strings.datasetUrl+'orders/u1.json');     //the default is a method get
            const responseData = await response.json();
            if(!response.ok){
                throw new Error('Problems with the consult.');
            }

            // so this is like this because of the way we retrieve the data from firedatabase

            let loadedOrders = [];
            for (const key in responseData){
                loadedOrders.push(new Order (key, 
                                            responseData[key].cartItems, 
                                            responseData[key].totalAmount, 
                                            responseData[key].date));
            }
           
            dispatch({
                type:SET_ORDERS, 
                orders:loadedOrders
            });
        }catch (err){
            throw err;
        }
        
    };
};
export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {
        try{
            const date = new Date();
            const response = await fetch(Strings.datasetUrl+'orders/u1.json',{
                method: 'POST', 
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({cartItems, totalAmount, date: date.toISOString() })

            });
            if(!response.ok){
                throw new Error ('Something went wrong');
            }
            const responseData = await response.json();

            dispatch({
                id: responseData.name,
                type: ADD_ORDER, 
                items: cartItems, 
                totalAmount: totalAmount,
                date: date
            });
        }catch(err){
            throw err;
        }
    };
    // return {type: ADD_ORDER, items: cartItems, totalAmount: totalAmount};
};
