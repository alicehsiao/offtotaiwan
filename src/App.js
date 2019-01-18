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
      photoURL: '',
      email: '',
      hearts: [],
      provider: '',
      events: []
    },
    eventList: [],
    hikeList: [],
    bikeList: [],
    eatList: [],
    exploreList: []
  }

  async componentDidMount(){
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        console.log("User is Logged In");
        const data = JSON.parse(value);
        await this.findUserInDatabase(data.name, data.email, data.provider, data.photoURL);
      } else {
        console.log("User is Not Logged In");
      }
    } catch (error) {
      console.log('Error Retrieving Data');
    }

    await this.loadEvents();
    await this.loadHikes();
    await this.loadBikePaths();
    await this.loadFoodJoints();
    await this.loadAttractions();

    SplashScreen.hide();
  }

  findUserInDatabase = async (name, email, provider, photoURL) => {
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
                photoURL: data.photoURL
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
            photoURL,
          }).then(() => {
            this.setState({
              user: {
                name,
                email,
                provider,
                photoURL,
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

  loadHikes = async () => {
      const URL = 'https://off-to-taiwan.herokuapp.com/api/v1/hikingtrails';
      axios.get(URL)
        .then(response => {
          this.setState({
            hikeList: response.data
          });
        })
        .catch(err => console.log(err))

      if(this.state.isLoggedIn){
        let hikeList = [...this.state.hikeList];
        for (const index in hikeList){
          for(const heart of this.state.user.hearts){
            if(heart._id === hikeList[index]._id){
              hikeList[index].heart = true;
            }
          }
        }

        this.setState({
          hikeList
        });
      }
  }

  loadBikePaths = async () => {
    const URL = 'https://off-to-taiwan.herokuapp.com/api/v1/bikepaths';
    axios.get(URL)
      .then(response => {
        this.setState({
          bikeList: response.data
        });
      })
      .catch(err => console.log(err))
    
    if(this.state.isLoggedIn){
      let bikeList = [...this.state.bikeList];
      for (const index in bikeList){
        for(const heart of this.state.user.hearts){
          if(heart._id === bikeList[index]._id){
            bikeList[index].heart = true;
          }
        }
      }

      this.setState({
        bikeList
      });
    }
  }

  loadFoodJoints = async () => {
    const URL = 'https://off-to-taiwan.herokuapp.com/api/v1/foodjoints';
    axios.get(URL)
      .then(response => {
        this.setState({
          eatList: response.data
        });
      })
      .catch(err => console.log(err))
    
    if(this.state.isLoggedIn){
      let eatList = [...this.state.eatList];
      for (const index in eatList){
        for(const heart of this.state.user.hearts){
          if(heart._id === eatList[index]._id){
            eatList[index].heart = true;
          }
        }
      }

      this.setState({
        eatList
      });
    }
  }

  loadAttractions = async () => {
    const URL = 'https://off-to-taiwan.herokuapp.com/api/v1/attractions';
    axios.get(URL)
      .then(response => {
        this.setState({
          exploreList: response.data
        });
      })
      .catch(err => console.log(err))
    
    if(this.state.isLoggedIn){
      let exploreList = [...this.state.exploreList];
      for (const index in exploreList){
        for(const heart of this.state.user.hearts){
          if(heart._id === exploreList[index]._id){
            exploreList[index].heart = true;
          }
        }
      }

      this.setState({
        exploreList
      });
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

  updateHeart = async (id) => {

  }

  render() {
    const screenProps = {
      facebookLogin: this.facebookLogin,
      googleLogin: this.googleLogin,
      isLoggedIn: this.state.isLoggedIn,
      logOut: this.logOut,
      user: this.state.user,
      updateBookmark: this.updateBookmark,
      eventList: this.state.eventList,
      bookmarkedEvents: this.state.user.events,
      updateHeart: this.updateHeart,
      heartedPlaces: this.state.user.hearts,
      hikeList: this.state.hikeList,
      bikeList: this.state.bikeList,
      eatList: this.state.eatList,
      exploreList: this.state.exploreList
    }

    return (
      <Router screenProps={screenProps}/>
    )
  }
}

export default App;