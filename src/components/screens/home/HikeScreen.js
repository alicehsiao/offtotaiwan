import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, View, StyleSheet } from 'react-native';
import HikeCard from './HikeCard';
import PropTypes from 'prop-types';

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
        hikeList: [],
        isReady: false
    };

    componentDidMount() {
        this.setState({
            hikeList: this.props.screenProps.hikeList,
            isReady: true
        })
    }

    renderHikes() {
       return this.state.hikeList.map(place => 
            <HikeCard 
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
                    this.renderHikes() : 
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

HikeScreen.propTypes = {
    screenProps: PropTypes.shape({
        isLoggedIn: PropTypes.bool.isRequired,
        updateHeart: PropTypes.func.isRequired,
        hikeList: PropTypes.array.isRequired
    })
}

export { HikeScreen };