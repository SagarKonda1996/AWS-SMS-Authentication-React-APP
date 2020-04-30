import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';
export class AuthService{
    private cognitoUser: CognitoUser & { challengeParam: { sms: string } };
    private window: Window;
    public async signIn(sms: string) {
        this.cognitoUser = await Auth.signIn(sms);
      }
    
      public async signOut() {
        await Auth.signOut();
      }
    
      public async answerCustomChallenge(answer: string) {
        this.cognitoUser = await Auth.sendCustomChallengeAnswer(this.cognitoUser, answer);
        return this.isAuthenticated();
      }
    
      public async getPublicChallengeParameters() {
        return this.cognitoUser.challengeParam;
      }
    
      public async signUp(sms: string, fullName: string) {
        const params = {
          username: sms,
          password: this.getRandomString(30),
          attributes: {
            name: fullName
          }
        };
        await Auth.signUp(params);
      }
    
      private getRandomString(bytes: number) {
        const randomValues = new Uint8Array(bytes);
        this.window.crypto.getRandomValues(randomValues);
        return Array.from(randomValues).map(this.intToHex).join('');
      }
    
      private intToHex(nr: number) {
        return nr.toString(16).padStart(2, '0');
      }
    
      public async isAuthenticated() {
        try {
          await Auth.currentSession();
          return true;
        } catch {
          return false;
        }
      }
    
      public async getUserDetails() {
        if (!this.cognitoUser) {
          this.cognitoUser = await Auth.currentAuthenticatedUser();
        }
        return await Auth.userAttributes(this.cognitoUser);
      }
}
