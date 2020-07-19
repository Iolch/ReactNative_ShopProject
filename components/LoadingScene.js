import React from 'react';
import {
    ActivityIndicator,
    View,
} from 'react-native';

// constants import 
import DefaultStyles from '../constants/DefaultStyle';
import Colors from '../constants/Colors';

const LoadingScene = (props) => {
  return (
    <View style={{...DefaultStyles.full, backgroundColor:Colors.light}}>
        <ActivityIndicator size='large' color={Colors.secondary}/>
    </View>
  );
};
export default LoadingScene;
