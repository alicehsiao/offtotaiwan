/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, SocialIcon } from 'react-native-elements';
import BikeCard from '../home/BikeCard';
import AttractionCard from '../home/AttractionCard';
import FoodJointCard from '../home/FoodJointCard';
import HikeCard from '../home/HikeCard';
import { Container, Content } from 'native-base';

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
        // Return correct card based on type
        return heartedPlaces.map(place => {
            switch(place.category){
                case "bike":
                    return <BikeCard 
                                key={place.name} 
                                place={place} 
                                updateHeart={this.props.screenProps.updateHeart} 
                                isLoggedIn={this.props.screenProps.isLoggedIn}/>
                case "eat":
                    return <FoodJointCard 
                                key={place.name} 
                                place={place} 
                                updateHeart={this.props.screenProps.updateHeart} 
                                isLoggedIn={this.props.screenProps.isLoggedIn}/>
                case "hike":
                    return <HikeCard 
                                key={place.name} 
                                place={place} 
                                updateHeart={this.props.screenProps.updateHeart} 
                                isLoggedIn={this.props.screenProps.isLoggedIn}/>
                case "explore":
                    return <AttractionCard 
                                key={place.name} 
                                place={place} 
                                updateHeart={this.props.screenProps.updateHeart} 
                                isLoggedIn={this.props.screenProps.isLoggedIn}/>
            } 
        });
    }

    render(){
        const { isLoggedIn, facebookLogin, googleLogin, heartedPlaces } = this.props.screenProps;
        return(
            <Container>
                <Content>
                    { isLoggedIn ?
                        this.renderHearts(heartedPlaces)
                        :
                        <View style={styles.outerContainer}>
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
                        </View>
                    }
                </Content>
            </Container>
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