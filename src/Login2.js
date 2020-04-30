import React,{useState,useEffect} from 'react'
import { Auth } from 'aws-amplify';
import LoginUser from './LoginUser';
import App from './App';

const Login2 = props => {
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [currentUser, setCurrentUser] = useState(undefined)
    const [alreadyLogged, setalreadyLogged] = useState(localStorage.getItem("accessToken")?true:false)
    const resetData=()=>{
        setCurrentUser(undefined)
            setUserLoggedIn(false)
            localStorage.removeItem("accessToken")
            setalreadyLogged(localStorage.getItem("accessToken")?true:false)
    }
    const Logout=()=>{
        if(Auth.user)
        {
            Auth.signOut()
            .then((data)=>{
                resetData()

            })
            
        }
        else{
            resetData()
        }
       
        
    }
    useEffect(() => {
       setUserLoggedIn(localStorage.getItem('accessToken')?true:false)
 
    }, [localStorage.getItem('accessToken')])
    
    return (
        <div>
            {
                (Auth.user && userLoggedIn)||alreadyLogged?
                
                <App Logout={Logout}/>
                :
                <LoginUser setUserLoggedIn={setUserLoggedIn} setCurrentUser={setCurrentUser} currentUser={currentUser} />
            }
            
        </div>
    )
}



export default Login2
