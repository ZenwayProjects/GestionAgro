import React, { useState } from "react";
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, InputAdornment, IconButton} from "@mui/material/";
import InputLabel from '@mui/material/InputLabel';
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from "yup";
import { Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    textField: {
      margin: theme.spacing(1),
      width: '100%',
    },
    button: {
      margin: theme.spacing(2),
    },
  }));


export default function RecoverPasswordForm() {

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const classes = useStyles();
    const theme = createTheme();
  

  const formSchema = Yup.object().shape({
    oldPassword:Yup
    .string()
    .required('Campo Requerido'),

    password:Yup
    .string()
    .required()
    .matches("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$","La contraseña debe contener minimo una mayuscula, un número y un caracter especial"),

confirmPassword: Yup
  .string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match') 

  })

    return(
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
          <Typography component="h1" variant="h4" >
         Cambiar contraseña 
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
         <Typography component="h5" variant="h6" 
        style={{textAlign:"center", marginBottom:20}}
         >
             Ingresa los datos para cambiar la contraseña
          </Typography>
          <Typography variant="subtitle2">
        Ingresa tu contraseña actual:
          </Typography>
         
    <TextField
    
              fullWidth      
              required
              id="oldPassword"
              style={{ width: '100%', marginBottom:5 }}
              label="Contraseña actual"
              name="oldPassword"
              autoFocus
              value={values.oldPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={errors.oldPassword && touched.oldPassword}
              helperText={errors.oldPassword}
              type={showOldPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment:
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowOldPassword}
          
              edge="end"
            >
              {showOldPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        
      }}
            />

               

<Typography variant="subtitle2">
        Ingresar nueva contraseña:
</Typography>    
    <TextField
    fullWidth      
    required
    id="password"
    style={{ width: '100%', marginBottom:5 }}
    label="Nueva Contraseña"
    name="password"
    value={values.password}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.password && touched.password}
    helperText={errors.password}
    type={showNewPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment:
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowNewPassword}
              edge="end"
            >
              {showNewPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        
      }}
  />

<Typography variant="subtitle2">
        confirmar nueva contraseña:
          </Typography>
     
     <TextField
    
    fullWidth      
    marginTop="normal"
    required
    id="confirmPassword"
    style={{ width: '100%', marginBottom:5 }}
    label="Nueva contraseña"
    name="confirmPassword"
   
    value={values.confirmPassword}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.confirmPassword && touched.confirmPassword}
    helperText={errors.confirmPassword}
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
    
       
    
)
}

