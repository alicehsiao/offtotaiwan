/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import firebaseApp from './config/firebase';
import firebase from 'firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
// import { GOOGLE_WEB_CLIENT_ID } from 'react-native-dotenv';
import { Button } from 'react-native-elements';
// import { FIREBASE_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_DATABASE_URL } from 'react-native-dotenv';
                                
export default class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     userInfo: {}
  //   };
  // }

  doThis = () => {
    console.log("1")
    firebaseApp.auth()
      .signInAnonymously()
      .then(credential => {
        if (credential) {
          console.log('default app user ->', credential.user.toJSON());
        }
      });
  }

  facebookLogin = async () => {
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

      console.info(JSON.stringify(currentUser.user.toJSON()))
    } catch (e) {
      console.error(e);
    }
  }

  googleLogin = async () => {
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

  render() {

    return (
      <View style = { styles.container }>
        {/* <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " + result.error);
              } else if (result.isCancelled) {
                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                    console.log(data.accessToken.toString())
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/> */}
        <Button
          title = "Login to Facebook"
          onPress = {
            () => this.facebookLogin()
          }
        />
        <Button
          title = "Login to Google"
          onPress = {
            () => this.googleLogin()
          }
        />
        < Button
          title = "Login to Firebase Anonymously"
          onPress = {
            () => this.doThis()
          }
        />
        {/* <GoogleSigninButton
          style={styles.googleButtonStyle}
          size={GoogleSigninButton.Size.Icon}
          color={GoogleSigninButton.Color.Dark}
          onPress={() => this.signIn()}
          disabled={this.state.isSigninInProgress} />
        {
          this.state.userInfo && <Text>Hello </Text> } */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
