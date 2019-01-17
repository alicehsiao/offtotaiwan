import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import EventCard from './EventCard';
import PropTypes from 'prop-types';
class EventList extends Component {
    state = {
        eventList: [],
        isReady: false
    }
    
    componentDidMount() {
        this.setState({
            eventList: this.props.screenProps.eventList,
            isReady: true
        })
    }

    renderEvents() {
       return this.state.eventList.map(event => 
            <EventCard 
                key={event.name} 
                event={event} 
                updateBookmark={this.props.screenProps.updateBookmark} 
                isLoggedIn={this.props.screenProps.isLoggedIn}/>
       );
    }

    render() {
        return (
            <Container>
                <Content>
                    {
                        this.state.isReady ? 
                        this.renderEvents() : 
                        <View style = {styles.container}>
                            <ActivityIndicator
                                color = '#ac0d42'
                                size = "large"
                                style = {styles.activityIndicator}/>
                        </View>
                    }
                </Content>
            </Container>
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

EventList.propTypes = {
    screenProps: PropTypes.shape({
        isLoggedIn: PropTypes.bool.isRequired,
        updateBookmark: PropTypes.func.isRequired,
        eventList: PropTypes.array.isRequired
    })
}

export default EventList;