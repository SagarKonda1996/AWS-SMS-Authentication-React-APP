import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import {Auth} from 'aws-amplify'
Auth.configure({
  authenticationFlowType: 'CUSTOM_AUTH',
  userPoolId: process.env.REACT_APP_user_pool_id,
  userPoolWebClientId:process.env.REACT_APP_app_client_id
})
ReactDOM.render(
    <App />
,
  document.getElementById('root')
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
