import{ useState } from "react";
import Constants from "expo-constants";
import * as React from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import {
  AppBar,
  IconButton,
  Button,
  Avatar,
} from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    appbar:{
        marginTop:Constants.statusBarHeight
    }
})

const AppBarComponent = () => {
  const navigation = useNavigation();
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <AppBar
      title="Title"
      style={styles.appbar}
      leading={props => (
        <IconButton
          icon={props => <Icon name="menu" {...props} />}
          {...props}
        />
        
      )}
      trailing={props =>
        loggedIn ? (
          <IconButton
            icon={<Avatar label="Yaman KATBY" size={28} />}
            onPress={() => setLoggedIn(!loggedIn)}
            {...props}
          />
        ) : (

       
         <Button
            variant="text"
            title="Ingresar"
            onPress={() => navigation.navigate('LoginPage')}
            compact
            style={{ marginEnd: 4 }}
            {...props}
          />
          
        

         
        )

        
      }
    />
  );
};

export default AppBarComponent;