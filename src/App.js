/* eslint-disable react/display-name */
import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import Router from './Router';
import firebaseApp from '../config/firebase';
import firebase from 'firebase';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin, statusCodes } from 'react-native-google-signin';
import SplashScreen from "react-native-splash-screen";
import { db } from '../config/firebase';
import NavigationService from './NavigationService';
import axios from 'axios';
class App extends Component {
  state = {
    isLoggedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      hearts: [],
      provider: '',
      events: []
    },
    eventList: []
  }

  async componentDidMount(){
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        console.log("User is Logged In");
        const data = JSON.parse(value);
        await this.findUserInDatabase(data.name, data.email, data.provider);
      } else {
        console.log("User is Not Logged In");
      }
    } catch (error) {
      console.log('Error Retrieving Data');
    }

    await this.loadEvents();

    SplashScreen.hide();
  }

  findUserInDatabase = async (name, email, provider) => {
     await db.ref().child("users").orderByChild("email").equalTo(email).once("value", async (snapshot) => {
       if (snapshot.exists()) {
         // User exists in DB
         const key = Object.keys(snapshot.val())[0];
         snapshot.forEach(childSnapshot => {
           var data = childSnapshot.val();
           this.setState({
             user: {
                id: key,
                name: data.name,
                email: data.email,
                hearts: data.hearts || [],
                events: data.events || [],
             },
             isLoggedIn: true,
             provider,
           })
         })
       } else {
         // Create New User
          await db.ref('users').push({
            name,
            email,
            provider,
          }).then(() => {
            this.setState({
              user: {
                name,
                email,
                provider,
              },
              isLoggedIn: true
            })
          })
       }
     });
  }

  facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        await LoginManager.logOut();
        NavigationService.navigate('Home');
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        alert('Unfortunately, we are unable to log you in at this moment');
      }

      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      const currentUser = await firebaseApp.auth().signInAndRetrieveDataWithCredential(credential);

      await this.findUserInDatabase(currentUser.user.displayName, currentUser.user.email, "facebook");

      await AsyncStorage.setItem('user', JSON.stringify(currentUser.user));

      NavigationService.navigate('Home');
    } catch (e) {
      console.error(e);
    }
  }

  googleLogin = async () => {
    try {
      await GoogleSignin.configure();

      const data = await GoogleSignin.signIn();
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      let currentUser = await firebaseApp.auth().signInAndRetrieveDataWithCredential(credential);

      await this.findUserInDatabase(currentUser.user.displayName, currentUser.user.email, "google");
      await AsyncStorage.setItem('user', JSON.stringify(currentUser.user));

      NavigationService.navigate('Home');
    } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          NavigationService.navigate('Home');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          alert('Google Sign In is already in progress');
        } else {
          console.log(error);
        }
    }
  }

  logOut = async () => {
    try {

      switch(this.state.provider) {
        case "facebook":
          await LoginManager.logOut();
          
          break;
        case "google":
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          break;
      }

      // Firebase Sign Out
      await firebaseApp.auth().signOut();

      // Reset User
      await AsyncStorage.removeItem('user');
      this.setState({
        isLoggedIn: false,
        user: {
          name: "",
          email: "",
          hearts: [],
          provider: ""
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  loadEvents = async () => {
    const URL = 'https://off-to-taiwan.herokuapp.com/api/v1/activities';
    await axios.get(URL)
      .then((response) => {

        this.setState({
          eventList: response.data
        });
      })
      .catch(err => console.log(err))
    
    if(this.state.isLoggedIn){
      let eventList = [...this.state.eventList];
      for (const index in eventList){
        for(const event of this.state.user.events){
          if(event._id === eventList[index]._id){
            eventList[index].bookmark = true;
          }
        }
      }

      this.setState({
        eventList
      });
    }
  }

  findEvent(eventList, id) {
      return eventList.find(event => event._id === id);
  }

  updateBookmark = async (id) => {
      let eventList = [...this.state.eventList];
      let singleEvent = this.findEvent(eventList, id);
      for (const event in eventList) {
          if (eventList[event]._id === singleEvent._id) {
              eventList[event].bookmark = !eventList[event].bookmark;
              break;
          }
      }

      this.setState({
          eventList
      }, () => {
        const user = {...this.state.user}
        user.events = this.state.eventList.filter((event) => event.bookmark === true)
        this.setState({
          user
        }, () => {
          const usersRef = db.ref().child(`users/${this.state.user.id}`);
          usersRef.update({
            "events": this.state.user.events
          })
        });
      });
  };

  render() {
    const screenProps = {
      facebookLogin: this.facebookLogin,
      googleLogin: this.googleLogin,
      isLoggedIn: this.state.isLoggedIn,
      logOut: this.logOut,
      user: this.state.user,
      updateBookmark: this.updateBookmark,
      eventList: this.state.eventList,
      bookmarkedEvents: this.state.user.events
    }

    return (
      <Router screenProps={screenProps}/>
    )
  }
}

export default App;