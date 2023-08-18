 import React, { createContext, useEffect, useState } from 'react';
import {BrowserRouter, Routes, Route, useNavigate, Router, Outlet } from 'react-router-dom';
import HomePage from './views/HomePage';
import RegisterPage from './views/RegisterPage';
import LoginPage from './views/LoginPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RecoverPassword from './views/RecoverPassword';
import ChangePasswordPage from './views/ChangePasswordPage';
import RegisterTable from './views/Tables/RegisterTable';
import UserTable from "./views/Tables/UserTable";
import PerfilTable from "./views/Tables/PerfilTable";
import UsuarioPerfilTable from './views/Tables/UsuarioPerfilTable';
import PersonaTable from './views/Tables/PersonaTable';
import  translations  from './translations.js';
import { MyContext } from './context';
import { dataBaseIp, dataBasePort } from './Backend';
import { ApiGetRequest } from './components/request/Crud/ApiGetRequest';
import ChatRoom from './views/ChatRoom';
import ChattingPage from './views/ChattingPage';



const App = () => {


const [locale, setLocale] = useState("EN_EN");
const [isLogged,setIsLogged] =useState(false);
const [localeJson, setLocaleJson] = useState(translations.es);
  console.log(isLogged);

  const ContextData = 
  {
    localeJson, 
    setLocaleJson,
    locale,
    setLocale,
    isLogged,
    setIsLogged
  }


const checkAuth = () => {
  const token = localStorage.getItem('token');
  if (token) {
    // usuario no autenticado, redirigir al login
    console.log("esta logueado: " + token);
     // validar token en el backend
  
 
};
}

const getIdiom = async () => {
  console.log("se ejecuta el idiom");
  


  const requestBody = {
    busqueda: locale
  };

  
  await ApiGetRequest(
    
    `http://${dataBaseIp}:${dataBasePort}/api/idioma/getidioma`,
    requestBody
 
  )
    .then((data) => {
      if (data.data) {
        console.log(data);
        setLocaleJson(data?.data);
        
      }
    })
    .catch((error) => {
     console.log("error")
    });
}


 
useEffect(() => {
  const logged = JSON.parse(localStorage.getItem('isLogged'));
 console.log(logged);
    if (logged) {
    setIsLogged(logged);
    } 
    console.log("se ejecuta el useeffect logged")
   
  }, [isLogged]);

 
  useEffect(() => {
  const savedLocale = localStorage.getItem('locale');
    if (savedLocale) {
    setLocale(savedLocale);
    } 
    getIdiom();
    console.log("se ejecuta el useeffect")
   
  }, [locale]);


  return (
   <>
       <MyContext.Provider value={ContextData}>
     <LocalizationProvider dateAdapter={AdapterDayjs}>
     <BrowserRouter basename='/'>
     <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/recoverpassword" element={<RecoverPassword/>}/>
      <Route path="/changepassword" element={<ChangePasswordPage/>}/>
      <Route path="/registercrud" element={<RegisterTable/>}/>
      <Route path="/usercrud" element={<UserTable/>}/>
      <Route path="/perfilcrud" element={<PerfilTable/>}/>
      <Route path="/usuarioperfilcrud" element={<UsuarioPerfilTable/>}/>
      <Route path="/usuarioperfilcrud" element={<UsuarioPerfilTable/>}/>
      <Route path="/personacrud" element={<PersonaTable/>}/>
      <Route path="/chattingroom" element={<ChattingPage/>}/>
      <Route path="/chatroom" element={<ChatRoom/>}/>
      <Route path="/store/*" element={<Outlet />}> 
      {/* Outlet para renderizar las rutas secundarias */}
      <Route index element={<HomePage />} /> {/* Renderiza el componente SectionStore */}
          {/* Otras rutas secundarias para /store si es necesario */}
        </Route>
     </Routes>
   </BrowserRouter>
    </LocalizationProvider>
    </MyContext.Provider>
    </>
  );
};

export default App;