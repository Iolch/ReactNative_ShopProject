import Strings from '../../constants/Strings';
import Order from '../../models/order';

export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDERS = 'SET_ORDERS';


export const fetchOrders = () => {
    
    return async (dispatch, getState) => {
        try{
            const token = getState().authReducer.token;
            const userId = getState().authReducer.userId;

            const response = await fetch(Strings.datasetUrl+`orders/${userId}.json?auth=${token}`);     //the default is a method get
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
            console.log(err);
            throw err;
        }
        
    };
};
export const addOrder = (cartItems, totalAmount) => {
    return async (dispatch, getState) => {
        try{
            const token = getState().authReducer.token;
            const userId = getState().authReducer.userId;
            
            const date = new Date();    
            const response = await fetch(Strings.datasetUrl+`orders/${userId}.json?auth=${token}`,{
                method: 'POST', 
                headers:{'Content-Type': 'application/json'},
                body: JSON.stringify({cartItems, totalAmount, date: date.toISOString() })

            });
            if(!response.ok){
                const errorData = await response.json();
                throw new Error ('Something went wrong');
            }
            const responseData = await response.json();
           

            dispatch({
                type: ADD_ORDER, 
                id: responseData.name,
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
