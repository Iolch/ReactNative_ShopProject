import React, {
    useCallback
} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

// constants import 
import DefaultStyle from '../constants/DefaultStyle';

const ProductItem = (props) => {
    const id = props.id;
    const title = props.title;
    const price = props.price;
    const image = props.image;
    const navigation = props.navigation;

   
    return (
        <TouchableOpacity onPress={()=>props.onSelect(id, title)} >
            <View style={styles.card}>
                <View style={styles.imageContainer}> 
                    <ImageBackground source={{uri: image}} style={styles.image}>
                    </ImageBackground>
                </View>
                <View style={styles.cardDetail}>
                    <View style={styles.textContainer}>
                        <Text style={DefaultStyle.textHighlight}> {title}</Text>
                        <Text>$ {price}</Text>
                    </View>
                    <View style={styles.row}>
                        {props.children}
                    </View>
                </View>
                
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card:{
        backgroundColor: '#fff',
        width: '100%',
        height: 250,
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
        maxHeight: 150,
        alignItems:'center',
    },
    textContainer:{
        width:'100%',
        height: 50,
        alignItems:'center',
        justifyContent: 'center'
    },
    row:{
        width:'100%',
        flexDirection:'row',
        justifyContent:'space-evenly',
        padding: 10,
    },
});

export default ProductItem;
