import Loading from './ComponentLoader';
import React from 'react';
import loadable from '@loadable/component';
const Loader = loader =>
    loadable(loader, {
        fallback: <Loading />
    });

export default Loader;
