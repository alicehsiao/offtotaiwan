import React, { Component } from 'react';
import { Container, Content } from 'native-base';
import EventList from './EventList';

class UpcomingTab extends Component {
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

export default UpcomingTab;