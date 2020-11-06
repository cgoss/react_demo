import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

//import { Auth0Provider } from "@auth0/auth0-react";

const responseGoogle = response =>{
console.log(response);
}
// class LoginComponent extends React.Component{
// isLoggedIn()=>{

// }

// const [name,isLoggedIn] = useGoogleLogin();
// render()
// {
//   return <GoogleLogin
//   clientId="915175076448-gkru4ir0hd83bbibcrui511pmrff0uk3.apps.googleusercontent.com"
//   buttonText="Login"
//   onSuccess={responseGoogle}
//   onFailure={responseGoogle}
//   cookiePolicy={'single_host_origin'}
// />
// }
// }

// ReactDOM.render(
//   <LoginComponent />,
//   document.getElementById('googleButton')
// );

ReactDOM.render(
    <App />
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
