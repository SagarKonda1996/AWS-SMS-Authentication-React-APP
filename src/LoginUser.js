import React,{useState} from 'react'
import { Auth } from 'aws-amplify';

const LoginUser = ({
    setUserLoggedIn,
    setCurrentUser,
    currentUser
}) => {
    Auth.configure({
        authenticationFlowType: 'CUSTOM_AUTH',
        userPoolId: 'ap-south-1_3IBwq1EGT',
        userPoolWebClientId:'4sr30217an4jhhae4r2am3sljb'
      })
    const [number, setNumber] = useState('')
    const [answer, setAnswer] = useState('')
    const [name, setName] = useState('')
    const [activeStep, setActiveStep] = useState('login')
    const getVerificationCode=()=>{
        Auth.signIn(number)
        .then((res)=>{
            setCurrentUser(res)
            setAnswer('')
            setActiveStep('verify')

        })
        .catch((err=>{
            setActiveStep('register')
        }))

    }
   
    const verifyCode=()=>{
        Auth.sendCustomChallengeAnswer(currentUser,answer)
        .then((res)=>{
           setUserLoggedIn(true) 
           Auth.currentSession()
           .then(res=>{
               if((res.getAccessToken()['jwtToken'])){
                localStorage.setItem('accessToken',res.getAccessToken()['jwtToken'])
               }
           })
           .catch(err=>{
               console.log(err)
           })
        })

    }
    const registerUser=()=>{
        Auth.signUp({
            username:number,
            password:'111111111111',
            attributes:{
              'name':name
            }    
          })
          .then((res)=>{
              getVerificationCode()

          })
    }
    const stepper=()=>{
        switch(activeStep){
            case 'login':return <>
            <input type="text" value={number} onChange={e=>setNumber(e.target.value)}/>
            <button onClick={e=>getVerificationCode()}>Get OTP</button>
            </> 
            case 'verify':return <>
            <input type="text" value={answer} onChange={e=>setAnswer(e.target.value)}/>
            <button onClick={e=>verifyCode()}>Log In</button>
            </>
            case 'register':return <>
            Number :{number}
            <input type="name" onChange={e=>setName(e.target.value)} value={name} placeholder="Enter Your Name"/>
            <button onClick={e=>registerUser()}>Register</button>
            </>
            default:return <p>Error in Application</p>
        }
    }
    return (
        <div>
            {
               stepper()
            }
        </div>
    )
}



export default LoginUser
