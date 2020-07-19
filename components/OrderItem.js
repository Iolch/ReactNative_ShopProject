import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// components import 
import CartItem from '../components/CartItem';

// constants import 
import DefaultStyles from '../constants/DefaultStyle';

const OrderItem = (props) => {
    const id = props.id;
    let date = props.date;
    const items = props.items;
    const totalAmount = props.totalAmount;

    const renderProductItem = (itemData) => {
        return (
            <CartItem
                id={itemData.item.id}
                title={itemData.item.title}
                quantity={itemData.item.quantity}
                price={itemData.item.price} 
                total = {itemData.item.total}
                canRemove = {false}
            />
        );
    };
    return (
        <View style={styles.card}>
            <View tyle={styles.container}>
                <FlatList data={items} renderItem={renderProductItem}/>
            </View>
            <View style={styles.cardDetail}>
                <Text style={DefaultStyles.textHighlight}>${totalAmount}</Text>
                <Text style={{color:'#cccccc'}}>{date.split('T')[0]}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card:{
        backgroundColor: '#fff',
        width: '100%',
        maxHeight: 200,
        justifyContent:'flex-end',
        marginVertical: 10,
        borderRadius:2,
        elevation: 5,
    },
    container:{
        width:'100%',
        backgroundColor:'#000'
    },
    cardDetail:{
        width:'100%',
        height: 50,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
    }
});

export default OrderItem;
