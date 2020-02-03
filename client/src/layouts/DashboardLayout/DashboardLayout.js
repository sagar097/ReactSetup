import React, { useEffect,memo, useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid,Tooltip, Drawer, Toolbar, AppBar, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, MoveToInbox as InboxIcon, Mail as MailIcon } from '@material-ui/icons';
import UserProfile from '../../components/Header/Header';
import { setStorage, getStorage } from '../../utils/jwtUtils';
import { items } from './menuList';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {getAllUserDetail} from '../../redux/actions/userProfileAction';
import { withRouter } from 'react-router';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#1976d2',
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
  profileButton: {
    //  paddingLeft:theme.spacing(42)
  },
  activeLink: {
    backgroundColor: '#78a6da87'
  }
}));

function DashboardLayout(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [state,setState] = useState({
    selectedMenuIndex: 0,
  });

  useEffect(() => {
    if (!getStorage()) {
      props.history.push('/');
    }
    props.getAllUserDetail();
  }, [props.history])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    if (getStorage()) {
      setStorage()
      props.history.push('/');
    } else {
      props.history.push('/')
    }
  }

  const onListItemClick=(event,index)=>{
     setState({...state,
      selectedMenuIndex:index
    })
  }

  const userProfileDetails = {
    userName: props.UserProfileDataList ? props.UserProfileDataList.first_name +
      ' ' +
      props.UserProfileDataList.last_name
      : '',
    email: props.UserProfileDataList
      ? props.UserProfileDataList.email
      : '',
    userRole: props.UserProfileDataList ? props.UserProfileDataList.role
      : '',
    iconUrl: '',
    onClick: function onClick(e) { },
    visibility: {
      editProfile: false
    }
  };
  const currentPath = props.history.location.pathname;
  console.log(currentPath)
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
              onLogoutClick={() => handleLogout()}
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

        {items.map((menu,index) => (

          <Tooltip title={menu.label} aria-label={menu.label} key={menu.label}>
            <ListItem button 
              key={menu.label} 
              selected={state.selectedMenuIndex === index}
              onClick={(event)=>{onListItemClick(event, index)}}
            >
              <Link to={menu.to}>
               <ListItemIcon>{<menu.icon />}</ListItemIcon>  </Link>
               <ListItemText primary={menu.label}  />
             
            </ListItem>
          </Tooltip>
        ))}

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}

const mapStateToProps = ({
  UserProfileData
}) => ({
  UserProfileDataList: UserProfileData.UserDataList,
});

const mapDispatchToProps = {
  getAllUserDetail,
};

export default withRouter( memo(connect(
      mapStateToProps,
      mapDispatchToProps
    )(DashboardLayout)));

