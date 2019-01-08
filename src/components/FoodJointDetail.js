/* eslint-disable react/prop-types */
import React from 'react';
import { Text, View, Button} from 'react-native';
import { CardSection, Card } from './common';
import axios from 'axios';
import { GOOGLE_API_KEY } from 'react-native-dotenv';

class FoodJointDetail extends React.Component {
    state = {
        engAddress: '',
        coordinate: [],
    }

    componentDidMount() {
        const URL = `https://maps.googleapis.com/maps/api/place/details/json?key=${GOOGLE_API_KEY}&placeid=${this.props.place.place_id}`
        axios.get(URL)
            .then(response => {
                this.setState({
                    engAddress: response.data.result.formatted_address,
                    coordinates: [response.data.result.geometry.location.lat, response.data.result.geometry.location.lng],
                })
            })
            .catch(err => console.log(err))
    }

    render(){
        const { name, region, phone, address } = this.props.place;
        const { headerContentStyle, headerTextStyle, textDetailsStyle } = styles;
        return (
            <Card>
                <CardSection>
                    <View style={headerContentStyle}>
                        <Text style={headerTextStyle}>{name}</Text>
                        <Text>Address: {address}</Text>
                    </View>
                </CardSection>
                <CardSection>
                    <View style={textDetailsStyle}>
                        <Text>Region: {region}</Text>
                        <Text>Phone: {phone}</Text>
                    </View>
                </CardSection>
                <CardSection>
                    < Button
                    title = "Go to Details"
                    onPress = {
                        () => {
                            this.props.navigation.navigate('Details', {
                                itemId: 86,
                                otherParam: 'anything you want here',
                                coordinates: this.state.coordinates,
                                engAddress: this.state.engAddress
                            });
                        }
                    }
                    />
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    headerContentStyle: {
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    headerTextStyle: {
        fontSize: 18
    },
    textDetailsStyle: {
        flexDirection: 'column'
    }
}

export default FoodJointDetail;