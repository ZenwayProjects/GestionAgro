import React, { useState } from "react";
import { Stack, TextInput, IconButton, Box, VStack, HStack, Flex, Text, Spacer, Wrap, Button } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, View,ScrollView } from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const RegisterPage = () => {

  const [formValues, setFormValues]= useState({
    firstName:"",
    lastName:"",
    userName:"",
    email:"",
  password:"",
  typeIdentification:"",
  numberIdentification:"",
  phoneNumber:"",
  address:""
});

  const [hidePass, setHidePass] = useState(true);
  const [showErrorPassword, setShowErrorPassword] = useState();
  const [showErrorEmail, setShowErrorEmail] = useState();


  const signUp = () => {                          // <= Added this function
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

    console.log(formValues);


  }

  const loginValidateAccount = (Data)=>{
    //Fetch o axios -> enviar data al backend;
    console.log(Data);
  }
  
  const types = ["T.I.", "C.C.", "R.C.", "C.E.", "NUIP", "NES"]
  return (
<ScrollView>
    <Stack spacing={3} style={{ margin: 16, }}>
      <Text variant="h4" style={{ alignSelf: "center", paddingBottom: 10 }}>Registro</Text>
      <HStack style={{ height: 160 }}>
        <Icon name="account" style={{ width: 80, alignSelf: "center", color: "#646464" }} size={80} />
        <Box style={{ flex: 1 }} >
          <Text variant="caption" >Nombre:</Text>
          <TextInput style={{ flex: 1 }}
            variant="outlined"
            placeholder="Inserta tu nombre"
            onChangeText={(e) => setFormValues({...formValues,firstName:e})}
          />
          <Text variant="caption" >Apellido:</Text>
          <TextInput style={{ flex: 1, }}
            variant="outlined"
            placeholder="Inserta tu apellido"
            onChangeText={(e) => setFormValues({...formValues,lastName:e})}
          />
        </Box>


      </HStack>


     
     <HStack spacing={6} >
       <Icon name="account-circle" style={{ paddingTop:15, alignSelf: "center", color: "#646464" }} size={40} />
       <Box style={{ flex: 1 }}>
       <Text variant="caption" >Usuario:</Text>
       <TextInput 
         variant="outlined"
         placeholder="Inserta el nombre de usuario"
         onChangeText={(e) => setFormValues({...formValues,userName:e})}
       
       />
      </Box>
     </HStack>
     


     <HStack spacing={6} >
       <Icon name="email-open-outline" style={{ paddingTop:15, alignSelf: "center", color: "#646464" }} size={40} />
       <Box style={{ flex: 1 }}>
       <Text variant="caption" >Correo:</Text>
       <TextInput 
       helperText={showErrorEmail && "ingresa un correo valido"}
         variant="outlined"
         placeholder="Inserta tu correo electrónico"
         onChangeText={(e) => setFormValues({...formValues,email:e})}
       />
      </Box>
     </HStack>

     <HStack spacing={6} >
       <Icon name="lock" style={{ paddingTop:15, alignSelf: "center", color: "#646464" }} size={40} />
       <Box style={{ flex: 1 }}>
       <Text variant="caption" >Contraseña:</Text>
       <TextInput
          helperText={showErrorPassword && "la contraseña debe contener almenos 1 mayuscula, 1 número y 1 signo especial."}
          onChangeText={(e) => setFormValues({...formValues,password:e})}
          variant="outlined"
          placeholder="Contraseña"
          secureTextEntry={hidePass}
          trailing={props => (
            <IconButton
              onPress={() => { setHidePass(!hidePass) }}
              icon={props => <Icon name="eye" {...props} />} {...props}
            />
          )}
        />
      </Box>
     </HStack>
     



      <HStack spacing={6} >
        <Icon name="card-account-details-outline" style={{ alignSelf: "center", color: "#646464" }} size={40} />

        <SelectDropdown
            data={types}
            style={{width:"25%"}}
            // defaultValueByIndex={1}
            // defaultValue={'Egypt'}
            onSelect={(selectedItem, index) => {
              console.log(selectedItem, index);
            }}
            defaultButtonText={'Tipo'}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={isOpened => {
              return <FontAwesome name={isOpened ? 'chevron-up' : 'chevron-down'} color={'#444'} size={18} />;
            }}
            dropdownIconPosition={'right'}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />


        <TextInput style={{ flex: 1 }}
          variant="outlined"
          placeholder="Número"
          onChangeText={(e) => setFormValues({...formValues,numberIdentification:e})}
          keyboardType="numeric"
        />
      </HStack>



      <Box >
     
      <HStack spacing={6} >
        <Icon name="phone" style={{paddingTop:10,  alignSelf: "center", color: "#646464" }} size={40} />
        <Box style={{ flex: 1 }}>
        <Text variant="caption" >telefono:</Text>
        <TextInput 
          variant="outlined"
          placeholder="Inserta tu número"
          onChangeText={(e) => setFormValues({...formValues,phoneNumber:e})}
          keyboardType="numeric"
        />
       </Box>
      </HStack>
      </Box>


      <Box  >
        <Text variant="caption" >Dirección:</Text>
        <TextInput
          variant="outlined"
          placeholder="Ingresa tu dirección"
          leading={props => <Icon name="map-marker" {...props} />}
          onChangeText={(e) => setFormValues({...formValues,address:e})}

        />
      </Box>

      <Button title="Ingresar"
        onPress={() => signUp()}
        trailing={props => <Icon name="send" {...props} />}
        style={{ marginTop: 20 }} />

    </Stack>
    </ScrollView>
  );
}





export default RegisterPage;

const styles = StyleSheet.create({
 
  shadow: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F6F6F6',
  },
  headerTitle: {color: '#000', fontWeight: 'bold', fontSize: 16},
  saveAreaViewContainer: {flex: 1, backgroundColor: '#FFF'},
  viewContainer: {flex: 1, backgroundColor: '#FFF'},
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: '10%',
    paddingBottom: '20%',
  },

  dropdown1BtnStyle: {
    width: '30%',
    marginLeft:5,
    height: 54,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#808080',
  },
  dropdown1BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown1DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown1RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown1RowTxtStyle: {color: '#444', textAlign: 'left'},

  dropdown2BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#444',
    borderRadius: 8,
  },
  dropdown2BtnTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dropdown2DropdownStyle: {
    backgroundColor: '#444',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  dropdown2RowStyle: {backgroundColor: '#444', borderBottomColor: '#C5C5C5'},
  dropdown2RowTxtStyle: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  dropdown3BtnStyle: {
    width: '80%',
    height: 50,
    backgroundColor: '#FFF',
    paddingHorizontal: 0,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#444',
  },
  dropdown3BtnChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdown3BtnImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3BtnTxt: {
    color: '#444',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },
  dropdown3DropdownStyle: {backgroundColor: 'slategray'},
  dropdown3RowStyle: {
    backgroundColor: 'slategray',
    borderBottomColor: '#444',
    height: 50,
  },
  dropdown3RowChildStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  dropdownRowImage: {width: 45, height: 45, resizeMode: 'cover'},
  dropdown3RowTxt: {
    color: '#F1F1F1',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    marginHorizontal: 12,
  },

  dropdown4BtnStyle: {
    width: '50%',
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
  },
  dropdown4BtnTxtStyle: {color: '#444', textAlign: 'left'},
  dropdown4DropdownStyle: {backgroundColor: '#EFEFEF'},
  dropdown4RowStyle: {backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5'},
  dropdown4RowTxtStyle: {color: '#444', textAlign: 'left'},

});