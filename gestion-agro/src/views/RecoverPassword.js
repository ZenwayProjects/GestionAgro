import React, { useState } from "react";
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container} from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from "yup";
import { Formik } from "formik";
import AppBarComponent from "../components/layouts/AppBarComponent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RecoverPasswordForm from "../components/common/RecoverPasswordForm";
  

 
  
  export default function RecoverPassword() {
    


  
    return (
        <>
        <AppBarComponent/>
       <RecoverPasswordForm/>
       
       </>
        
    );
  }