/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

class SettingsScreen extends Component {
    static navigationOptions = {
        title: 'Settings',
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
                <Text>Settings Screen</Text>
                <Button
                    title = "Login to Facebook"
                    onPress = {
                        () => this.props.screenProps.facebookLogin()
                    }
                />
                <Button
                    title = "Login to Google"
                    onPress = {
                        () => this.props.screenProps.googleLogin()
                    }
                />
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

export { SettingsScreen };