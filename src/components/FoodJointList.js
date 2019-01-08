/* eslint-disable no-console */
import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import FoodJointDetail from './FoodJointDetail';
import axios from 'axios';

class FoodJointList extends Component {
    state = {
        foodJoints: []
    };

    componentDidMount() {
        const URL = 'http://172.24.25.128:7777/api/v1/tests';
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
            <FoodJointDetail key={place.name} place={place} navigation={this.props.navigation}/>
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

export default FoodJointList;