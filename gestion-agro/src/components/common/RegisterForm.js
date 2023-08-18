
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, MenuItem, Select, FormControl, InputLabel, IconButton } from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import { useState } from "react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { dataBaseIp, dataBasePort } from "../../Backend";
import { ApiPostRequest } from "../request/Crud/ApiPostRequest";




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

export default function RegisterForm() {

  const [value, setValue] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const classes = useStyles();

  //Validacion regex de la contraseña
const regexPassword ="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$";

//Requerimientos necesarios para cada campo
  const formSchema = Yup.object().shape({
    firstName:Yup.string().required('Campo Requerido'),
    lastName:Yup.string().required("Campo Requerido"),
    userName:Yup.string().required(),
    email:Yup.string().email().required("El correo es requerido"),
    password:Yup.string().required().matches(regexPassword,"La contraseña debe contener minimo una mayuscula, un número y un caracter especial"),
    typeIdentification:Yup.string().required(),
    address:Yup.string().required(),
    phone:Yup.number().required(),
    idNum:Yup.string().required(),
    genre:Yup.string().required(),
  
  })

  // Funcion para la peticion post con los datos ingresados
  const sendRegister = async (submitValues) => {

    const post = {
      nombre:submitValues.firstName,
      apellido:submitValues.lastName,
      genero: submitValues.genre,
      fechaNacimiento:submitValues.birthDate,
      direccion:submitValues.address,
      telefono:submitValues.phone,
      email:submitValues.email,
      estado:0,
      identificacion:submitValues.idNum,
      tipoIdentificacion:submitValues.typeIdentification,
      login:submitValues.email,
      password: submitValues.password
      }
      console.log(post);

      ApiPostRequest(`http://${dataBaseIp}:${dataBasePort}/api/auth/register`, post);
   
  }


  

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registrate
        </Typography>

        <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          userName: "",
          email: "",
          password: "",
          typeIdentification:"",
          address: "",
          phone:"",
          idNum:"",
          genre:"",
          birthDate:Date.now(),
        }}

validationSchema = {formSchema}
  
         onSubmit={(submitValues)=>{
          //Llamando a la funcion de registro de datos
       sendRegister(submitValues);
       
         }}
        >
         {({handleSubmit,values, handleChange , handleBlur, errors, touched, setFieldValue})=>(
          
<form className={classes.form} onSubmit={handleSubmit}>

<Grid container spacing={2}>

  {/* Input Nombre */}
  <Grid item xs={12} sm={3}>
    <TextField
     type="text"
      autoComplete="fname"
      name="firstName"
      variant="outlined"
      fullWidth
      required
      id="firstName"
      label="Nombre"
      value={values.firstName}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.firstName && touched.firstName}
      helperText={errors.firstName}
    />

  {/* Input Apellido */}
  </Grid>
  <Grid item xs={12} sm={3}>
    <TextField
     type="text"
      variant="outlined"
      required
      fullWidth
      id="lastName"
      label="Apellido"
      name="lastName"
      autoComplete="lname"
      value={values.lastName}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.lastName && touched.lastName}
      helperText={errors.lastName}
    />
  </Grid>

  <Grid item xs={12} sm={6}>

    <Grid container spacing={0}>

      {/* Select del Tipo de identificacion */}
      <Grid item xs={2} sm={3}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Tipo</InputLabel>
          <Select
            native
            variant="outlined"
            required
            fullWidth
            label="tipo"
            name="typeIdentification"    
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option default aria-label="None" value="" />
            <option value="CC">C.C.</option>
            <option value="TI">T.I.</option>
            <option value="DNI">DNI</option>
            <option value="PP">Pasaporte</option>
            <option value="NIT">NIT</option>
            <option value="CIF">CIF</option>
          </Select>
        </FormControl>  
      </Grid>

        {/* Input Identificación */}
      <Grid item xs={10} sm={9}>
        <TextField  
         type="text"
          variant="outlined"
          required
          fullWidth
          id="idNum"
          label="Indentificación"
          name="idNum"
          InputProps={{
            endAdornment: <InputAdornment position="end"><AssignmentIndIcon /></InputAdornment>
          }}
          value={values.idNum}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.idNum && touched.idNum}
        />
      </Grid>

      
    </Grid>
  </Grid>


  {/* Input género */}
  <Grid item xs={12} sm={4}>
  <FormControl variant="outlined" style={{width:"100%"}} className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Género</InputLabel>
          <Select
            native
            variant="outlined"
            fullWidth
            label="tipo"
            name="genre"
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <option aria-label="None" value="" />
            <option value="M">Masculino</option>
            <option value="F">Femenino</option>
            <option value="O">Otro</option>
          </Select>
        </FormControl>
  </Grid>


 {/* Input Fecha -> Calendario */}
  <Grid item xs={12} sm={8} style={{alignContent:"center"}}>
 
  <DatePicker  
  label="Fecha de nacimiento"
  slotProps={{ textField:{fullWidth: true }}} 
   name="birthDate"
   id="birthDate"
   onChange={(value) => {
    setFieldValue('birthDate', value ? value.toISOString().slice(0, 10) : null);
    }}
   format="YYYY/MM/DD"
   />

  </Grid>

   {/* Input número telefónico */}
  <Grid item xs={12} sm={4}>
    <TextField
      type="number"
      variant="outlined"
      required  
      id="phone"
      label="número"
      name="phone"
      InputProps={{
        endAdornment: <InputAdornment position="start"><PhoneIcon/></InputAdornment>
      }}
      value={values.phone}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.phone&& touched.phone}
   
    />
  </Grid>

   {/* Input Dirección */}
  <Grid item xs={12} sm={8}>
    <TextField
     type="text"
      variant="outlined"
      required
      fullWidth
      id="address"
      label="Dirección"
      name="address"
      autoComplete="address"
      InputProps={{
        startAdornment: <InputAdornment position="start"><HomeIcon /></InputAdornment>
      }}
      value={values.address}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.address&& touched.address}
   
    />
  </Grid>

 {/* Input Usuario */}
  <Grid item xs={12}>
    <TextField
     type="text"
      variant="outlined"
      required
      fullWidth
      id="userName"
      label="Nombre de usuario"
      name="userName"
      autoComplete="userName"
      InputProps={{
        startAdornment: <InputAdornment position="start"><AccountCircle /></InputAdornment>
      }}
      value={values.userName}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.userName&& touched.userName}
    />
  </Grid>
  

   {/* Input Correo */}
  <Grid item xs={12}>
    <TextField
     type="text"
      variant="outlined"
      fullWidth
      id="email"
      label="Correo electrónico"
      name="email"
      autoComplete="email"
      InputProps={{
        startAdornment: <InputAdornment position="start"><EmailIcon /></InputAdornment>
      }}
      value={values.email}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.email&& touched.email}
    />
  </Grid>

   {/* Input Contraseña */}
  <Grid item xs={12}>
    <TextField
      variant="outlined"
      required
      fullWidth
      name="password"
      label="Contraseña"
      id="password"
      autoComplete="current-password"
      type={showPassword ? 'text' : 'password'}
      InputProps={{
        endAdornment:
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
          
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        
      }}
      value={values.password}
      onChange={handleChange}
      onBlur={handleBlur}
      error={errors.password && touched.password}
      helperText={errors.password}
    />
  </Grid>

   {/* Checkbox notificaciones */}
  <Grid item xs={12}>
    <FormControlLabel
      control={<Checkbox value="allowExtraEmails" color="primary" />}
      label="Quiero recibir notificaciones al correo"
    />
  </Grid>
</Grid>
 {/* Boton de registro */}
<Button
  type="submit"
  fullWidth
  variant="contained"
  color="primary"
  className={classes.submit}
>
  Registrarse
</Button>
 {/* Link de redireccionamiento a login */}
<Grid container justifyContent="flex-end">
  <Grid item>
    <Link href="#" variant="body2">
      ¿Ya tienes una cuenta? ingresa
    </Link>
  </Grid>
</Grid>
</form>


) }

        </Formik>
      </div>

    </Container>


  );
}