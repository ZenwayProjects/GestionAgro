
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, MenuItem, Select, FormControl, InputLabel, IconButton, createTheme } from "@mui/material/";

import { makeStyles } from '@material-ui/core/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import EmailIcon from '@material-ui/icons/Email';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { Style } from "@mui/icons-material";
import { useState} from "react";
import dayjs from 'dayjs';



const useStyles = makeStyles((theme) => ({
 modal:{
    position:"absolute",
    backgroundColor:"white",
    border:"2px solid #000",
    boxShadow: theme.shadows[5],
    padding:"16px 32px 24px",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)",

 },
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
  datePicker: {
    '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
      borderColor: 'tu-nuevo-color-aqui',
    },
    '& .MuiFormHelperText-root.Mui-error': {
      display: 'none',
    },
  },

}));


export default function UsuarioModal({rowData=[], setModal, modalData=false, handleAddRow, handleUpdateRow}) {

  const getPost = (submitValues) => {
    return {
      nombre:submitValues.firstName,
      apellido:submitValues.lastName,
      genero: submitValues.genre,
      fechaNacimiento:submitValues.birthDate,
      direccion:submitValues.address,
      telefono:submitValues.phone,
      email:submitValues.email,
      estado:submitValues.status,
      identificacion:submitValues.idNum,
      tipoIdentificacion:submitValues.typeIdentification
      }
  }



    const formSchema = Yup.object().shape({
      firstName:Yup.string().required('Campo Requerido'),
      lastName:Yup.string().required("Campo Requerido"),
      email:Yup.string().email().required("El correo es requerido"),
      typeIdentification:Yup.string().required(),
      address:Yup.string().required(),
      phone:Yup.number().required(),
      idNum:Yup.number().required(),
      genre:Yup.string().required(),
     
    
    })



    const classes = useStyles();
  
    
  
  
 

  return (
    <Container component="main" maxWidth="md" className={classes.modal}>

<Typography component="h1" variant="h5">
          Tabla Usuario
</Typography>

      <Formik
      initialValues={{
        firstName: rowData?.nombre,
        lastName: rowData?.apellido,
        email: rowData?.email,
        typeIdentification:rowData?.tipoIdentificacion,
        address: rowData?.direccion,
        phone:rowData?.telefono,
        idNum:rowData?.identificacion,
        genre:rowData?.genero,
        birthDate:dayjs(rowData?.fechaNacimiento) ,
        status:rowData?.estado || 0,
      }}

validationSchema = {formSchema}

       onSubmit={(submitValues)=>{
        let post = getPost(submitValues);
 

        if(!modalData){
         // sendRegister(submitValues);
      
          handleAddRow(post);
        } else {
          handleUpdateRow(post, rowData.id);
        }
        console.log("se ejecuta");
      
       // window.location.reload();
   
       }}
      >
       {({handleSubmit,values, handleChange , handleBlur, errors, touched, setFieldValue})=>(
        
<form className={classes.form} onSubmit={handleSubmit}>

<Grid container spacing={2} >


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
    value={values.firstName || ''}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.firstName && touched.firstName}
    helperText={errors.firstName}
  
    

  />
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
    value={values.lastName || ''}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.lastName && touched.lastName}
    helperText={errors.lastName}
  />
</Grid>

<Grid item xs={12} sm={6}>
  <Grid container spacing={0}>
    <Grid item xs={2} sm={3}>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="tipoId">Tipo</InputLabel>
        <Select
        
          native
          variant="outlined"
          fullWidth
          value={values.typeIdentification || ''}
          labelId="tipoId"
          label="tipo"
          name="typeIdentification"
          onChange={handleChange}
          onBlur={handleBlur}
          renderValue={(value) => value}
          
      
        >
          <option aria-label="None" value="" />
          <option value="CC ">C.C.</option>
          <option value="TI ">T.I.</option>
          <option value="DNI">DNI</option>
          <option value="PP ">Pasaporte</option>
          <option value="NIT">NIT</option>
          <option value="CIF">CIF</option>
        </Select>
  
     
      </FormControl>
    </Grid>
    <Grid item xs={10} sm={9}>
      <TextField  
       type="number"
        variant="outlined"
        required
        fullWidth
        id="idNum"
        label="Indentificación"
        name="idNum"
        InputProps={{
          endAdornment: <InputAdornment position="end"><AssignmentIndIcon /></InputAdornment>
        }}
        value={values.idNum || ''}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.idNum && touched.idNum}
      />
    </Grid>

    
  </Grid>
</Grid>

<Grid item xs={12} sm={4}>
<FormControl variant="outlined" style={{width:"100%"}} className={classes.formControl}>
        <InputLabel id="genreId">Género</InputLabel>
        <Select
          native
          variant="outlined"
        
          fullWidth
          label="genero"
          name="genre"
          labelId="genreId"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.genre || ''}
       
          renderValue={(value) => value}
        >
          <option aria-label="None" value="" />
          <option value="M">Masculino</option>
          <option value="F">Femenino</option>
          <option value="O">Otro</option>
        </Select>
      </FormControl>
</Grid>
<Grid item xs={12} sm={8} style={{alignContent:"center"}}>
  

<DatePicker  
error={false}
className={classes.datePicker}
  label="Fecha de nacimiento"
   slotProps={{ textField:{fullWidth: true }}} 
   name="birthDate"
   id="birthDate"
   onBlur={handleBlur}
  defaultValue={values.birthDate}
   onChange={(value) => {
    setFieldValue('birthDate', value ? value.toISOString().slice(0, 10) : null);
    }}
   format="YYYY-MM-DD"

   />


 


</Grid>
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
    value={values.phone || ''}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.phone&& touched.phone}
 
  />
</Grid>
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
    value={values.address || ''}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.address&& touched.address}
 
  />
</Grid>



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
    value={values.email || ''}
    onChange={handleChange}
    onBlur={handleBlur}
    error={errors.email&& touched.email}
  />
</Grid>

<Grid item xs={12} sm={4}>
<FormControl variant="outlined" style={{width:"100%"}} className={classes.formControl}>
        <InputLabel id="statusId">Estado</InputLabel>
        <Select
          native
          variant="outlined"
        
          fullWidth
          label="Estado"
          name="status"
          labelId="statusId"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.status || 0}
          renderValue={(value) => value}
        >
          <option aria-label="None" value={null} />
          <option value={0}>Inactivo</option>
          <option value={1}>Activo</option>
        
        </Select>
      </FormControl>
</Grid>

</Grid>

<Grid  container spacing={2} style={{flexDirection:"row-reverse"}}>
        <Grid item sm={3} >
      <Button 
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}

        >
          Ingresar
        </Button>
      </Grid>

            < Grid item sm={3} >
            <Button
        
          fullWidth
          onClick={()=> setModal(false)}
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
  

  </Container>

   



  );
}


