import  React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../views/HomePage';
import RegisterPage from '../views/RegisterPage';
import LoginPage from '../views/LoginPage';


const Stack = createNativeStackNavigator();

function MainStack() {
  return (

      <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="HomePage">
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="RegisterPage" component={RegisterPage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
      </Stack.Navigator>

  );
}

export default MainStack;