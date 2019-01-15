import React, { Component } from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SearchBar } from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import axios from 'axios';
import SearchItemCard from './SearchItemCard';

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
            latitude: 0,
            longitude: 0,
            isReady: false,
            results: []
        }
    }

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (error) => console.log(error.message)
        );
    }

    searchResults = async () => {
        // let URL = `http://192.168.0.11:7777/api/v1/search?name=${this.state.query}`;
        let URL = `http://172.24.25.128:7777/api/v1/search?name=${this.state.query}`;
        console.log(this.state.query);

        await axios.get(URL)
            .then(response => {
                this.setState({
                    results: response.data,
                    isReady: true
                });
            })
            .catch(err => console.log(err))
        console.log(this.state.results);
    }

    renderResults() {
       return this.state.results.map(item => 
            <SearchItemCard key={item.name} place={item}/>
       );
    }

    handleQueryChange = (query) => {
        this.setState({
            query
        }, () => this.searchResults(this.state.query))
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
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.10,
                        longitudeDelta: 0.10,
                    }}>
                    <MapView.Marker
                        coordinate = {{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude
                        }}
                        title = "Your Current Position"
                    />
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
    }
});

export { SearchScreen };

