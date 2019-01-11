import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class SearchScreen extends Component {
    static navigationOptions = {
        title: "Search",
    };

    render(){
        return(
            <View style={styles.container}>
                <Text>Search Screen</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export { SearchScreen };