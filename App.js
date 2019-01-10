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
        <View style={styles.container}>
          < Button
            title = "Log In With Facebook"
            onPress = {
              () => this.dothis()
            }
          />
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