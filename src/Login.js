import React,{useState} from 'react'
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { Auth } from 'aws-amplify';

const App = props => {
  const [number, setNumber] = useState('')
  const [user, setUser] = useState({})
  const [code, setCode] = useState('')
 
  let challengeResponse = "the answer for the challenge";
  const signIn=()=>{
    Auth.signIn(number)
    .then(res=>{
      setUser(res)
      console.log("Old USer",res)
    })
    .catch(err=>{
      console.log(err)
      Auth.signUp({
        username:number,
        password:'111111111111',
        attributes:{
          'name':'Sagar'
        }

      })
      .then(res=>{
        setUser(res)
        console.log(res)
        signIn()
        console.log("New User")
      })
    })
    
  }
  const verifyNewUser=()=>{
    Auth.confirmSignUp(user,code,{
      forceAliasCreation:true
    })
  }
  const sendChallenge=()=>{
    Auth.sendCustomChallengeAnswer(user,code)
    .then(res=>{
      console.log(res)
    
    // console.log(Auth.currentAuthenticatedUser(),Auth.currentUserInfo())
      Auth.currentAuthenticatedUser()
      .then(res=>{
        console.log("Current AUthenticated USER")
        console.log(res)
      })
      Auth.currentUserInfo()
      .then(res=>{
        console.log("Current User INFO")
        console.log(res)
      })
      Auth.currentSession()
      .then(res=>{
        console.log("Current Session INFO")
        console.log(res)
      })
    }
      
    )
    .catch(err=>console.log(err))
  
  }
  const signOut=()=>{
    Auth.signOut(
      {
        global:true
      }
    )
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }
  return (
    <div>
      {      console.log(Auth.user)
}
     
       <input type="text" value={number} onChange={e=>setNumber(e.target.value)}/>
      <button onClick={e=>signIn()}>send OTP</button>
      
       <input type="text" value={code} onChange={e=>setCode(e.target.value)}/>
       <button onClick={e=>sendChallenge()}>VERIFY </button>
     
     <button onClick={e=>signOut()}>Sign Out</button>
    </div>
  )
}



export default App;
