/* eslint-disable react/prop-types */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import EventCard from './EventCard';
import { db } from '../../../../config/firebase';
class EventList extends Component {
    state = {
        eventList: [],
        isReady: false
    }
    
    componentDidMount() {
        this.setState({
            eventList: this.props.screenProps.eventList,
            isReady: true
        })
    }

    renderEvents() {
       return this.state.eventList.map(event => 
            <EventCard 
                key={event.name} 
                event={event} 
                updateBookmark={this.props.screenProps.updateBookmark} 
                isLoggedIn={this.props.screenProps.isLoggedIn}/>
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


  findUserInDatabase = async (name, email, provider) => {
      await db.ref().child("users").orderByChild("email").equalTo(email).once("value", async (snapshot) => {
          if (snapshot.exists()) {
              // User exists in DB
              snapshot.forEach(childSnapshot => {
                  var data = childSnapshot.val();
                  this.setState({
                      user: {
                          name: data.name,
                          email: data.email,
                          hearts: data.hearts || []
                      },
                      isLoggedIn: true,
                      provider,
                  })
              })
          } else {
              // Create New User
              await db.ref('users').push({
                  name,
                  email,
                  provider,
              }).then(() => {
                  this.setState({
                      user: {
                          name,
                          email,
                          provider,
                      },
                      isLoggedIn: true
                  })
              })
          }
      });
  }
