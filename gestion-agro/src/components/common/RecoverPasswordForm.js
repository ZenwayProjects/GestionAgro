import React, { useState } from "react";
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container,Divider } from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from "yup";
import { Formik } from "formik";




const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

}));


export default function RecoverPasswordForm() {




    const classes = useStyles();
    const theme = createTheme();
  
    
  
  
  const formSchema = Yup.object().shape({
    email:Yup.string().email("Porfavor ingresar un email valido").required('Campo Requerido'), 
  })


  return (
    <Container  component="main"  maxWidth="md" style={{padding:"80px 0"}}>
    <CssBaseline />
    <Box
      style={{
        marginTop:8,
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }} fullWidth>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5" >
     Recuperar contraseña
      </Typography>
     
      <Box
         md={{ mt: 4 }}
        sx={{ mt: 4 }}
        style={{width:"100%"}}
      >


        <Formik 
      
    initialValues={{
     email:"",
    }}

validationSchema = {formSchema}

     onSubmit={(submitValues)=>{
      console.log(submitValues);
     }}
    >
     {({handleSubmit,values, handleChange , handleBlur, errors, touched})=>(
      
<form onSubmit={handleSubmit} >
     <Typography component="h5" variant="subtittle1" 
    style={{textAlign:"center"}}
     >
     	Ingresa tu correo electrónico para buscar tu cuenta.
      </Typography>

<TextField

          fullWidth      
          margin="normal"
          required
          id="email"
          style={{ width: '100%' }}
          label="Correo electronico o usuario"
          name="email"
          autoComplete="email o usuario"
          autoFocus
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email && touched.email}
          helperText={errors.email}
        />
       

        <Grid  container spacing={1} style={{flexDirection:"row-reverse"}} >
        <Grid item >
      <Button 
          type="submit"
          variant="contained"
          sx={{ mt: 3, mb: 2 }}

        >
          Ingresar
        </Button>
      </Grid>

            < Grid item >
            <Button
          type="submit"
     
          
          variant="outlined"
          sx={{ mt: 3, mb: 2 }}

        >
          Cancelar
        </Button>
            </Grid>
      
     
        

        </Grid>
               
       

</form>


) }

    </Formik>
        
      </Box>
    </Box>
  </Container>

   



  );
}

