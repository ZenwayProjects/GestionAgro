import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, MenuItem, Select, FormControl, InputLabel, IconButton, createTheme } from "@mui/material/";

import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@mui/material/InputAdornment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { Formik } from "formik";
import * as Yup from "yup";



const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: "16px 32px 24px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",

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


export default function PerfilModal({ rowData = [],  modalData = false, handleAddRow, handleUpdateRow }) {


  const getPost = (submitValues) => {
    return {
      nombre: submitValues.nombre,
      perfil: submitValues.perfil,
      estado: submitValues.status
    }
  }


  const regexPassword = "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$";

  const formSchema = Yup.object().shape({
    nombre: Yup.string().required('Campo Requerido'),
    perfil: Yup.string().required("campo requerido"),
  })



  const classes = useStyles();



  return (
    <Container component="main" maxWidth="md" className={classes.modal}>

      <Typography component="h1" variant="h5">
        Tabla usuario
      </Typography>

      <Formik
        initialValues={{
          nombre: rowData?.nombre,
          perfil: rowData?.perfil,
          status: rowData?.estado || 0,
        }}

        validationSchema={formSchema}

        onSubmit={(submitValues) => {

          let post = getPost(submitValues);


          if (!modalData) {
            handleAddRow(post);
          } else {
            handleUpdateRow(post, rowData.id);
          }


        }}
      >
        {({ handleSubmit, values, handleChange, handleBlur, errors, touched, }) => (

          <form className={classes.form} onSubmit={handleSubmit}>

            <Grid container spacing={2} >


              <Grid item xs={12} sm={4}>
                <FormControl variant="outlined" style={{ width: "100%" }} className={classes.formControl}>
                  <InputLabel id="statusId">Estado</InputLabel>
                  <Select
                    native
                    variant="outlined"

                    fullWidth
                    label="Estado"
                    name="status"
                    labelId="statusId"
                    onChange={handleChange}
                    as={Select}
                    onBlur={handleBlur}
                    value={values.status || 0}
                    defaultValue={0}
                    renderValue={(value) => value}
                  >
                    <option value={0}>Inactivo</option>
                    <option value={1}>Activo</option>

                  </Select>
                </FormControl>
              </Grid>


              <Grid item xs={12} sm={4}>
                <TextField
                  type="text"
                  autoComplete="fname"
                  name="nombre"
                  variant="outlined"
                  fullWidth
                  required
                  id="nombre"
                  label="nombre"
                  value={values.nombre || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.nombre && touched.nombre}
                  helperText={errors.nombre}
                />
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  type="text"
                  variant="outlined"
                  required
                  fullWidth
                  id="perfil"
                  label="perfil"
                  name="perfil"
                  autoComplete="lname"
                  value={values.perfil || ''}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.perfil && touched.perfil}
                  helperText={errors.perfil}
                />
              </Grid>

            </Grid>

            <Grid container spacing={2} style={{ flexDirection: "row-reverse" }}>
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
                  variant="outlined"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Cancelar
                </Button>
              </Grid>




            </Grid>
          </form>


        )}

      </Formik>


    </Container>





  );
}


