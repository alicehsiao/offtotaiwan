/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Card, CardItem, Text, Body, Thumbnail, Left } from 'native-base';
import moment from 'moment';
import NavigationService from '../../../NavigationService';
import { Button, Icon } from 'react-native-elements';

class EventCard extends Component {
  render() {
    const { name, engName, start, end } = this.props.event;

    const startDate = moment(start.toString()).format('L');
    const endDate = moment(end.toString()).format('L');
    return (
        <TouchableOpacity onPress={() => NavigationService.navigate('Event', {...this.props.event})} >
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'event'}}/>
                        <Body style={{flexDirection:'column'}}>
                            <Text>{name}</Text>
                            <Text note>{engName}</Text>
                            <Text note>Dates: {startDate} - {endDate}</Text>
                        </Body>
                    </Left>
                </CardItem>
            </Card>
        </TouchableOpacity>
    );
  }
}

export default EventCard;
