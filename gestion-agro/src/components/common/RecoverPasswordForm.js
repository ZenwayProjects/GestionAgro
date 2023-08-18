import React from "react";
import { Avatar, Button, CssBaseline, TextField, Grid, Typography, Container } from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
}));

export default function RecoverPasswordForm() {
  const classes = useStyles();

  const formSchema = Yup.object().shape({
    email: Yup.string().email("Por favor ingresa un email válido").required('Campo Requerido'), 
  });

  return (
    <Container component="main" maxWidth="md" style={{ padding: "80px 0" }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Recuperar contraseña
        </Typography>
        <div style={{ width: "100%", marginTop: "1rem" }}>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={formSchema}
            onSubmit={(submitValues) => {
              console.log(submitValues);
            }}
          >
            {({ handleSubmit, values, handleChange, handleBlur, errors, touched }) => (
              <form onSubmit={handleSubmit} className={classes.form}>
                <Typography component="h5" variant="subtitle1" style={{ textAlign: "center" }}>
                  Ingresa tu correo electrónico para buscar tu cuenta.
                </Typography>
                <TextField
                  fullWidth      
                  margin="normal"
                  required
                  id="email"
                  label="Correo electrónico o usuario"
                  name="email"
                  autoComplete="email o usuario"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email && touched.email}
                  helperText={errors.email}
                />
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Ingresar
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="secondary"
                    >
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Container>
  );
}
