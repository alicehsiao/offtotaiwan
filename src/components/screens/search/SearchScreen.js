import React, { Component } from 'react';
import { StyleSheet, ScrollView, Dimensions, View, Text } from 'react-native';
import { SearchBar } from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
import SearchItemCard from './SearchItemCard';
import Config from 'react-native-config';
import PropTypes from 'prop-types';


class SearchScreen extends Component {
    static navigationOptions = {
        title: 'Search',
        headerStyle: {
            backgroundColor: '#ac0d42',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };


    constructor(props){
        super(props);

        this.state = {
            query: "",
            isReady: false,
            results: [],
            markers: []
        }
    }

    searchResults = async () => {
        let URL = `https://www.offtotaiwan.com/api/v1/search?name=${this.state.query}`;

        await axios.get(URL)
            .then(response => {
                this.setState({
                    results: response.data,
                    isReady: true
                });
            })
            .catch(err => console.log(err))
        

        if(this.state.results.length !== 0){
            let markers = [];

            for (const result of this.state.results) {
               const url = `https://maps.googleapis.com/maps/api/place/details/json?key=${Config.GOOGLE_API_KEY}&placeid=${result.place_id}`;
               const res = encodeURI(url);

               await axios.get(res)
                   .then(response => {
                        // Save location
                        const lat = response.data.result.geometry.location.lat;
                        const lng = response.data.result.geometry.location.lng;
                        
                        let marker = {
                            title: `${result.engName}`,
                            description: `${result.name}`,
                            coordinates: {
                                latitude: lat,
                                longitude: lng
                            }
                        }

                        markers.push(marker);
                    })
                    .catch(error => console.log(error));
            }

            this.setState({
                markers
            })
        }
    }

    renderResults() {
        return this.state.results.map(item => 
                <SearchItemCard 
                    key={item.name} 
                    place={item}
                    updateHeart={this.props.screenProps.updateHeart} 
                    isLoggedIn={this.props.screenProps.isLoggedIn}/>
        );
    }

    showMarkers() {
        return this.state.markers.map(marker => (
            <MapView.Marker 
                key={marker.title} 
                coordinate={marker.coordinates} 
                title={marker.title}
                description={marker.description}>
                <MapView.Callout style={styles.mapCalloutStyle}>
                    <View>
                        <Text>
                            <Text style={styles.mapCallOutTextStyle}>{marker.description}</Text>
                            {"\n"}{marker.title}
                        </Text>
                    </View>
                </MapView.Callout>
            </MapView.Marker>
        ))
    }

    handleQueryChange = (query) => {
        if(query === ""){
            this.setState({
                query,
                markers: [],
                isReady: false,
                results: []
            })
        } else {
            this.setState({
                query,
            }, () => this.searchResults(this.state.query))
        }
    }
        
    handleSearchCancel = () => this.handleQueryChange("");
    handleSearchClear = () => this.handleQueryChange("");

    render(){
        return(
            // Use onChangeText -> save to state, then on enter => callback
            <ScrollView keyboardDismissMode = 'on-drag'>
                <SearchBar
                    platform = "ios"
                    cancelButtonTitle = "Cancel"
                    onChangeText = {this.handleQueryChange}
                    onCancel={this.handleSearchCancel}
                    onClear={this.handleSearchClear}
                    value={this.state.query}
                />
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.mapContainer}
                    showsUserLocation={true}
                    region={{
                        latitude: 24.1477,
                        longitude: 120.6736,
                        latitudeDelta: 0.30,
                        longitudeDelta: 0.30,
                    }}>
                    { this.state.markers !== 0 && this.showMarkers() }
                </MapView>
                {
                    this.state.isReady && 
                    this.renderResults()
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    mapContainer: {
        height: (Dimensions.get('window').width) * (9/16),
        width: Dimensions.get('window').width
    },
    mapCalloutStyle: {
        borderRadius: 10
    },
    mapCallOutTextStyle: {
        fontWeight: 'bold'
    }
});

SearchScreen.propTypes = {
    screenProps: PropTypes.shape({
        isLoggedIn: PropTypes.bool.isRequired,
        updateHeart: PropTypes.func.isRequired
    })
}

export { SearchScreen };

