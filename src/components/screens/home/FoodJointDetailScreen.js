import React from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { RkCard } from 'react-native-ui-kitten';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
import Config from 'react-native-config';
import Ionicons from 'react-native-vector-icons/Ionicons';


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

    state = {
        engAddress: '',
        marker: {
            title: '',
            description: '',
            coordinates: {
                latitude: 0,
                longitude: 0
            }
        },
        internationalPhone: '',
        hours: [],
        rating: 0,
        isReady: false,
        heart: false,
        isLoggedIn: false
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const placeId = navigation.getParam('place_id', 'no place id');
        const engName = navigation.getParam('engName', 'no name');
        const heart = this.props.navigation.getParam('heart', 'no heart');
        const isLoggedIn = this.props.navigation.getParam('isLoggedIn', 'no isLoggedIn function');

        const URL = `https://maps.googleapis.com/maps/api/place/details/json?key=${Config.GOOGLE_API_KEY}&placeid=${placeId}`
        const res = encodeURI(URL);

        await axios.get(res)
            .then(response => {
                let hours = [];
                let rating = 0;
                if(response.data.result.opening_hours && response.data.result.opening_hours.weekday_text){
                    hours = response.data.result.opening_hours.weekday_text;
                }
                if(response.data.result.rating){
                    rating = response.data.result.rating;
                }
                this.setState({
                    engAddress: response.data.result.formatted_address,
                    marker: {
                        title: `${engName}`,
                        description: response.data.result.name,
                        coordinates: {
                            latitude: response.data.result.geometry.location.lat,
                            longitude: response.data.result.geometry.location.lng
                        }
                    },
                    hours,
                    rating,
                    internationalPhone: response.data.result.international_phone_number,
                    isReady: true,
                    heart,
                    isLoggedIn
                })
            })
            .catch(err => console.log(err))
    }

    render(){
        const { navigation } = this.props;
        const engName = navigation.getParam('engName', 'no name');
        const name = navigation.getParam('name', 'no name');
        const id = navigation.getParam('_id', 'no id');
        const updateHeart = navigation.getParam('updateHeart', 'no callback');
        
        return (
                <ScrollView>
                    { this.state.isReady ? 
                        <RkCard rkType='article'>
                            <MapView
                                provider={PROVIDER_GOOGLE}
                                style={styles.mapContainer}
                                showsUserLocation={true}
                                region={{
                                    latitude: this.state.marker.coordinates.latitude,
                                    longitude: this.state.marker.coordinates.longitude,
                                    latitudeDelta: 0.05,
                                    longitudeDelta: 0.05,
                                }}>
                                <MapView.Marker 
                                    key={this.state.marker.title} 
                                    coordinate={this.state.marker.coordinates} 
                                    title={this.state.marker.title}
                                    description={this.state.marker.description}>
                                    <MapView.Callout style={styles.mapCalloutStyle}>
                                        <View>
                                            <Text>
                                                <Text style={styles.mapCallOutTextStyle}>{this.state.marker.description}</Text>
                                                {"\n"}{this.state.marker.title}
                                            </Text>
                                        </View>
                                    </MapView.Callout>
                                </MapView.Marker>
                            </MapView>
                            <View rkCardHeader>
                                <View>
                                    <Text style={styles.boldText}>
                                        {engName}   
                                    </Text>
                                    <Text>{name}</Text>
                                </View>
                                <View>
                                    { this.state.isLoggedIn ? 
                                    <Ionicons 
                                        name={this.state.heart ? 'ios-heart' : 'ios-heart-empty'}
                                        color="#ac0d42"
                                        size={32} 
                                        style={styles.iconStyle}
                                        onPress={() => {
                                                updateHeart(id);
                                                this.setState({
                                                    heart: !this.state.heart
                                                })
                                        }}/> :
                                    <Ionicons 
                                        name="ios-heart-empty" 
                                        color="#ac0d42"
                                        size={32} 
                                        style={styles.iconStyle}
                                        onPress={() => alert('Please login to heart this event.')}/>
                                    }
                                </View>
                            </View>
                            <View rkCardContent>
                                <View>
                                    <Text>
                                        <Text style={styles.boldText}>Phone:</Text>{this.state.internationalPhone}
                                        {"\n"}
                                        <Text style={styles.boldText}>Rating: </Text>{this.state.rating !== 0 ? this.state.rating.toString() : "No rating yet"}
                                        {"\n"}
                                        <Text style={styles.boldText}>Hours:</Text>{"\n"}
                                        {this.state.hours.length ===0 ? "No hours provided" : this.state.hours.join("\n")}
                                    </Text>
                                </View>
                            </View>
                            <View rkCardFooter>
                                <View>
                                    <Text>
                                        <Text style={styles.boldText}>Address:</Text> {this.state.engAddress}
                                    </Text>
                                </View>
                            </View>
                        </RkCard>
                        :
                        <View style = {styles.container}>
                            <ActivityIndicator
                                color = '#ac0d42'
                                size = "large"
                                style = {styles.activityIndicator}/>
                        </View>
                    }  
                </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mapContainer: {
        height: (Dimensions.get('window').width) * (9 / 16),
        width: Dimensions.get('window').width
    },
    mapCalloutStyle: {
        borderRadius: 10
    },
    mapCallOutTextStyle: {
        fontWeight: 'bold'
    },
    boldText: {
        fontWeight: 'bold',
        fontSize: 16
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    },
    iconStyle: {
        position: 'absolute',
        right: 10,
        top: 0
    }
});

export { FoodJointDetailScreen };