/* eslint-disable react/prop-types */
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
class App extends Component {
  state = {
    isLoggedIn: false,
    user: {
      name: '',
      email: '',
      hearts: []
    }
  }

  async componentDidMount(){
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        const data = JSON.parse(value);

        // TODO: find the user in DB and set their hearts
        this.setState({
          isLoggedIn: true,
          user: {
            name: data.displayName,
            email: data.email
          }
        })
      }
    } catch (error) {
      console.log('Error Retrieving Data');
    }

    SplashScreen.hide();
  }

  facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);
      if (result.isCancelled) {
        NavigationService.navigate('Home');
        return;
      }

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        alert('Unfortunately, we are unable to log you in at this moment');
      }

      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
      const currentUser = await firebaseApp.auth().signInAndRetrieveDataWithCredential(credential);

      // Set User Info - TODO - Find User in DB to Set Hearts ([] if new user)
      await AsyncStorage.setItem('user', JSON.stringify(currentUser.user));
      this.setState({
        isLoggedIn: true,
        user: {
          name: currentUser.user.displayName,
          email: currentUser.user.email,
        }
      })

      NavigationService.navigate('Home');
      // TODO: find user in Firestore OR save new user information
      // add hearts to set state above
      // firebase.database().ref().child("users").orderByChild("username").equalTo(username_here).on("value", function (snapshot) {
      //   if (snapshot.exists()) {
      //     console.log("exists");
      //   } else {
      //     console.log("doesn't exist");
      //   }
      // });

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

      // Set User Info - TODO - Find User in DB to set Hearts ([] if new user)
      await AsyncStorage.setItem('user', JSON.stringify(currentUser.user));
      this.setState({
        isLoggedIn: true,
        user: {
          name: currentUser.user.displayName,
          email: currentUser.user.email,
        }
      })

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
      // Facebook Sign Out
      await LoginManager.logOut();

      // Google Sign Out
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

      // Firebase Sign Out
      await firebaseApp.auth().signOut();

      // Reset User
      await AsyncStorage.removeItem('user');
      this.setState({
        isLoggedIn: false,
        user: {
          name: "",
          email: "",
          hearts: []
        }
      });
    } catch (e) {
      console.error(e);
    }
  }


  render() {
    const screenProps = {
      facebookLogin: this.facebookLogin,
      googleLogin: this.googleLogin,
      isLoggedIn: this.state.isLoggedIn,
      logOut: this.logOut
    }

    return (
      <Router screenProps={screenProps}/>
    )
  }
}

export default App;
















// import Ionicons from 'react-native-vector-icons/Ionicons';
// import HomeScreen from './components/HomeScreen';
// import MapScreen from './components/MapScreen';

// class HomeScreen extends React.Component {
  
//   state = {

//   }
//   render() {
//     return (
//       <View style={styles.screenStyle}>
//         <Text>Home!</Text>
//         <Button
//         onPress = {
//             () => this.props.navigation.navigate('Details')
//         }
//         />
//       </View>
//     );
//   }
// }

// class SettingsScreen extends React.Component {
//   render() {
//     return (
//       <View style={styles.screenStyle}>
//         <Text>Settings!</Text>
//         < Button
//         title = "Go to Details"
//         onPress = {
//             () => this.props.navigation.navigate('Details')
//         }
//         />
//       </View>
//     );
//   }
// }

// const HomeStack = createStackNavigator({
//     Home: HomeScreen,
//     Details: DetailsScreen,
//     Maps: MapScreen
// });

// const SettingsStack = createStackNavigator({
//     Settings: SettingsScreen,
//     Details: DetailsScreen,
// });


// class App extends Component {
//     render() {
//         return <AppContainer />;
//     }
// }


// SCROLLABLE TAB VIEW: SIMPLE
// import React from 'react';
// import {
//   Text,
// } from 'react-native';

// import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';

// export default () => {
//   return <ScrollableTabView
//     style={{marginTop: 20, }}
//     initialPage={1}
//     renderTabBar={() => <DefaultTabBar />}
//   >
//     <Text tabLabel='Tab #1'>My</Text>
//     <Text tabLabel='Tab #2'>favorite</Text>
//     <Text tabLabel='Tab #3'>project</Text>
//   </ScrollableTabView>;
// }

// SCROLLABLE TAB VIEW: SCROLLABLE

// import React from 'react';
// import {
//   Text,
//   View,
// } from 'react-native';

// import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

// export default () => {
//   return <ScrollableTabView
//     style={{marginTop: 20, }}
//     initialPage={0}
//     renderTabBar={() => <ScrollableTabBar />}
//   >
//     <Text tabLabel='Tab #1'>My</Text>
//     <Text tabLabel='Tab #2 word word'>favorite</Text>
//     <Text tabLabel='Tab #3 word word word'>project</Text>
//     <Text tabLabel='Tab #4 word word word word'>favorite</Text>
//     <Text tabLabel='Tab #5'>project</Text>
//   </ScrollableTabView>;
// }


// REACT NATIVE SWIPER
// import React, { Component } from 'react';
// import { Text, View, StyleSheet } from 'react-native';
// import Swiper from 'react-native-swiper';

// const styles = StyleSheet.create({
//   wrapper: {
//   },
//   slide1: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#9DD6EB',
//   },
//   slide2: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#97CAE5',
//   },
//   slide3: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#92BBD9',
//   },
//   text: {
//     color: '#fff',
//     fontSize: 30,
//     fontWeight: 'bold',
//   }
// })

// export default class App extends Component {
//   render(){
//     return (
//       <Swiper style={styles.wrapper} showsButtons={true}>
//         <View style={styles.slide1}>
//           <Text style={styles.text}>Hello Swiper</Text>
//         </View>
//         <View style={styles.slide2}>
//           <Text style={styles.text}>Beautiful</Text>
//         </View>
//         <View style={styles.slide3}>
//           <Text style={styles.text}>And simple</Text>
//         </View>
//       </Swiper>
//     );
//   }
// }






// REACT NATIVE UI KITTEN AND REACT NATIVE ELEMENTS
// import React from 'react';
// import { Button, ThemeProvider } from 'react-native-elements';
// import {RkButton} from 'react-native-ui-kitten';

// const App = () => {
//   return (
//       <RkButton style={{marginTop: 50}}>Click Me!</RkButton>
//   );
// };
// export default App;






// REACT NATIVE BASE
// import React, { Component } from 'react';
// import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
// export default class AnatomyExample extends Component {
//   render() {
//     return (
//       <Container>
//         <Header>
//           <Left>
//             <Button transparent>
//               <Icon name='menu' />
//             </Button>
//           </Left>
//           <Body>
//             <Title>Header</Title>
//           </Body>
//           <Right />
//         </Header>
//         <Content>
//           <Text>
//             This is Content Section
//           </Text>
//         </Content>
//         <Footer>
//           <FooterTab>
//             <Button full>
//               <Text>Footer</Text>
//             </Button>
//           </FooterTab>
//         </Footer>
//       </Container>
//     );
//   }
// }