import React from 'react';
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

const ProductItem = (props) => {
    const id = props.id;
    const title = props.title;
    const price = props.price;
    const image = props.image;
    return (
        <View style={styles.card}>
            <View style={styles.imageContainer}> 
                <ImageBackground source={{uri: image}} style={styles.image}>
                </ImageBackground>
            </View>
            <View style={styles.cardDetail}>
                <Button title='More' onPress={()=> props.navigation.navigate({routeName:'ProductsDetailRoute', params:{productId: id, productTitle:title}})}/>
                <Text>$ {price}</Text>
                <Button title='Cart' onPress={() => props.navigation.navigate({routeName:'CartRoute', params:{productId: id}})}/>
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
