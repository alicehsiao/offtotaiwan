/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer, StackActions } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DetailsScreen from './components/screens/DetailsScreen';
import FoodJointScreen from './components/screens/FoodJointScreen';
import PlaceDetail from './components/screens/PlaceDetail';
import NavigationService from './NavigationService';
// import PropTypes from 'prop-types';
import {
  HomeScreen,
  SettingsScreen,
  SearchScreen,
  HeartScreen,
  EventsScreen,
  UpcomingDetailScreen
} from './components/screens';

class Router extends Component {
  componentDidMount() {
    StatusBar.setBarStyle('light-content');
  }
  render() {
    const screenProps = {
        facebookLogin: this.props.screenProps.facebookLogin,
        googleLogin: this.props.screenProps.googleLogin,
        isLoggedIn: this.props.screenProps.isLoggedIn,
        logOut: this.props.screenProps.logOut,
        user: this.props.screenProps.user
    }
    return (
      <AppContainer screenProps={screenProps} ref={ navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}/>
    )
  }
}

// React Navigation
const HomeStack = createStackNavigator({
    Home: HomeScreen,
    FoodJoints: FoodJointScreen,
    Details: PlaceDetail
});

const SearchStack = createStackNavigator({
    Search: SearchScreen
});

const EventsStack = createStackNavigator({
  Events: EventsScreen,
  Event: UpcomingDetailScreen
});

const HeartStack = createStackNavigator({
  Heart: HeartScreen
});


const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeStack,
        Search: SearchStack,
        Heart: HeartStack,
        Events: EventsStack
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
      headerStyle: {
        backgroundColor: '#ac0d42'
      },
      headerTintColor: '#fff'
    }),
    tabBarOptions: {
      activeTintColor: '#ac0d42',
      inactiveTintColor: 'gray',
    },
  }
);

const AppContainer = createAppContainer(TabNavigator);

export default Router;