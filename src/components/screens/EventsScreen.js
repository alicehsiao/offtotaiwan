import React, { Component } from 'react';
import { Container, Tab, Tabs } from 'native-base';
import UpcomingScreen from './UpcomingScreen';
import NearMeScreen from './events/NearMeScreen';


class EventsScreen extends Component {
    static navigationOptions = {
        title: 'Events',
        headerStyle: {
            backgroundColor: '#ac0d42',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };

    render(){
        return (
            <Container>
                <Tabs>
                    <Tab heading="Upcoming">
                        <UpcomingScreen />
                    </Tab>
                    <Tab heading="Near Me">
                        <NearMeScreen />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export { EventsScreen };