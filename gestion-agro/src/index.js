import React, { createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './views/HomePage';
import RegisterPage from './views/RegisterPage';
import LoginPage from './views/LoginPage';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RecoverPassword from './views/RecoverPassword';
import ChangePasswordPage from './views/ChangePasswordPage';
import RegisterTable from './views/Tables/RegisterTable';

const MyContext = createContext();


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <MyContext.Provider >
     <LocalizationProvider dateAdapter={AdapterDayjs}>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/recoverpassword" element={<RecoverPassword/>}/>
      <Route path="/changepassword" element={<ChangePasswordPage/>}/>
      <Route path="/registercrud" element={<RegisterTable/>}/>

     </Routes>
   </BrowserRouter>
    </LocalizationProvider>
    </MyContext.Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

