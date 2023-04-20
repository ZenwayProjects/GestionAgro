import { IconButton, Stack, TextInput, Text, Button, Avatar } from "@react-native-material/core";
import { View, StyleSheet } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { useNavigation } from '@react-navigation/native';



const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
  },
  inputView: {
    width: "70%",
  },
  avatar: {
    marginTop: "30%",
    marginBottom: 20,
  }

});



const LoginPage = () => {

  const [formValues, setFormValues]= useState({email:"",password:""});
  const navigation = useNavigation();
  const [hidePass, setHidePass] = useState(true);
  const [showErrorPassword, setShowErrorPassword] = useState();
  const [showErrorEmail, setShowErrorEmail] = useState();



  const signIn = () => {                          // <= Added this function
    const emailStrongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
    const passwordStrongRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$");

    let itsOkey = true;

    if (!emailStrongRegex.test(formValues.email)) {
      setShowErrorEmail(true);
      itsOkey=false;
    } else {
      setShowErrorEmail(false);
    }

    if (!passwordStrongRegex.test(formValues.password)) {
      setShowErrorPassword(true);
      itsOkey=false;
    } else {
      setShowErrorPassword(false);
    }
    
    if(itsOkey==true){
      console.log("entra");
      loginValidateAccount(formValues);
    }


  }

  const loginValidateAccount = (Data)=>{
    //Fetch o axios -> enviar data al backend;
    console.log(Data);
  }
  
  return (
    <Stack spacing={6} style={styles.container}>
      <Avatar style={styles.avatar}
        size={96} icon={props => <Icon name="account" {...props} />} />
      <Stack spacing={0} style={styles.inputView}>
        <Text variant="caption" >Correo:</Text>
        <TextInput
          helperText={showErrorEmail && "error email"}
          name="email"
          placeholder="Correo"
          variant="outlined"
          onChangeText={(email) => setFormValues({...formValues,email:email})}
          leading={props => <Icon name="account" {...props} />}
        />
      </Stack>
      <Stack spacing={0} style={styles.inputView}>
        <Text variant="caption" >Contraseña:</Text>
        <TextInput
          helperText={showErrorPassword && "error password"}
          onChangeText={(password) => setFormValues({...formValues, password:password})}
          variant="outlined"
          name="password"
          placeholder="Contraseña"
          secureTextEntry={hidePass}
          trailing={props => (
            <IconButton
              onPress={() => { setHidePass(!hidePass) }}
              icon={props => <Icon name="eye" {...props} />} {...props}
            />
          )}
        />
      </Stack>

      <Text variant="subtitle2" style={{ color: "blue" }}>
        Olvidé mi contraseña
      </Text>
      <Text variant="subtitle2" >
        No tienes una cuenta?
        <Text onPress={() => navigation.navigate("RegisterPage")} variant="subtitle2" style={{ color: "blue" }}> Registrate</Text>
      </Text>
      <Button title="Ingresar"
        onPress={() => signIn()}
        trailing={props => <Icon name="send" {...props} />}
        style={{ marginTop: 20 }} />
    </Stack>
  );
}

export default LoginPage;