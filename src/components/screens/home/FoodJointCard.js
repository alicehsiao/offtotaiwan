import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Card, CardItem, Text, Body, Thumbnail, Left } from 'native-base';
import NavigationService from '../../../NavigationService';
import PropTypes from 'prop-types';


class FoodJointCard extends React.Component {
    render(){
        const { name, address, engName } = this.props.place;
        return (
            <TouchableOpacity delayPressIn={50} onPress={() => NavigationService.navigate('FoodJointDetails', {...this.props.place, updateHeart: this.props.updateHeart, isLoggedIn: this.props.isLoggedIn})}>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: 'eat'}}/>
                            <Body style={styles.bodyContainer}>
                                <Text>{engName}</Text>
                                <Text note>{name}</Text>
                                <Text note>Address: {address}</Text>
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

FoodJointCard.propTypes = {
    place: PropTypes.shape({
        name: PropTypes.string,
        engName: PropTypes.string,
        address: PropTypes.string
    }),
    isLoggedIn: PropTypes.bool.isRequired,
    updateHeart: PropTypes.func.isRequired
}

export default FoodJointCard;
