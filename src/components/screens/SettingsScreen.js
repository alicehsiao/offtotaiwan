import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Card, SocialIcon, Button } from 'react-native-elements';
import { Accordion } from 'native-base';
import PropTypes from 'prop-types';

const dataArray = [
  { title: "About", content: "Created by: Alice Hsiao \nFor: Ada Developers Academy Capstone Project" },
  { title: "Terms of Service", content: "This is a placeholder for the terms of service of Off To Taiwan." },
  { title: "Privacy Policy", content: "This is a placeholder for the privacy policy of Off To Taiwan." }
];
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
            <View>
                <View style={styles.outerContainer}>
                    { isLoggedIn ?
                        <Card title={user.name} containerStyle={styles.cardContainer}>
                            <View>
                                <Image
                                    style={styles.imageStyle}
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
                {/* <Divider style={{ backgroundColor: 'black', marginTop: 20 }} /> */}
                <Accordion dataArray={dataArray} icon="add" expandedIcon="remove" headerStyle={{backgroundColor: 'white', fontWeight: 'bold'}} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outerContainer: {
        alignItems: 'center',
        marginBottom: 30
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
    },
    imageStyle: {
        width: 50, 
        height: 50, 
        borderRadius: 20, 
        alignSelf: 'center'
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