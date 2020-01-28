import * as React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

const Circularloader = () => (
    <CircularProgress
        variant='indeterminate'
        disableShrink
        className='loader__circular-progress'
        size={20}
        thickness={4}
        style={{ color: '#6798e5', animationDuration: '550ms', position: 'absolute', left: 0 }}
    />
);
export default Circularloader;
