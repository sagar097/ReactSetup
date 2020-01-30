import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import classNames from 'classnames';


const styles = theme => ({
    error: {
        backgroundColor: theme.palette.error.dark,
        color: '#fff',
        fontSize: 14
    },
    success: {
        backgroundColor: '#43A047',
        color: '#fff',
        fontSize: 14
    },
    close: {
        padding: theme.spacing(0.5)
    }
});

const SimpleSnackbar = props => {
    const { classes, variant } = props;
    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={props.open}
                autoHideDuration={props.autoHideDuration}
                onClose={props.closeSnackBar}
                ContentProps={{
                    classes: {
                        root: classNames(classes[variant])
                    },
                    'aria-describedby': 'message-id'
                }}
                message={<span id='message-id'>{props.message}</span>}
                action={[
                    <IconButton
                        key='close'
                        aria-label='Close'
                        color='inherit'
                        className={classes.close}
                        onClick={props.closeSnackBar}
                    >
                        <CloseIcon />
                    </IconButton>
                ]}
            />
        </div>
    );
};

SimpleSnackbar.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSnackbar);
