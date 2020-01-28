import React from 'react';
import { Redirect } from 'react-router-dom';
import { Typography, Button, Grid } from '@material-ui/core';
import {KeyboardBackspaceRounded} from '@material-ui/icons';

class AuthError extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            redirectToLogin: false
        };
    }

    redirectToLogin = () => {
        this.setState({ redirectToLogin: true });
    };

    render() {
        if (this.state.redirectToLogin) {
            return <Redirect to='/' />;
        }
        return (
            <Grid className="autherr__wrapper">
                <Typography variant='subtitle1' gutterBottom className="err-msg">
                    Authentication Problem
                </Typography>
                <div onClick={() => this.redirectToLogin()} className='go--back__link'>
                    <Button variant='contained' className='go--back__link-btn'>
                      <KeyboardBackspaceRounded/>
                        Go Back
                    </Button>
                </div>
            </Grid>
        );
    }
}

export default AuthError;
