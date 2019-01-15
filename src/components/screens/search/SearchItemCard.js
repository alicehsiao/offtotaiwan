/* eslint-disable react/prop-types */
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
// import { Icon } from 'react-native-elements';
import { Card, CardItem, Text, Body, Thumbnail, Left } from 'native-base';
import NavigationService from '../../../NavigationService';

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
        // Send cards to the correct pages once those are built, currently all going to FoodJointDetails
        return (
            <TouchableOpacity delayPressIn={50} onPress={() => NavigationService.navigate('FoodJointDetails', {...this.props.place})}>
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

export default SearchItemCard;