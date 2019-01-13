/* eslint-disable no-console */
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import PlaceDetail from './PlaceDetail';
import axios from 'axios';

class FoodJointScreen extends Component {
    static navigationOptions = {
        title: 'Food Joints',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    state = {
        foodJoints: []
    };

    componentDidMount() {
        const URL = 'http://192.168.0.11:7777/api/v1/tests';
        // const URL = 'http://172.24.25.128:7777/api/v1/tests';
        axios.get(URL)
            .then(response => {
                this.setState({
                    foodJoints: response.data
                });
            })
            .catch(err => console.log(err))
    }

    renderFoodJoints() {
       return this.state.foodJoints.map(place => 
            <PlaceDetail key={place.name} place={place} navigation={this.props.navigation}/>
       );
    }

    render() {
        return (
            <ScrollView>
                {this.renderFoodJoints()}
            </ScrollView>
        );
    }
}

export default FoodJointScreen;