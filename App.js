/* eslint-disable no-undef */
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
        name: 'Laura',
        email: 'laura@gmail.com'
      }
    };
  }

  componentDidMount() {
    SplashScreen.hide();
  }
// ref.child('users').child('123').set({
//   "first_name": "rob",
//   "age": 28
// })

  escapeEmailAddress = (email) => {
    if (!email) return false

    // Replace '.' (not allowed in a Firebase key) with ',' (not allowed in an email address)
    email = email.toLowerCase();
    email = email.replace(/\./g, ',');
    return email;
  }

  addUser = (name, email) => {
    const user = db.ref('users').child(this.escapeEmailAddress(email));
    user.set({
      name,
      email,
    }).then(data => {
      console.log(data);
    })
    // db.ref('users').push({
    //   name,
    //   email,
    // }).then(data => {
    //   console.log(data);
    // })
  }


 findUserInDatabase = (email) => {
   const doesExist = db.ref().child("users").orderByChild("email").equalTo(email).once("value").then(function(snapshot) {
     if (snapshot.exists()) {
       return snapshot.val();
     }
   });
   console.log(doesExist);
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
          title = "Find user"
          onPress = {
            () => this.findUserInDatabase("laura@gmail.com")
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
