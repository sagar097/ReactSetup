import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import NoResultFound from '../../assets/svg/No_result_found.svg';


const NoResultError = props => {
    let msg = props.message ? props.message : i18next.t('noResultFoundContainer.defaultMsg');
    let imagePath = props.imageSrcUrl ? props.imageSrcUrl : NoResultFound;
    let noResultText = props.noResultText
        ? props.noResultText
        : 'No Result Found';

    return (
        <Grid container className='no--result_wrapper'>
            <Grid item className='no--result_grid'>
                <Grid item className='no--result_content'>
                    <h2 className='no--result_heading'>{noResultText}</h2>
                    <Typography variant='subheading' className='no--result_message'>
                        {msg}
                    </Typography>
                </Grid>
                <Grid item className='no--result_img-grid'>
                    <img
                        src={imagePath}
                        alt={i18next.t('noResultFoundContainer.noResultText')}
                        className='page-not-found_img'
                    />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default NoResultError;
