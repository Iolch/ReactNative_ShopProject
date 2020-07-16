import {
    StyleSheet,
  } from 'react-native';

import Colors from '../constants/Colors';

  export default StyleSheet.create({
    screen:{
        flex: 1,
        padding:20,
        alignItems: "center",
        backgroundColor: Colors.light
    },
    full:{
      flex: 1,
      padding:10,
      justifyContent:"center",
      alignItems: "center",
    },
    textHighlight:{
      color: Colors.primary,
      fontWeight:'bold',
    },
    title:{
      fontWeight:'bold',
      fontSize: 24,
    }
  });