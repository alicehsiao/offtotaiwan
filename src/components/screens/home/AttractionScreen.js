/* eslint-disable no-console */
import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, View, StyleSheet } from 'react-native';
import AttractionCard from './AttractionCard';
import axios from 'axios';

class AttractionScreen extends Component {
    static navigationOptions = {
        title: 'Attractions',
        headerStyle: {
            backgroundColor: '#ac0d42',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    state = {
        attractions: [],
        isReady: false
    };

    componentDidMount() {
        const URL = 'http://192.168.0.11:7777/api/v1/attractions';
        // const URL = 'http://172.24.25.128:7777/api/v1/attractions';
        axios.get(URL)
            .then(response => {
                this.setState({
                    attractions: response.data,
                    isReady: true
                });
            })
            .catch(err => console.log(err))
    }

    renderFoodJoints() {
       return this.state.attractions.map(place => 
            <AttractionCard key={place.name} place={place}/>
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

export { AttractionScreen };