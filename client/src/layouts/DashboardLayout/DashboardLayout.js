import React, { Component } from 'react';
import clsx from 'clsx';
import { withStyles, useTheme } from '@material-ui/core/styles';
import { Grid,Tooltip, Drawer, Toolbar, AppBar, CssBaseline, Typography, Divider, IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, FilterNone } from '@material-ui/icons';
import UserProfile from '../../components/Header/Header';
import { setStorage, getStorage } from '../../utils/jwtUtils';
import { items } from './menuList';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {getAllUserDetail} from '../../redux/actions/userProfileAction';
import { withRouter } from 'react-router';

const drawerWidth = 240;

const styles  = theme => ({
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
  },
  menuName:{
    textDecoration:'none',
    color:'rgba(0, 0, 0, 0.87)'
  }
});

class DashboardLayout extends Component {
  constructor(props){
    super(props);
    this.state=({
      open:false,
      selectedMenuIndex: 0,
    })
  }

  componentDidMount(){
    if (!getStorage()) {
      this.props.history.push('/');
    }
    this.props.getAllUserDetail();
  
    if(this.props.location.state&&this.props.location.state.activeIndex)
    {   
      if(this.state.selectedMenuIndex!==this.props.location.state.activeIndex){
        this.setState({
          ...this.state,
          selectedMenuIndex:this.props.location.state.activeIndex
        })
      }
    }
 }

handleDrawerOpen = () => {
  this.setState({
    ...this.state,
      open:true
    });
};

 handleDrawerClose = () => {
  this.setState({
    ...this.state,
      open:false
    });
};

 handleLogout = () => {
  if (getStorage()) {
    setStorage()
    this.props.history.push('/');
  } else {
    this.props.history.push('/')
  }
}

onListItemClick=(event,index,path)=>{
   this.setState({
     ...this.state,
    selectedMenuIndex:index
  })
  // props.history.push(path)
}



  render(){
  const {classes,theme}=this.props;

  const userProfileDetails = {
    userName: this.props.UserProfileDataList ? this.props.UserProfileDataList.first_name +
      ' ' +
      this.props.UserProfileDataList.last_name
      : '',
    email: this.props.UserProfileDataList
      ? this.props.UserProfileDataList.email
      : '',
    userRole: this.props.UserProfileDataList ? this.props.UserProfileDataList.role
      : '',
    iconUrl: '',
    onClick: function onClick(e) { },
    visibility: {
      editProfile: false
    }
  };
     

 

  
console.log(this.props)
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: this.state.open,
        })}
      >
        <Toolbar>
          <Grid item xs={1}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={()=>this.handleDrawerOpen()}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: this.state.open,
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
              onLogoutClick={(e) => this.handleLogout(e)}
            />
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: this.state.open,
          [classes.drawerClose]: !this.state.open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={(e)=>this.handleDrawerClose(e)}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />

        {items.map((menu) => (

          <Tooltip title={menu.label} aria-label={menu.label} key={menu.label}>
            <ListItem button 
              key={menu.label} 
              selected={this.state.selectedMenuIndex === menu.id}
              onClick={(event)=>{this.onListItemClick(event, menu.id,menu.to)}}
            >
              <Link
                to={{
                  pathname: menu.to,
                  state: { activeIndex: menu.id }
                }}
              >

                <ListItemIcon>{<menu.icon />}</ListItemIcon>
              </Link>
              <Link
                to={{
                  pathname: menu.to,
                  state: { activeIndex: menu.id }
                }}
                className={classes.menuName}
              >
              <ListItemText primary={menu.label}  />
              </Link>
              
            </ListItem>
          </Tooltip>
        ))}

      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {this.props.children}
      </main>
    </div>
  ); 
  }
}

const mapStateToProps = ({
  UserProfileData
}) => ({
  UserProfileDataList: UserProfileData.UserDataList,
});

const mapDispatchToProps = {
  getAllUserDetail,
};

export default withRouter(
  withStyles(styles, { withTheme: true })(
      connect(
          mapStateToProps,
          mapDispatchToProps
      )(DashboardLayout)
  )
);
