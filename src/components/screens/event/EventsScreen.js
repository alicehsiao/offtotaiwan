/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Container, Tab, Tabs } from 'native-base';
import UpcomingTab from './UpcomingTab';
import BookmarkedEventTab from './BookmarkedEventTab';


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
        const screenProps = {
            facebookLogin: this.props.screenProps.facebookLogin,
            googleLogin: this.props.screenProps.googleLogin,
            isLoggedIn: this.props.screenProps.isLoggedIn,
            logOut: this.props.screenProps.logOut,
            user: this.props.screenProps.user,
            loadEvents: this.props.screenProps.loadEvents,
            updateBookmark: this.props.screenProps.updateBookmark,
            eventList: this.props.screenProps.eventList
        }

        return (
            <Container>
                <Tabs>
                    <Tab heading="Upcoming">
                        <UpcomingTab screenProps={screenProps}/>
                    </Tab>
                    <Tab heading="Bookmarked">
                        <BookmarkedEventTab screenProps={screenProps}/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export { EventsScreen };