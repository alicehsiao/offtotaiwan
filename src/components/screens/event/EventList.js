/* eslint-disable react/prop-types */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Container, Content } from 'native-base';
import EventCard from './EventCard';
import axios from 'axios';
import { db } from '../../../../config/firebase';
class EventList extends Component {
    state = {
        events: [],
        isReady: false
    }
    
   async componentDidMount() {
        const URL = 'http://192.168.0.11:7777/api/v1/activities';
        // const URL = 'http://172.24.25.128:7777/api/v1/activities';
        await axios.get(URL)
            .then((response) => {

                this.setState({
                    events: response.data,
                    isReady: true
                });
            })
            .catch(err => console.log(err))
        
            let events = [...this.state.events];
            events.forEach((event) => {
                event.bookmark = false;
            })
            this.setState({
                events
            }, () => this.props.screenProps.loadEvents(this.state.events));

    }

    renderEvents() {
       return this.state.events.map(event => 
            <EventCard key={event.name} event={event} updateBookmark={this.props.screenProps.updateBookmark}/>
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
