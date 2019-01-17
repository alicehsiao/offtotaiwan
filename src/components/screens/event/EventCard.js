import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Card, CardItem, Text, Body, Thumbnail, Left } from 'native-base';
import moment from 'moment';
import NavigationService from '../../../NavigationService';
import PropTypes from 'prop-types';

class EventCard extends Component {
  render() {
    const { name, engName, start, end } = this.props.event;

    const startDate = moment(start.toString()).format('L');
    const endDate = moment(end.toString()).format('L');
    
    return (
        <TouchableOpacity onPress={() => NavigationService.navigate('Event', {...this.props.event, updateBookmark: this.props.updateBookmark, isLoggedIn: this.props.isLoggedIn})} >
            <Card>
                <CardItem>
                    <Left>
                        <Thumbnail source={{uri: 'dome'}}/>
                        <Body style={styles.bodyContainer}>
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

const styles = StyleSheet.create({
    bodyContainer:{
        flexDirection: 'column'
    }
});

EventCard.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    updateBookmark: PropTypes.func.isRequired,
    event: PropTypes.shape({
        name: PropTypes.string,
        engName: PropTypes.string,
        start: PropTypes.date,
        end: PropTypes.date
    })
}


export default EventCard;
