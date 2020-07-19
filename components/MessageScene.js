import React from 'react';
import {
    Text,
    View,
} from 'react-native';

// constants import 
import DefaultStyles from '../constants/DefaultStyle';
import Colors from '../constants/Colors';

const MessageScene = (props) => {
  return (
    <View style={{...DefaultStyles.full, backgroundColor:Colors.light}}>
        <Text>{props.title}</Text>
        <Text style={DefaultStyles.textHighlight}>{props.message}</Text>
        {props.children}
    </View>
    
  );
};
export default MessageScene;
