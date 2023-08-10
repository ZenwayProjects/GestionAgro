import { Text } from "react-native";
import { Button, View } from "react-native";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useNavigation } from '@react-navigation/native';
import { TextInput } from "@react-native-material/core";



const HomePage = () => {
  const navigation = useNavigation();



  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState("");
 

 


  return ( 
    <View>
      <Text>HomePage</Text>
      <TextInput 
      value={userName}
      onChangeText={(e)=> setUserName(e)}
      placeholder="Ingresa el username aquí"
      />
      <Button
        variant="text"
        title="Ingresar"
        onPress={() => navigation.navigate('NotificationsPage',  { userName: userName })}
        compact
        style={{ marginEnd: 4 }}
      />
    <Text>{message?.message}</Text>
 
    </View>
  );
}

export default HomePage;
