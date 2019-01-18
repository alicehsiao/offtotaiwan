/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { createBottomTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationService from './NavigationService';
import PropTypes from 'prop-types';

import {
  HomeScreen,
  SearchScreen,
  SettingsScreen,
  HeartScreen,
  EventsScreen,
  EventDetailScreen,
  FoodJointScreen,
  FoodJointDetailScreen,
  HikeScreen,
  HikeDetailScreen,
  BikeScreen,
  BikeDetailScreen,
  AttractionScreen,
  AttractionDetailScreen
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
        user: this.props.screenProps.user,
        updateBookmark: this.props.screenProps.updateBookmark,
        eventList: this.props.screenProps.eventList,
        bookmarkedEvents: this.props.screenProps.bookmarkedEvents,
        updateHeart: this.props.screenProps.updateHeart,
        heartedPlaces: this.props.screenProps.hearts,
        hikeList: this.props.screenProps.hikeList,
        bikeList: this.props.screenProps.bikeList,
        eatList: this.props.screenProps.eatList,
        exploreList: this.props.screenProps.exploreList
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
    FoodJointDetails: FoodJointDetailScreen,
    Hikes: HikeScreen,
    HikeDetails: HikeDetailScreen,
    Bikes: BikeScreen,
    BikeDetails: BikeDetailScreen,
    Attractions: AttractionScreen,
    AttractionDetails: AttractionDetailScreen,
    Settings: SettingsScreen
});

const SearchStack = createStackNavigator({
    Search: SearchScreen,
    FoodJointDetails: FoodJointDetailScreen
});

const EventsStack = createStackNavigator({
  Events: EventsScreen,
  Event: EventDetailScreen
});

const HeartStack = createStackNavigator({
  Heart: HeartScreen,
  AttractionDetails: AttractionDetailScreen,
  BikeDetails: BikeDetailScreen,
  HikeDetails: HikeDetailScreen,
  FoodJointDetails: FoodJointDetailScreen,
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

Router.propTypes = {
  screenProps: PropTypes.shape({
    facebookLogin: PropTypes.func.isRequired,
    googleLogin: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired,
    user: PropTypes.object,
    updateBookmark: PropTypes.func.isRequired,
    eventList: PropTypes.array.isRequired,
    bookmarkedEvents: PropTypes.array
  })
}


export default Router;