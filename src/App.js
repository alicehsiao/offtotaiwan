/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import React, {
    Component
} from 'react';
import {
    createStackNavigator,
    createAppContainer
} from 'react-navigation';
import HomeScreen from './components/HomeScreen';
import DetailsScreen from './components/DetailsScreen';
import ModalScreen from './components/ModalScreen';
import MapScreen from './components/MapScreen';
// import Ionicons from 'react-native-vector-icons/Ionicons';

// First Parameter: Route Configuration Object (keys: route names)
// Second Parameter: Options Object
// Returns: A Component
const MainStack = createStackNavigator({
    Home: HomeScreen,
    Details: DetailsScreen,
    Maps: MapScreen
}, {
    initialRouteName: "Home",
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    }
});

const RootStack = createStackNavigator({
    Main: MainStack,
    MyModal: ModalScreen
}, {
    mode: 'modal',
    headerMode: 'none',
});

// const HomeStack = createStackNavigator({
//     Home: HomeScreen,
//     Details: DetailsScreen,
// });

// const SettingsStack = createStackNavigator({
//     Settings: SettingsScreen,
//     Profile: ProfileScreen,
// });

// const TabNavigator = createBottomTabNavigator(
//     {
//         Home: HomeStack,
//         Settings: SettingsStack,
//     }
// )

const AppContainer = createAppContainer(RootStack);
// const AppContainer = createAppContainer(TabNavigator);

class App extends Component {
    render() {
        // onNavigationStateChange (function that gets called everything navigation state managed by the navigator changes)
        // uriPrefix (prefix of the URI's that the app might handle - deep linking to extract the path passed to router)
        return <AppContainer / > ;
    }
}

// HomeScreen.propTypes = {
//     navigation: PropTypes.shape({
//         navigate: PropTypes.func.isRequired,
//     }).isRequired,
// };

export default App;

// React Navigation Lifecycle Events
// How do we find out that a user is leaving a screen or coming back to it? willFoxus, willBlur, didFocus, didBlur
// Look into: withNavigationFocus, <NavigationEvents /> 

// Passing params
// .navigate and .push accept optional second argument
// JSON-serializable (state persistence, deep linking)
// EX: Say, you have an object
// {
//     foo: [1, 4, 7, 10],
//     bar: "baz"
// }
// serializing into JSON will convert it into a string:
// '{"foo":[1,4,7,10],"bar":"baz"}'

// Accessing Params Alternatives
// this.props.navigation.state.params (can be null)
// this.props.itemId (use react-navigation-props-mapper)


// to Replace Title with custom component
// class LogoTitle extends React.Component {
//     render() {
//         return ( <
//             Image source = {
//                 require('./spiro.png')
//             }
//             style = {
//                 {
//                     width: 30,
//                     height: 30
//                 }
//             }
//             />
//         );
//     }
// }

// class HomeScreen extends React.Component {
//     static navigationOptions = {
//         // headerTitle instead of title
//         headerTitle: < LogoTitle / > ,
//     };

//     /* render function, etc */
// }