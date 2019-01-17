/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import EventList from './EventList';

class UpcomingTab extends Component {
  render() {
    const screenProps = {
      facebookLogin: this.props.screenProps.facebookLogin,
      googleLogin: this.props.screenProps.googleLogin,
      isLoggedIn: this.props.screenProps.isLoggedIn,
      logOut: this.props.screenProps.logOut,
      user: this.props.screenProps.user,
      loadEvents: this.props.screenProps.loadEvents,
      updateBookmark: this.props.screenProps.updateBookmark
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

export default UpcomingTab;