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
    const deleteFromCartHandler = () => {
        console.log(props.id);
    }

    return (
        <View style={styles.container}>
            <Text>{props.quantity}</Text>
            <Text>{props.title}</Text>
            <Text>{props.priceUnity * props.quantity}</Text>
            <TouchableOpacity onPress={deleteFromCartHandler}>
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
