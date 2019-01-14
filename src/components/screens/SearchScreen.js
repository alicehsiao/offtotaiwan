import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import {SearchBar} from 'react-native-elements';

class SearchScreen extends Component {
    static navigationOptions = {
        title: 'Search',
        headerStyle: {
            backgroundColor: '#ac0d42',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props){
        super(props);

        this.state = {
            query: ""
        }
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
            <SearchBar
                platform = "ios"
                cancelButtonTitle = "Cancel"
                onChangeText = {this.handleQueryChange}
                onCancel={this.handleSearchCancel}
                onClear={this.handleSearchClear}
                value={this.state.query}
            />
        )
    }
}

export { SearchScreen };