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
            <View style={{alignItems: 'center'}}>
                { isLoggedIn ?
                     <Card title={user.name} containerStyle={{width: 300}}>
                        <View>
                            <Text style={{marginBottom: 10, textAlign: 'center'}}>
                                alice@gmail.com
                            </Text>
                            <Button 
                                title="Logout" 
                                buttonStyle={{marginTop: 10, borderRadius: 25}} 
                                onPress={()=> logOut()}/>
                        </View>
                     </Card>
                     :
                     <Card title="Login" containerStyle={{width: 300}}>
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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export { SettingsScreen };