import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, View, StyleSheet } from 'react-native';
import FoodJointCard from './FoodJointCard';
import PropTypes from 'prop-types';

class FoodJointScreen extends Component {
    static navigationOptions = {
        title: 'Food Joints',
        headerStyle: {
            backgroundColor: '#ac0d42',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    state = {
        eatList: [],
        isReady: false
    };

    componentDidMount() {
        this.setState({
            eatList: this.props.screenProps.eatList,
            isReady: true
        })
    }

    renderFoodJoints() {
       return this.state.eatList.map(place => 
            <FoodJointCard 
                key={place.name} 
                place={place}
                updateHeart={this.props.screenProps.updateHeart} 
                isLoggedIn={this.props.screenProps.isLoggedIn}/>
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

FoodJointScreen.propTypes = {
    screenProps: PropTypes.shape({
        isLoggedIn: PropTypes.bool.isRequired,
        updateHeart: PropTypes.func.isRequired,
        eatList: PropTypes.array.isRequired
    })
}

export { FoodJointScreen };