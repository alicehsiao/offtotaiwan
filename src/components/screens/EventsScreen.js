import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class EventsScreen extends Component {
    static navigationOptions = {
        title: 'Events',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    render(){
        return(
            <View style={styles.container}>
                <Text>Events Screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export { EventsScreen };