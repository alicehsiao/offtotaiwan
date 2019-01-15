/* eslint-disable react/prop-types */
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
// import { Icon } from 'react-native-elements';
import { Card, CardItem, Text, Body, Thumbnail, Left } from 'native-base';
import NavigationService from '../../../NavigationService';

class FoodJointCard extends React.Component {
    static navigationOptions = {
        title: 'Place Details',
        headerStyle: {
            backgroundColor: '#ac0d42',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    render(){
        const { name, address, engName } = this.props.place;
        return (
            <TouchableOpacity delayPressIn={50} onPress={() => NavigationService.navigate('FoodJointDetails', {...this.props.place})}>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: 'eat'}}/>
                            <Body style={styles.bodyContainer}>
                                <Text>{name}</Text>
                                <Text note>{engName}</Text>
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
})

export default FoodJointCard;


{/* <Icon
    name='ios-heart-empty'
    type='ionicon'
    color='#517fa4'
    onPress={()=>alert('Hearted')}
/> */}