/* eslint-disable react/prop-types */
import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';
import { RkCard } from 'react-native-ui-kitten';
// import axios from 'axios';
// import { GOOGLE_API_KEY } from 'react-native-dotenv';

class FoodJointDetailScreen extends React.Component {
    static navigationOptions = {
        title: 'Food Joint Details',
        headerStyle: {
            backgroundColor: '#ac0d42',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    componentDidMount() {
        // const URL = `https://maps.googleapis.com/maps/api/place/details/json?key=${GOOGLE_API_KEY}&placeid=${this.props.place.place_id}`
        // axios.get(URL)
        //     .then(response => {
        //         this.setState({
        //             engAddress: response.data.result.formatted_address,
        //             coordinates: [response.data.result.geometry.location.lat, response.data.result.geometry.location.lng],
        //         })
        //     })
        //     .catch(err => console.log(err))
    }

    render(){
        const { navigation } = this.props;
        const engName = navigation.getParam('engName', 'no name');
        const address = navigation.getParam('address', 'no address');
        const phone = navigation.getParam('phone', 'no phone');
        return (
            <ScrollView>
                <RkCard rkType='article'>
                    <Image rkCardImg source={{uri: 'fortune'}} />
                    <View rkCardHeader>
                        <View>
                            <Text style={styles.engNameStyle}>
                                {engName}   
                            </Text>
                        </View>
                    </View>
                    <View rkCardContent>
                        <View>
                            <Text>
                                {address}
                            </Text>
                        </View>
                    </View>
                    <View rkCardFooter>
                        <View>
                            <Text>
                                <Text>
                                    {phone}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </RkCard>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    engNameStyle: {
        fontWeight: 'bold',
        fontSize: 16
    }
})

export { FoodJointDetailScreen};