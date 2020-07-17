import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';


// constants import 
import DefaultStyles from '../constants/DefaultStyle';
import Colors from '../constants/Colors';

//custom import
import Icon from 'react-native-vector-icons/FontAwesome';



const CartItem = (props) => {
    const id = props.id;
    const title = props.title;
    const price = props.price;
    const total = props.total;
    const quantity = props.quantity;

    return (
        <View style={styles.container}>
            <Text>{quantity}</Text>
            <Text>{title}</Text>
            <Text>{total}</Text>
            <TouchableOpacity onPress={() => props.onRemove(id)}>
                <Icon name="minus" size={23} color="#ccc" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        backgroundColor: '#fff',
        padding: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }

});

export default CartItem;
