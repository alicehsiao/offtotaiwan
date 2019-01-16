/* eslint-disable react/prop-types */
import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
// import { Icon } from 'react-native-elements';
import { Card, CardItem, Text, Body, Thumbnail, Left } from 'native-base';
import NavigationService from '../../../NavigationService';

class AttractionCard extends React.Component {
    render(){
        const { name, address, engName } = this.props.place;
        return (
            <TouchableOpacity delayPressIn={50} onPress={() => NavigationService.navigate('AttractionDetails', {...this.props.place})}>
                <Card>
                    <CardItem>
                        <Left>
                            <Thumbnail source={{uri: 'explore'}}/>
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
})

export default AttractionCard;


{/* <Icon
    name='ios-heart-empty'
    type='ionicon'
    color='#517fa4'
    onPress={()=>alert('Hearted')}
/> */}