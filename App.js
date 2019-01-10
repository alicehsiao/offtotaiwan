/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {Button, View, StyleSheet} from 'react-native';
import firebase from 'react-native-firebase';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
                                
export default class App extends Component {
  dothis = () => {
    firebase.auth()
      .signInAnonymously()
      .then(credential => {
        if (credential) {
          console.log('default app user ->', credential.user.toJSON());
        }
      });
  }

  render() {
    return (
        // <View style={styles.container}>
        //   < Button
        //     title = "Log In With Facebook"
        //     onPress = {
        //       () => this.dothis()
        //     }
        //   />
        // </View>
        < View style = {
          styles.container
        } >
        <LoginButton
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
          onLogoutFinished={() => console.log("logout.")}/>
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