
import AppRoute from './AppRoute';
// import ForgotPasswordPage from '@/containers/ForgotPassword';
import Loader from '../helper/loaders';
//import LoginPage from '@/containers/Login';

import React from 'react';
//import ResetpasswordPage from '@/containers/Resetpassword';
import { Switch } from 'react-router-dom';
import { auth } from '../utils/auth';
import { dashboardLayout } from '../layouts/DashboardLayout';
import { errorLayout } from '../layouts/ErrorLayout';
import publicLayout from '../layouts/PublicLayout/PublicLayout';
import {withRouter} from 'react-router';
import Demo from '../components/Demo';


const NotFoundPage = Loader(() =>
    import(/* webpackChunkName: "NotFoundPage" */ '../containers/not-found-page.component')
);


const LoginPage = Loader(() =>
    import(/* webpackChunkName: "NotFoundPage" */ '../containers/Login/LoginBase')
);
const SignUp = Loader(() =>
    import(/* webpackChunkName: "NotFoundPage" */ '../containers/Signup/Signup')
);

const Customer = Loader(() =>
    import(/* webpackChunkName: "NotFoundPage" */ '../components/Customer/Customers')
);

// const NoAccess = Loader(() =>
//     import(/* webpackChunkName: "NoAccess" */ '../containers/NoAccess/NoAccess')
// );



// const AuthError = Loader(() =>
//     import(/* webpackChunkName: "AuthError" */ '../containers/AuthError/AuthError')
// );



const   Routers = store => {
    return (
        <div className='fi-grid fi-grid--hor fi-grid--root fi-grid--root-2'>
            <div className='fi-grid fi-grid--hor fi-grid--root fi-grid--root-3'>
                <Switch>
                        <AppRoute
                            exact={true}
                            path='/'
                            component={LoginPage}
                            requireAuth={auth}
                            layout={publicLayout}
                            type='public'
                        />
                 
                        <AppRoute
                            exact={true}
                            path='/login'
                            component={LoginPage}
                            requireAuth={auth}
                            layout={publicLayout}
                            store={store}
                            type='public'
                        />
                    

                        <AppRoute
                            exact={true}
                            path='/signup'
                            component={SignUp}
                            requireAuth={auth}
                            layout={publicLayout}
                            type='public'
                        />
                   
                    {/* <AppRoute
                        exact
                        path='/dashboard'
                        component={()=>{'hi'}}
                        requireAuth={() => false}
                        layout={dashboardLayout}
                        store={store}
                    /> */}
                    
                    {/* <AppRoute
                        exact={true}
                        path='/NoAccess'
                        component={NoAccess}
                        requireAuth={() => false}
                        layout={dashboardLayout}
                        store={store}
                    />  */}

                    {/* <AppRoute
                        exact
                        path='/layout'
                        component={dashboardLayout}
                        requireAuth={() => false}
                        layout={dashboardLayout}
                        store={store}
                    /> */}

                      <AppRoute
                        exact
                        path='/dashboard'
                        component={Customer}
                        requireAuth={auth}
                        layout={dashboardLayout}
                        store={store}
                    />
                     <AppRoute
                        exact
                        path='/technology'
                        component={Demo}
                        requireAuth={auth}
                        layout={dashboardLayout}
                        store={store}
                    />
                    <AppRoute
                        exact
                        path='*'
                        component={NotFoundPage}
                        requireAuth={() => false}
                        layout={errorLayout}
                        store={store}
                        type='public'
                    />
                    

                </Switch>
            </div>
        </div>
    );
};

export default withRouter(Routers);
