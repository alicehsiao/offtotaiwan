import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import EventList from './events/EventList';

class UpcomingScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <EventList />
        </Content>
      </Container>
    );
  }
}

export default UpcomingScreen;