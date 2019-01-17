import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, SocialIcon } from 'react-native-elements';
import { Container, Content } from 'native-base';
import EventCard from './EventCard';
import PropTypes from 'prop-types';

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
                            <View style={styles.loginContainer}>
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
                            </View>
                        }
                    </Content>
                </Container>
            )
    }
}

const styles = StyleSheet.create({
    cardContainer: {
        width: 300
    },
    loginContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

BookmarkedEventTab.propTypes = {
  screenProps: PropTypes.shape({
    facebookLogin: PropTypes.func.isRequired,
    googleLogin: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    updateBookmark: PropTypes.func.isRequired,
    bookmarkedEvents: PropTypes.array
  })
}


export default BookmarkedEventTab;