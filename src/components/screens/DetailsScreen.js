import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class DetailsScreen extends Component {
    static navigationOptions = {
        title: "Home",
    };

    render(){
        return(
            <View style={styles.container}>
                <Text>Details</Text>
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

export default DetailsScreen;