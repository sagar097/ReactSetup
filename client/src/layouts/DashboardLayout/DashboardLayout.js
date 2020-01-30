import React,{useEffect,useState} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Grid,List,Drawer,Toolbar,AppBar,CssBaseline,Typography,Divider,IconButton,ListItem,ListItemIcon,ListItemText} from '@material-ui/core';
import {Menu as MenuIcon,ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon,MoveToInbox as InboxIcon,Mail as MailIcon} from '@material-ui/icons';
import UserProfile from '../../components/Header/Header';
import {setStorage,getStorage} from '../../utils/jwtUtils';
import { withRouter } from 'react-router';
import {items} from './menuList';
import {Link} from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor:'#1976d2',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  profileButton:{
  //  paddingLeft:theme.spacing(42)
  },
  activeLink:{
    backgroundColor:'#78a6da87'
  }
}));

function DashboardLayout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  
  useEffect(()=>{
     if(!getStorage()){
       props.history.push('/');
     }
  },[props.history])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () =>{
    if(getStorage()){
        setStorage()
        props.history.push('/');
    }else{
      props.history.push('/')
    }
  }
  const userProfileDetails = {
    userName: `test user`,
    email: '',
    userRole: ``,
    iconUrl: '',
    onClick: function onClick(e) { },
    visibility: {
        editProfile: false
    }
  };
  const currentPath=props.history.location.pathname;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
            <Grid item xs={1}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
              </Grid>
              <Grid item xs={7}>
                <Typography variant="h6" noWrap>
                  Quiz App
                </Typography>
              </Grid>
             <Grid container justify="flex-end">
               <UserProfile    
                  UserCard={userProfileDetails}
                  onLogoutClick={()=>handleLogout()} 
                />
            </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
      
          {items.map((menu, index) => (
           

            <ListItem button key={menu.label} className={currentPath==menu.to?classes.activeLink:''} >
              <Link to={menu.to}><ListItemIcon>{<menu.icon/> }</ListItemIcon></Link>
              <ListItemText primary={menu.label} />
            </ListItem>
      
          ))}
        
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
         {props.children}    
      </main>
    </div>
  );
}

export default withRouter( DashboardLayout );