/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Card, SocialIcon } from 'react-native-elements';
import { Container, Content } from 'native-base';
import EventCard from './EventCard';

class BookmarkedEventTab extends Component {
    renderEvents(bookmarkedEvents) {
        return bookmarkedEvents.map(event => 
                <EventCard 
                    key={event.name} 
                    event={event} 
                    updateBookmark={this.props.screenProps.updateBookmark} 
                    isLoggedIn={this.props.screenProps.isLoggedIn}/>
        );
    }

    render() {
        const { isLoggedIn, facebookLogin, googleLogin, bookmarkedEvents } = this.props.screenProps;
            return(
                <Container>
                    <Content>
                        { isLoggedIn ?
                            this.renderEvents(bookmarkedEvents)
                            :
                            <Card title="Login to Bookmark Events!" containerStyle={styles.cardContainer}>
                                <SocialIcon
                                    title = 'Sign In With Facebook'
                                    button
                                    type='facebook' 
                                    onPress = { () => facebookLogin()}/>
                                <SocialIcon
                                    title = 'Sign In With Google'
                                    button
                                    type = 'google-plus-official'
                                    onPress = {() => googleLogin()}/>
                            </Card>
                        }
                    </Content>
                </Container>
            )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        width: 300
    }
})

export default BookmarkedEventTab;