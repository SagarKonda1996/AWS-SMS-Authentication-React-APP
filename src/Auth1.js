import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
export const AuthService=()=>{
    let cognitouser = CognitoUser & { challengeParam: { sms: string } };
    const signIn=async()=>{
        cognitouser=await Auth.signIn(sms)
    }
    const signOuth=async()=>{
        await Auth.signOut()
    }
    const  answerCustomChallenge=async(answer)=>{
        cognitouser=await Auth.sendCustomChallengeAnswer(cognitoUser, answer);
        return isAuthenticated();
    }
    const getPublicChallengeParameters=async ()=> {
        return cognitoUser.challengeParam;
      }
    
      const signUp= async(sms, fullName)=> {
        const params = {
          username: sms,
          password: this.getRandomString(30),
          attributes: {
            name: fullName
          }
        };
        await Auth.signUp(params);
      }
    
      const getRandomString=(bytes)=> {
        const randomValues = new Uint8Array(bytes);
        this.window.crypto.getRandomValues(randomValues);
        return Array.from(randomValues).map(this.intToHex).join('');
      }
    
      const intToHex=(nr)=> {
        return nr.toString(16).padStart(2, '0');
      }
    
    const  isAuthenticated=async()=> {
        try {
          await Auth.currentSession();
          return true;
        } catch {
          return false;
        }
      }
    
      const getUserDetails=async ()=> {
        if (!this.cognitoUser) {
          this.cognitoUser = await Auth.currentAuthenticatedUser();
        }
        return await Auth.userAttributes(this.cognitoUser);
      }
}
