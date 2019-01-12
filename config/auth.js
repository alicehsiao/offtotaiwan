import firebaseApp from './firebase';
import firebase from 'firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';

const facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw new Error('User cancelled request'); // Handle this however fits the flow of your app
      }

      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();
      console.log(data);

      if (!data) {
        throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
      }
      console.log(data.accessToken);

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      console.log(credential);
      console.log(credential.token);
      // login with credential
      const currentUser = await firebaseApp.auth().signInAndRetrieveDataWithCredential(credential);

      console.log("4");

      console.info(JSON.stringify(currentUser.user.toJSON()));
      

    } catch (e) {
      console.error(e);
    }
}

const googleLogin = async () => {
    try {
        // Add any configuration settings here:
        await GoogleSignin.configure();

        const data = await GoogleSignin.signIn();
        console.log("1");

        // create a new firebase credential with the token
        const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
        console.log("2");

        // login with credential
        const currentUser = await firebaseApp.auth().signInAndRetrieveDataWithCredential(credential);
        console.log("3");

        console.info(JSON.stringify(currentUser.user.toJSON()));
    } catch (e) {
        console.error(e);
    }
}

export { facebookLogin, googleLogin };