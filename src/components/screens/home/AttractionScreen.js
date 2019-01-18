import React, { Component } from 'react';
import { ScrollView, ActivityIndicator, View, StyleSheet } from 'react-native';
import AttractionCard from './AttractionCard';
import PropTypes from 'prop-types';

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
        exploreList: [],
        isReady: false
    };

    componentDidMount() {
        this.setState({
            exploreList: this.props.screenProps.exploreList,
            isReady: true
        })
    }

    renderAttractions() {
       return this.state.exploreList.map(place => 
            <AttractionCard 
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
                    this.renderAttractions() : 
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

AttractionScreen.propTypes = {
    screenProps: PropTypes.shape({
        isLoggedIn: PropTypes.bool.isRequired,
        updateHeart: PropTypes.func.isRequired,
        exploreList: PropTypes.array.isRequired
    })
}

export { AttractionScreen };