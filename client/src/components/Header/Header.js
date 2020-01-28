import React from 'react';
import { Popover, IconButton } from '@material-ui/core';
import UserCard from './UserCard';
import './Header.less';
import { withStyles } from '@material-ui/core/styles';
import  userProfileImage  from '../../assets/images/png/user_profile.png';
import {AccountCircle} from '@material-ui/icons';

const styles = theme => ({
    lightTooltip: {
        background: theme.palette.common.white,
        color: theme.palette.text.primary,
        boxShadow: theme.shadows[1],
        fontSize: 11
    }
});

function Header(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    // const { icons } = props;

    function handleClick(event) {
        setAnchorEl(event.currentTarget);
    }

    function handleClose() {
        setAnchorEl(null);
    }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <div>
            <IconButton aria-describedby={id} color="inherit" onClick={handleClick}>
                <AccountCircle/>
            </IconButton>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <UserCard
                    onLogoutClick={e => props.onLogoutClick()}
                    className='usercardicon-tooltip'
                    userInfo={props.UserCard}
                />

            </Popover>
        </div>
    );
}

Header.defaultProps = {
    icons: {
        color: 'white',
        name: 'account_circle',
        backgroundColor: 'none',
        className: 'material-icons profile-material-icons',
        styleprops: {
            ListComponent: 'nav'
        }
    },
    UserCard: {
        userName: 'John Doe',
        email: 'john_doe@xyz.com',
        userRole: 'Registry Admin',
        iconUrl: userProfileImage,
        onClick: e => {},
        visibility: {
            editProfile: false
        }
    },
    onLogoutClick: e => {
        // // console.log(("header")
    }
};

export default withStyles(styles)(Header);
