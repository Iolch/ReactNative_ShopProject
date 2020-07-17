import {ADD_ORDER} from '../actions/orders';
import Order from '../../models/order';

const initialState = {
    orders:[]
};
const OrderReducer = (state = initialState, action) => {
    switch(action.type){
        case (ADD_ORDER):
            //id, items, totalAmount, date
            const newOrder = new Order(new Date().toString(), action.items, action.totalAmount, new Date().toString());
            return {...state, orders: state.orders.concat(newOrder)};
        default:
            return state;
    }
    return state;
}
export default OrderReducer;