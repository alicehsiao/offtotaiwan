import React, { Component } from 'react';
import { Container, Tab, Tabs } from 'native-base';
import UpcomingTab from './UpcomingTab';
import BookmarkedEventTab from './BookmarkedEventTab';
import PropTypes from 'prop-types';


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
            updateBookmark: this.props.screenProps.updateBookmark,
            eventList: this.props.screenProps.eventList,
            bookmarkedEvents: this.props.screenProps.bookmarkedEvents
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

EventsScreen.propTypes = {
  screenProps: PropTypes.shape({
    facebookLogin: PropTypes.func.isRequired,
    googleLogin: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    logOut: PropTypes.func.isRequired,
    user: PropTypes.object,
    updateBookmark: PropTypes.func.isRequired,
    eventList: PropTypes.array.isRequired,
    bookmarkedEvents: PropTypes.array
  })
}

export { EventsScreen };