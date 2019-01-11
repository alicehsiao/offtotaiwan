/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { Component } from 'react';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetailsScreen from './components/screens/DetailsScreen';
import FoodJointScreen from './components/screens/FoodJointScreen';
// import PropTypes from 'prop-types';
import {
  HomeScreen,
  SettingsScreen,
  SearchScreen,
  HeartScreen,
  EventsScreen
} from './components/screens';

class App extends Component {
  render() {
    return (
      <AppContainer />
    )
  }
}

// React Navigation
const HomeStack = createStackNavigator({
    Home: HomeScreen,
    FoodJoints: FoodJointScreen,
    Details: DetailsScreen
});

const SearchStack = createStackNavigator({
    Search: SearchScreen
});

const EventsStack = createStackNavigator({
  Events: EventsScreen
});

const HeartStack = createStackNavigator({
  Heart: HeartScreen
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});



const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeStack,
        Search: SearchStack,
        Heart: HeartStack,
        Events: EventsStack,
        Settings: SettingsStack
    },
    {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        switch(routeName) {
          case "Home":
            iconName = `ios-information-circle`;
            break;
          case "Settings":
            iconName = `ios-options`;
            break;
          case "Heart":
            iconName = `ios-heart`;
            break;
          case "Events":
            iconName = `ios-calendar`;
            break;
          case "Search":
            iconName = `ios-search`;
            break;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    },
  }
);

const AppContainer = createAppContainer(TabNavigator);

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