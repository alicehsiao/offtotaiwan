/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, SocialIcon, Button } from 'react-native-elements';

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
        const { isLoggedIn, user, logOut, facebookLogin, googleLogin } = this.props.screenProps;
        return(
            <View style={styles.outerContainer}>
                { isLoggedIn ?
                     <Card title={user.name} containerStyle={styles.cardContainer}>
                        <View>
                            <Text style={styles.emailStyle}>
                                alice@gmail.com
                            </Text>
                            <Button 
                                title="Logout" 
                                buttonStyle={styles.logoutStyle} 
                                onPress={()=> logOut()}/>
                        </View>
                     </Card>
                     :
                     <Card title="Login" containerStyle={styles.cardContainer}>
                        <SocialIcon
                            title = 'Sign In With Facebook'
                            button
                            type='facebook' 
                            onPress = { () => facebookLogin()}/>
                        <SocialIcon
                            title = 'Sign In With Google'
                            button
                            type = 'google-plus-official'
                            onPress = {() => googleLogin()}/>
                     </Card>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        alignItems: 'center',
    },
    cardContainer: {
        width: 300
    },
    emailStyle: {
        marginBottom: 10, 
        textAlign: 'center'
    },
    logoutStyle: {
        marginTop: 10, 
        borderRadius: 25
    }
});

export { SettingsScreen };