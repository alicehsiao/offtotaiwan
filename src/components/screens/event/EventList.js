/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import EventCard from './EventCard';
import axios from 'axios';

class EventList extends Component {
    state = {
        events: [],
        isReady: false
    }
    componentDidMount() {
        // const URL = 'http://192.168.0.11:7777/api/v1/activities';
        const URL = 'http://172.24.25.128:7777/api/v1/activities';
        axios.get(URL)
            .then(response => {
                this.setState({
                    events: response.data,
                    isReady: true
                });
            })
            .catch(err => console.log(err))
    }

    renderEvents() {
       return this.state.events.map(event => 
            <EventCard key={event.name} event={event} />
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
})

export default EventList;