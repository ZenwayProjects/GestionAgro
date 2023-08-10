import React, { useState } from "react";
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container} from "@mui/material/";

import AppBarComponent from "../components/layouts/AppBarComponent";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import RecoverPasswordForm from "../components/common/RecoverPasswordForm";
  

 
  
  export default function RecoverPassword() {
    


  
    return (
        <>
        <AppBarComponent/>
       <ForgotPasswordForm/>
       
       </>
        
    );
  }