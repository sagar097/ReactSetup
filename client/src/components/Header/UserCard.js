import {
    Avatar,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';
import  userProfileImage  from '../../assets/images/png/user_profile.png';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const UserCard = props => {
    const { visibility } = props.userInfo;

    var split = props.userInfo.userName.split(' ');
    var firstinit = split[0] !== '' ? split[0].charAt(0) : '';
    var secinit = split.length > 1 ? split[1].charAt(0) : '';
    var username = firstinit + secinit;
    return (
        <Grid className='tooltip-card profile-menu__tooltip_card'>
            {username && (
                <List component='nav' className='usercard-group'>
                    <ListItem alignItems='flex-start' className='usercard-group-detail'>
                        <ListItemAvatar>
                            <Avatar
                                size={80}
                                src={props.userInfo.iconUrl}
                                className='usercard-profile-image'
                            >
                                {username.toUpperCase()}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            className='usercard-detail-text'
                            primary={props.userInfo.userName}
                            secondary={
                                <React.Fragment>
                                    <Typography variant='body2' color='textPrimary'>
                                        {props.userInfo.email}
                                    </Typography>
                                    <Typography variant='body2' color='textPrimary'>
                                        {props.userInfo.userRole}
                                    </Typography>
                                    {visibility.editProfile ? (
                                        <Chip
                                            label='Edit Profile'
                                            className='edit-btn'
                                            onClick={props.userInfo.onClick}
                                            clickable
                                        />
                                    ) : null}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                </List>
            )}
            <Divider style={{marginTop: '-8px'}}/>
            {/* <List component='nav' className='profile-logout-btn' > */}
                <ListItemLink   onClick={event => /*props.onLogoutClick()*/  window.location.href='/'}>
                   <ExitToAppIcon/>  <ListItemText primary='Logout' /> 
                </ListItemLink>
            {/* </List> */}
        </Grid>
    );
};

const ListItemLink = props => {
    return <ListItem button {...props} />;
};

UserCard.propTypes = {
    userInfo: PropTypes.object.isRequired
};

const EditProfile = () => {};

UserCard.defaultProps = {
    userInfo: {
        userName: 'John Doe',
        email: 'john_doe@xyz.com',
        userRole: 'Registry Admin',
        iconUrl: userProfileImage,
        onClick: EditProfile,
        visibility: {
            editProfile: false
        }
    },
    onLogoutClick: e => {}
};

export default UserCard;
