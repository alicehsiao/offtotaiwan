/* eslint-disable no-console */
import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, View, StyleSheet } from 'react-native';
import HikeCard from './HikeCard';
import axios from 'axios';

class HikeScreen extends Component {
    static navigationOptions = {
        title: 'Hikes',
        headerStyle: {
            backgroundColor: '#ac0d42',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    state = {
        hikes: [],
        isReady: false
    };

    componentDidMount() {
        // const URL = 'http://192.168.0.11:7777/api/v1/hikingtrails';
        const URL = 'http://172.24.25.128:7777/api/v1/hikingtrails';
        axios.get(URL)
            .then(response => {
                this.setState({
                    hikes: response.data,
                    isReady: true
                });
            })
            .catch(err => console.log(err))
    }

    renderFoodJoints() {
       return this.state.hikes.map(place => 
            <HikeCard key={place.name} place={place}/>
       );
    }

    render() {
        return (
            <ScrollView>
                {
                    this.state.isReady ? 
                    this.renderFoodJoints() : 
                    <View style = {styles.container}>
                        <ActivityIndicator
                            color = '#ac0d42'
                            size = "large"
                            style = {styles.activityIndicator}/>
                    </View>
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});

export { HikeScreen };