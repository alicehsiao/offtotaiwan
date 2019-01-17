import React from 'react';
import { View, ScrollView, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { RkCard } from 'react-native-ui-kitten';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
import Config from 'react-native-config';

class BikeDetailScreen extends React.Component {
    static navigationOptions = {
        title: 'Bike Path Details',
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
        isReady: false
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const placeId = navigation.getParam('place_id', 'no place id');
        const engName = navigation.getParam('engName', 'no name');

        const URL = `https://maps.googleapis.com/maps/api/place/details/json?key=${Config.GOOGLE_API_KEY}&placeid=${placeId}`
        const res = encodeURI(URL);
        console.log(res);

        await axios.get(res)
            .then(response => {
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
                    isReady: true
                })
            })
            .catch(err => console.log(err))
    }

    render(){
        const { navigation } = this.props;
        const engName = navigation.getParam('engName', 'no name');
        const name = navigation.getParam('name', 'no name');
        const distance = navigation.getParam('distanceKM', 'no distance');
        
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
                            </View>
                            <View rkCardContent>
                                <View>
                                    <Text>
                                        <Text style={styles.boldText}>Address:</Text> {this.state.engAddress}{"\n"}
                                        <Text style={styles.boldText}>Distance:</Text> {distance.toString()}km
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
    }
});

export { BikeDetailScreen };