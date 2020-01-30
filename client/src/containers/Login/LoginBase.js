import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from '../../components/Copyright/Copyright';
import {LockOutlined as LockOutlinedIcon } from '@material-ui/icons';
import {Avatar,Button,TextField,FormControlLabel,Checkbox,FormHelperText,Box,Grid,Typography} from '@material-ui/core';
import {LoginApi} from '../../redux/services/Login/Login';
import SnackBar from '../../components/Snackbar/Snackbar';
import {setStorage} from '../../utils/jwtUtils';
import {Link} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
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

const emailRegex =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default function LoginBase(props) {
  const classes = useStyles();

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [state,setState] = useState({
                          email:'',
                          password:'',
                          errors:{},
                        });
  const [snackbarState, setSnackbar] = useState({
        messageInfo: {
          open: false,
          message: null,
          variant: 'success'
      }
  })
       

  const handleValidation =()=>{debugger
    let email = state.email;
    let password = state.password;
    let stateError = state.errors;
    let errors = {};
    let formIsValid = true;
    if(JSON.stringify(stateError) !== '{}')
    {  if(stateError.email !== '' && stateError.password !== ''){
        formIsValid = false;
        errors=state.errors;
      }
    }

    if(email==='' ){
      formIsValid = false;
      errors.email = 'Email Field Must Not Be Empty';
    }
    if(password === ''){
      formIsValid = false
      errors.password = 'Password Field Must Not Be Empty';
    }

    setState({
      ...state,
      errors: errors
    })

    return formIsValid;
  }                      

  const handleChange = (e) =>{
    let name = e.target.name;
    let value = e.target.value;
    // let error = state.errors;
    let isError = '';

    if (name === 'email') {
      if (value !== '' && !emailRegex.test(value)) {
        // value = state.email ? state.email : '';
        isError = 'Please Enter Correct Email-Id';
      } 
    } else if (name === 'password') {
      if (value !== '' && value.length < 5) { // value =state.password ? state.password : '';
        isError = 'Password Must Be Atleast 5 Character';
      } 
    }

    setState({
      ...state,
      [name]: value,
      errors:{
        ...state.errors,
        [name]:isError 
      }
    })
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
  if(handleValidation()){ 
    let param = {
		      	"email": state.email,
            "password":state.password,
            "role": "User"
        }
    LoginApi(param).then((res)=>{
       console.log(res);
       if(JSON.stringify(res.error) !== '{}'){
          setSnackbar({
              messageInfo: {
                open: true,
                message: res.error,
                variant: 'error'
          }
        })
       }else{
           let token = res.payload.data.token;
           console.log(token)
            setStorage(token);
            setLoggedIn(true);
            props.history.push('/dashboard');
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
console.log(props)
  return (
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
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={state.email || ''}
              onChange={handleChange}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            {state.errors['email'] ? (
                <FormHelperText error>
                       {state.errors['email']}
                </FormHelperText>
               ) : null}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              value={state.password || ''}
              onChange={handleChange}
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {state.errors['password'] ? (
                <FormHelperText error>
                       {state.errors['password']}
                </FormHelperText>
               ) : null}

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
             Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="#" className={classes.Link}>
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" className={classes.Link} >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
  );
}