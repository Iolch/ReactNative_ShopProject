import React from 'react';

// this package makes it easy to add buttons to header
import { HeaderButton } from 'react-navigation-header-buttons';

//this package will allow us to use icons
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  Platform,
} from 'react-native';

const CustomHeaderButton = (props) => {
  return (
    <HeaderButton
        {...props}
        IconComponent={Icon}
        iconSize={23}
        color= {Platform.OS ===  'android' ? 'white' : 'black'}
        />
  );
};

export default CustomHeaderButton;
