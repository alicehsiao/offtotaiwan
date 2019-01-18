/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, SocialIcon } from 'react-native-elements';
import HikeCard from '../home/HikeCard';

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

    renderHearts(heartedPlaces) {
        return heartedPlaces.map(place => 
            // Return correct card depending on category
                <HikeCard 
                    key={place.name} 
                    event={place} 
                    updateHeart={this.props.screenProps.updateHeart} 
                    isLoggedIn={this.props.screenProps.isLoggedIn}/>
        );
    }

    render(){
        const { isLoggedIn, facebookLogin, googleLogin, heartedPlaces } = this.props.screenProps;
        return(
            <View style={styles.outerContainer}>
                { isLoggedIn ?
                     this.renderEvents(heartedPlaces)
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