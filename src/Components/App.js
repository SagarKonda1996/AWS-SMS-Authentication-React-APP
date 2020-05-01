import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import AppLayout from './AppLayout';
import {Auth} from 'aws-amplify'
import Login from './Login';
const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined)
  const [isLoggedIn, setisLoggedIn ] = useState(false)
  const resetData=()=>{
      setCurrentUser(undefined)
  }
  const Logout=()=>{
          Auth.signOut()
          .then((data)=>{
              resetData()
              getLoggedInStatus()
          })
          .catch(err=>{

          })       
     
      
  }

 
  useEffect(() => {
   getLoggedInStatus()
  }, [])
  const getLoggedInStatus=async()=>{
    const username=await getCurrentUser()   
    setisLoggedIn(username?true:false)
  }
  const getCurrentUser=()=>{
    return new Promise((resolve,reject)=>{
      Auth.currentAuthenticatedUser()
      .then(user=>{
        setCurrentUser(user)
        resolve(user.username?user.username:null)
      })
      .catch(err=>{
        resolve(null)
      })
    })
  }
  return (
    <>
      <ToastContainer />
      
      {
        isLoggedIn?
        <AppLayout Logout={Logout}/>:
        <Login getLoggedInStatus={getLoggedInStatus} setCurrentUser={setCurrentUser} currentUser={currentUser} />
      }
    </>
  );
};

export default App;
