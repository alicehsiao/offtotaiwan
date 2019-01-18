import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, View, StyleSheet } from 'react-native';
import BikeCard from './BikeCard';
import PropTypes from 'prop-types';

class BikeScreen extends Component {
    static navigationOptions = {
        title: 'Bikes',
        headerStyle: {
            backgroundColor: '#ac0d42',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    state = {
        bikeList: [],
        isReady: false
    };

    componentDidMount() {
        this.setState({
            bikeList: this.props.screenProps.bikeList,
            isReady: true
        })
    }

    renderBikePaths() {
       return this.state.bikeList.map(place => 
            <BikeCard 
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
                    this.renderBikePaths() : 
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

BikeScreen.propTypes = {
    screenProps: PropTypes.shape({
        isLoggedIn: PropTypes.bool.isRequired,
        updateHeart: PropTypes.func.isRequired,
        bikeList: PropTypes.array.isRequired
    })
}

export { BikeScreen };