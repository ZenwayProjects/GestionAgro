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
  let message = context.localeJson;







  const formSchema = Yup.object().shape({
    userLogin: Yup.string().required('Campo Requerido'),
    password: Yup.string().required("Campo Requerido"),
  })

  useEffect(()=>{
console.log("el json esta en: " + context.locale);

  },[context.locale])

  return (

    <Container component="main" maxWidth="md">
          

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
        <Box

          sx={{ mt: 1 }}
        >
          <Formik
            initialValues={{
              userLogin: "",
              password: ""
            }}

            validationSchema={formSchema}

            onSubmit={(submitValues) => {
              console.log(submitValues);
            }}
          >
            {({ handleSubmit, values, handleChange, handleBlur, errors, touched }) => (

              <form className={classes.form} onSubmit={handleSubmit}>

                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="userLogin"
                  label={context.localeJson.required_user}
                  name="userLogin"
                  autoComplete="email o usuario"
                  autoFocus
                  value={values.userLogin}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.userLogin && touched.userLogin}
                  helperText={errors.userLogin}
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

