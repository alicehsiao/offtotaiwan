/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

class SettingsScreen extends Component {
    static navigationOptions = {
        title: 'Settings',
        headerStyle: {
            backgroundColor: '#ac0d42',
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
                {this.props.screenProps.isLoggedIn ? 
                <Button
                    title = "Logout"
                    onPress = {
                        () => this.props.screenProps.logOut()
                    }
                /> 
                : 
                <View>
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
                }
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