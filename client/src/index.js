import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import createStore from './redux/store.config';
import { Provider } from 'react-redux';
// Create a store and get back itself and its history object
const { store, history } = createStore();

ReactDOM.render(
    <Provider store={store} >
        <App history={history} store={store}/>
    </Provider>, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
