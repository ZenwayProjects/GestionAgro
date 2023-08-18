import React, { useEffect, useState } from "react";
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container, Menu, MenuItem } from "@mui/material/";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { makeStyles } from '@material-ui/core/styles';
import * as Yup from "yup";
import { Formik } from "formik";
import { useContext } from 'react';
import { MyContext } from '../../context';
import { AccountCircle } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
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


export default function LoginForm() {

  const classes = useStyles();
  const context = useContext(MyContext);
  const message = context.localeJson;

  useEffect(() => {
    console.log(localStorage.getItem('token'));
  }, []);

  useEffect(() => {
    console.log("el json está en: " + context.locale);
  }, [context.locale]);

  const handleLogin = async (post) => {
    try {
      const res = await ApiPostRequest(
        `http://${dataBaseIp}:${dataBasePort}/api/auth/login`,
        post
      );

      const token = res.data.accessToken;
      console.log(res);

      const user = {
        token: token,
        username: post.login
      };

      context.setIsLogged(true);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('isLogged', JSON.stringify(true));
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
    }
  };

  if (context.isLogged) { // Si el usuario está logueado
    return (
      <>
        logueado xd {localStorage.getItem('token')}
      </>
    );
  } else { // Si el usuario no está logueado
    return (
      <Container component="main" maxWidth="md">
        {/* Resto del código para mostrar el formulario */}
        <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h4">
          {message.welcome}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Formik
            initialValues={{
              login: "",
              password: ""
            }}
            validationSchema={Yup.object().shape({
              login: Yup.string().required(message.required_field),
              password: Yup.string().required(message.required_field),
            })}
            onSubmit={(submitValues) => {
              handleLogin(submitValues);
            }}
          >
            {({ handleSubmit, values, handleChange, handleBlur, errors, touched }) => (
              <form className={classes.form} onSubmit={handleSubmit}>
              
              <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="login"
                  label={context.localeJson.required_user}
                  name="login"
                  autoComplete="email o usuario"
                  autoFocus
                  value={values.login}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.login && touched.login}
                  helperText={errors.login}
                />


                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label={message.password}
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password && touched.password}
                  helperText={errors.password}
                />

                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label={message.remember_me}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                 {message.sign_in}
                </Button>

                
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      {message.forgot_password}
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {message.not_account}
                    </Link>
                  </Grid>
                </Grid>

              </form>
            )}
          </Formik>
        </Box>
      </Box>

      </Container>
    );
  }

  
}