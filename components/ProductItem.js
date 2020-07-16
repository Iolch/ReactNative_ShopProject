import React, {
    useCallback
} from 'react';
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// constants import 
import DefaultStyle from '../constants/DefaultStyle';
import Colors from '../constants/Colors';

// redux
import {useDispatch} from 'react-redux';
import {addToCart} from '../store/actions/products';

const ProductItem = (props) => {
    const id = props.id;
    const title = props.title;
    const price = props.price;
    const image = props.image;
    const navigation = props.navigation;

    const dispatch = useDispatch();
    const addToCartHandler = () => {  
        dispatch(addToCart(id));  
        navigation.navigate({routeName:'CartRoute'});
    };

    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}> 
                <ImageBackground source={{uri: image}} style={styles.image}>
                </ImageBackground>
            </View>
            <View style={styles.cardDetail}>
                <Button title='More' onPress={()=> navigation.navigate({routeName:'ProductsDetailRoute', params:{productId: id, productTitle:title}})}/>
                <Text>$ {price}</Text>
                <Button title='Cart' onPress={addToCartHandler}/>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    card:{
        backgroundColor: '#fff',
        width: '100%',
        height: 200,
        justifyContent:'flex-end',
        marginVertical: 10,
    },
    imageContainer:{
        flex:1,
        backgroundColor:'#000'
    },
    image:{
        width:'100%',
        height: '100%',
        justifyContent: 'center',
    },
    cardDetail:{
        width:'100%',
        height: 50,
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
    }
});

export default ProductItem;
