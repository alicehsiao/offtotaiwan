import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Card, CardItem, Text, Body, Thumbnail, Left } from 'native-base';
import NavigationService from '../../../NavigationService';
import PropTypes from 'prop-types';


class HikeCard extends React.Component {
    render(){
        const { name, distanceKM, engName } = this.props.place;
        return (
            <TouchableOpacity delayPressIn={50} onPress={() => NavigationService.navigate('HikeDetails', {...this.props.place, updateHeart: this.props.updateHeart, isLoggedIn: this.props.isLoggedIn})}>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: 'hike'}}/>
                            <Body style={styles.bodyContainer}>
                                <Text>{engName}</Text>
                                <Text note>{name}</Text>
                                <Text note>Distance: {distanceKM}km</Text>
                            </Body>
                        </Left>
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    bodyContainer: {
        flexDirection: 'column'
    }
});

HikeCard.propTypes = {
    place: PropTypes.shape({
        name: PropTypes.string,
        distanceKM: PropTypes.number,
        engName: PropTypes.string
    }),
    isLoggedIn: PropTypes.bool.isRequired,
    updateHeart: PropTypes.func.isRequired
}

export default HikeCard;