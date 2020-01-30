/*
 * @file: AppRoute.js
 * @description: Defined all routers
 * @date: 04.12.2018
 * @author: Sagar Pawar
 */

/** ********** React Pages according to layouts  *****************/

import { Redirect, Route } from 'react-router-dom';

import ErrorBoundary from '../layouts/ErrorLayout/ErrorBoundary';
import Loader from '../helper/loaders';
import React from 'react';

const AppError = Loader(() =>
    import('../layouts/ErrorLayout/AppError' /* webpackChunkName: "error-msg" */)
);
const AppRoute = ({
    component: Component,
    layout: Layout,
    requireAuth,
    to = '/',
    store,
    type = 'private',
    ...rest
}) => (
    <ErrorBoundary fallbackComponent={AppError}>
        <Route
            {...rest}
            render={props => {
                const isLogin = requireAuth(store);
                if (isLogin && props.location.pathname === '/') {
                    return (
                        <Redirect
                            to={{
                                pathname: '/dashboard',
                                state: { from: props.location }
                            }}
                        />
                    );
                }
                if (type === 'public') {
                    return (
                        <Layout>
                            <Component {...props} />
                        </Layout>
                    );
                }
                return isLogin || props.location.pathname === '/' ? (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                ) : (
                    <Redirect
                        to={{
                            pathname: to,
                            state: { from: props.location }
                        }}
                    />
                );
            }}
        />
    </ErrorBoundary>
);

export default AppRoute;
