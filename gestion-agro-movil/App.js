import * as React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from "./views/HomePage";
import MainStack from './navigation/MainStack';
import { NavigationContainer } from '@react-navigation/native';
import AppBarComponent from './components/AppBarComponent';




function App() {
  return (
    <NavigationContainer>
      <AppBarComponent/>
   <MainStack/>

</NavigationContainer>




  );
}

export default App;