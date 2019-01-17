import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import EventList from './EventList';
import PropTypes from 'prop-types';

class UpcomingTab extends Component {
  render() {
    const screenProps = {
      facebookLogin: this.props.screenProps.facebookLogin,
      googleLogin: this.props.screenProps.googleLogin,
      isLoggedIn: this.props.screenProps.isLoggedIn,
      logOut: this.props.screenProps.logOut,
      user: this.props.screenProps.user,
      updateBookmark: this.props.screenProps.updateBookmark,
      eventList: this.props.screenProps.eventList
    }

    return (
      <Container>
        <Content>
          <EventList screenProps={screenProps}/>
        </Content>
      </Container>
    );
  }
}

UpcomingTab.propTypes = {
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

export default UpcomingTab;