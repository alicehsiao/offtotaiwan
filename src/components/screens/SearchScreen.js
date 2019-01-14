import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
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
            longitude: 0
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

    handleQueryChange = query => {
        this.setState({
            query,
        }, () => {
            console.log(this.state.query);
        });
    }
        

    handleSearchCancel = () => this.handleQueryChange("");
    handleSearchClear = () => this.handleQueryChange(""); // maybe differentiate between cancel and clear

    render(){
        return(
            // Use onChangeText -> save to state, then on enter => callback
            <View>
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
                    style={styles.container}
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
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '50%',
        width: '100%'
    }
});

export { SearchScreen };