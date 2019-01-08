import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

// Details Screen
// push adds a new route to the navigation stack
// navigate will stay on the screen
// To Navigate Home: .navigate('Home') or .popToTop();

class DetailsScreen extends Component {
    // navigationOptions is either an object or a function that returns an object
    static navigationOptions = ({ navigation, navigationOptions }) => {

        return {
            title: navigation.getParam('otherParam', "A Nested Details Screen"),
            // headerBackTitle: "WOW",
            /* These values are used instead of the shared configuration! */
            headerStyle: {
                backgroundColor: navigationOptions.headerTintColor,
            },
            headerTintColor: navigationOptions.headerStyle.backgroundColor,
        };
    };

    render() {
        // Params 2. Get the param, provide fallback value if not available

        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'some default value');
        const coordinates = navigation.getParam('coordinates', "no coordinate provided");
        const engAddress = navigation.getParam('engAddress', 'no english address');
    
        const { homeStyle } = styles;
        return (
            <View style={homeStyle}>
                <Text>Details Screen</Text>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text>
                <Text>coordinates: [{coordinates[0]}, {coordinates[1]}]</Text>
                <Text>engAddress: {JSON.stringify(engAddress)}</Text>
                <Button 
                    title="Go to Details... again"
                    onPress={() => this.props.navigation.push('Details', {
                        itemId: Math.floor(Math.random() * 100),
                    })}
                />
                <Button 
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button 
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
                <Button 
                    title="Update the title"
                    onPress={()=> this.props.navigation.setParams({otherParam: 'Updated!'})}
                />
            </View>
        )
    }
}

const styles = {
    homeStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
};

export default DetailsScreen;