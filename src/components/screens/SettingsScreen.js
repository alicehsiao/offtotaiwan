import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, SocialIcon, Button } from 'react-native-elements';
import PropTypes from 'prop-types';

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
        console.log(user.photoURL);
        return(
            <View style={styles.outerContainer}>
                { isLoggedIn ?
                     <Card title={user.name} containerStyle={styles.cardContainer}>
                        <View>
                            <Image
                                style={{width: 50, height: 50, borderRadius: 20, alignSelf: 'center'}}
                                source={{uri: user.photoURL}}
                            />
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
        textAlign: 'center',
        marginTop: 10
    },
    logoutStyle: {
        marginTop: 10, 
        borderRadius: 25
    }
});

SettingsScreen.propTypes = {
  screenProps: PropTypes.shape({
    facebookLogin: PropTypes.func.isRequired,
    googleLogin: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired,
    user: PropTypes.shape({
        photoURL: PropTypes.string
    })
  })
}



export { SettingsScreen };