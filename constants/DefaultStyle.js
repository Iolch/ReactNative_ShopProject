import {
    StyleSheet,
  } from 'react-native';

import Colors from '../constants/Colors';

  export default StyleSheet.create({
    screen:{
        flex: 1,
        padding:20,
        alignItems: 'center',
        backgroundColor: Colors.light
    },
    row:{
      flexDirection: 'row',
      width: '100%',
      padding: 10,
      backgroundColor: '#fff',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginVertical: 20

    }, 
    full:{
      flex: 1,
      padding:10,
      justifyContent:'center',
      alignItems: 'center',
    },
    textCenter:{
      textAlign: 'center'
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