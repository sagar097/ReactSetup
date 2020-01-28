import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import TemporaryPage from '../../components/TemporaryPage/TemporaryPage';


const CommonRouter = () => {
    const pageContent = (
        <React.Fragment>
            <Grid container className='quality-dashboard--page__wrapper'>
                <Grid item xs={12} sm={12} md={4} lg={5} className='page-title__container'>
                    <Typography variant='h2' className='fi-subheader__title ' />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='subtitle1' gutterBottom>
                        MENU_ACCESS_NOT_AVAILABLE
                    </Typography>
                </Grid>
            </Grid>
        </React.Fragment>
    );
    return <TemporaryPage>{pageContent}</TemporaryPage>;
};

export default CommonRouter;
