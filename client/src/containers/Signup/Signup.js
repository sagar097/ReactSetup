import React ,{useState,useEffect,memo} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Container,Checkbox,Avatar,CssBaseline,Button,TextField,FormControlLabel,FormHelperText,
         Grid,Box,Typography} from '@material-ui/core';
import {LockOutlined as LockOutlinedIcon} from '@material-ui/icons';
import Copyright from '../../components/Copyright/Copyright';
import {Link} from 'react-router-dom';
import {SignupApi} from '../../redux/services/Signup/Signup';
import SnackBar from '../../components/Snackbar/Snackbar';

const useStyles = makeStyles(theme => ({
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
  Link:{
    "&:hover":{
        textDecoration:'none' ,
    },
      textDecoration:'none' ,
      color:'#1976d2',
      fontWeight:'500',
      fontSize: '0.875rem',
  }
}));

const numRegex = /^[0-9\b]+$/;
const emailRegex =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ;

 function SignUp(props) {
   const classes = useStyles();
   const [state, setState] = useState({
     fields: {},
     errors: {}
   });
   const [snackbarState, setSnackbar] = useState({
     messageInfo: {
       open: false,
       message: null,
       variant: 'success'
     }
   })

   const handleValidation = () => {
     let fields = state.fields;
     let errors = {};
     let formIsValid = true;

     let errordata = ["firstname", "lastname", "email", "password"];

     errordata.map(val => {
       if (!fields[val] || !fields[val].trim()) {
         formIsValid = false;
         errors[val] = `${val[0].toUpperCase() + val.substr(1, val.length)} Field Must Not Be Empty`;
       }
       else if (fields['password'] && fields['password'].length < 5) {
         formIsValid = false;
         errors['password'] = `Password Field Must Be in Between 5 to 15`;
       }else if (fields['email'] && !emailRegex.test(fields['email'])) {
         formIsValid = false;
         errors['email'] = 'Please Enter Correct Email-Id';
       }
     });

     setState({ ...state, errors: errors });
     return formIsValid;
   }   

  
  const handleChange = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    let fields = state.fields;
    let errors = state.errors;
    let isError = '';

    if (name == 'phone') {
      if (!numRegex.test(value) && value !== '') {
          value = state.fields[name] ? state.fields[name] : '';
          isError = 'Phone Number Must Be Only Number';
      } 
    }
    

    fields[name] = value;
    errors[name] = isError ? isError : '';
    setState({...state, fields, errors });
   
  }

   const handleSubmit = async (e) => {
     e.preventDefault();
     if (handleValidation()) {
       const { firstname, lastname, email, phone, password } = state.fields;
       let param = {
         "email": email,
         "first_name": firstname,
         "last_name": lastname,
         "phone_no": phone,
         "password": password,
         "role": "User"
       }
       await SignupApi(param).then(async (res) => {
         if (JSON.stringify(res.error) !== '{}') {
           setSnackbar({
             messageInfo: {
               open: true,
               message: res.error,
               variant: 'error'
             }
           })
         } else {
           console.log('formvalid');
            await setSnackbar({
              messageInfo: {
                open: true,
                message: res.payload.message,
                variant: 'success'
              }
            })
         }
       })

     }
   }
  
  const onCloseSnackBar = () => {
    setSnackbar({
      messageInfo: {
        open: false,
        message: null,
        variant: 'success'
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <SnackBar
          message={snackbarState.messageInfo.message}
          open={snackbarState.messageInfo.open}
          closeSnackBar={onCloseSnackBar}
          variant={snackbarState.messageInfo.variant}
          autoHideDuration={3000}
        />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstname"
                variant="outlined"
                required
                value={state.fields['firstname'] }
                onChange={(e)=>handleChange(e)}
                inputProps={{ maxLength: 20 }}
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
               {state.errors['firstname'] ? (
                <FormHelperText error>
                       {state.errors['firstname']}
                </FormHelperText>
               ) : null}
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={state.fields['lastname']}
                inputProps={{ maxLength: 20 }}
                onChange={(e)=>handleChange(e)}
                id="lastName"
                label="Last Name"
                name="lastname"
                autoComplete="lname"
              />
               {state.errors['lastname'] ? (
                <FormHelperText error>
                       {state.errors['lastname']}
                </FormHelperText>
               ) : null}
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                value={state.fields['email']}
                onChange={(e)=>handleChange(e)}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
               {state.errors['email'] ? (
                <FormHelperText error>
                       {state.errors['email']}
                </FormHelperText>
               ) : null}
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                fullWidth
                id="phone"
                value={state.fields['phone'] }
                onChange={(e)=>handleChange(e)}
                label="Phone Number"
                inputProps={{ maxLength: 10 }}
                name="phone"
                autoComplete="Phone"
              />
               {state.errors['phone'] ? (
                <FormHelperText error>
                       {state.errors['phone']}
                </FormHelperText>
               ) : null}
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                value={state.fields['password'] }
                onChange={(e)=>handleChange(e)}
                label="Password"
                type="password"
                inputProps={{ maxLength: 15 }}
                id="password"
                autoComplete="current-password"
              />
               {state.errors['password'] ? (
                <FormHelperText error>
                       {state.errors['password']}
                </FormHelperText>
               ) : null}
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
              />
            </Grid>

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e)=>handleSubmit(e)}
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/" className={classes.Link}>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default memo(SignUp);