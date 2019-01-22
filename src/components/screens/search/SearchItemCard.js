import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Card, CardItem, Text, Body, Thumbnail, Left } from 'native-base';
import NavigationService from '../../../NavigationService';
import PropTypes from 'prop-types';

class SearchItemCard extends React.Component {
    static navigationOptions = {
        title: `Search Item`,
        headerStyle: {
            backgroundColor: '#ac0d42',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    render(){
        const { name, engName, category } = this.props.place;

        let card = '';
        switch(category){
            case "eat":
                card = 'FoodJointDetails';
                break;
            case "explore":
                card = 'AttractionDetails';
                break;
            case "bike":
                card = 'BikeDetails';
                break;
            case "hike":
                card = 'HikeDetails';
                break;
        }
        return (
            <TouchableOpacity delayPressIn={50} onPress={() => NavigationService.navigate(card, {...this.props.place, updateHeart: this.props.updateHeart, isLoggedIn: this.props.isLoggedIn})}>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: category.toString()}}/>
                            <Body style={styles.bodyContainer}>
                                <Text>{name}</Text>
                                <Text note>{engName}</Text>
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
})

SearchItemCard.propTypes = {
    place: PropTypes.shape({
        name: PropTypes.string,
        engName: PropTypes.string,
        category: PropTypes.string
    }),
    isLoggedIn: PropTypes.bool.isRequired,
    updateHeart: PropTypes.func.isRequired
}

export default SearchItemCard;