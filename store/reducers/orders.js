import {SET_ORDERS, ADD_ORDER} from '../actions/orders';
import Order from '../../models/order';

const initialState = {
    orders:[]
};
const OrderReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_ORDERS:
            return {...state, orders: action.orders};
        case ADD_ORDER:
            //id, items, totalAmount, date
            const newOrder = new Order(action.id, action.items, action.totalAmount, action.date);
            return {...state, orders: state.orders.concat(newOrder)};
        default:
            return state;
    }
    return state;
}
export default OrderReducer;