/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, SocialIcon } from 'react-native-elements';

class HeartScreen extends Component {
    static navigationOptions = {
        title: 'Favorites',
        headerStyle: {
            backgroundColor: '#ac0d42',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };

    render(){
        const { isLoggedIn, facebookLogin, googleLogin } = this.props.screenProps;
        return(
            <View style={styles.outerContainer}>
                { isLoggedIn ?
                     <Text>List of Favorites</Text>
                     :
                     <Card title="Login to Add Favorites!" containerStyle={styles.cardContainer}>
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
        alignItems: 'center'
    },
    cardContainer: {
        width: 300
    }
});

export { HeartScreen };