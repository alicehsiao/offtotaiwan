import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class HeartScreen extends Component {
    static navigationOptions = {
        title: "Favorites",
    };

    render(){
        return(
            <View style={styles.container}>
                <Text>Heart Screen</Text>
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

export { HeartScreen };