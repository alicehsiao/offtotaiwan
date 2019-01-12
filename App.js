/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import firebaseApp from './config/firebase';
import firebase from 'firebase';
                                
export default class App extends Component {
  constructor(props) {
    super(props);

    this.ref = firebase.firestore().collection('users');
    this.state = {
      userInfo: {}
    };
  }


  render() {

    return (
      <View style = { styles.container }>
        <Text>Hello</Text>
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
