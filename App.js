/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
// import firebaseApp from './config/firebase';
// import firebase from 'firebase';
import { db } from './config/firebase';
import SplashScreen from "react-native-splash-screen";
                                
export default class App extends Component {
  constructor(props) {
    super(props);


    this.state = {
      user: {
        name: 'Alice',
        email: 'alice@gmail.com'
      }
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }



  addUser = (name, email) => {
    db.ref('users').push({
      name,
      email
    }).then(data => {
      console.log(data);
    })
  }

  // This gets all users
  readUser = () => {
    db.ref('users').once('value', function(snapshot) {
      console.log(snapshot.val())
    });
  }

  // Read Single User
  doesUserExist = () => {
    db.ref('users').once('value')
      .then(snapshot => {
        snapshot.forEach(childSnapshot => {
          console.log(childSnapshot.key); // user id
          console.log(childSnapshot.val()); // object with name and email
        }) 
      })
  }

  // var userId = firebase.auth().currentUser.uid;
  // return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
  //   var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
  //   // ...
  // });

  render() {

    return (
      <View style = { styles.container }>
        <Text>Hello</Text>
        <Button
          title = "Add user"
          onPress = {
            () => this.addUser(this.state.user.name, this.state.user.email)
          }
        />
        < Button
          title = "Read user"
          onPress = {
            () => this.doesUserExist()
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
