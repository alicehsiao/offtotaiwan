import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class SettingsScreen extends Component {
    static navigationOptions = {
        title: "Settings",
    };

    render(){
        return(
            <View style={styles.container}>
                <Text>Settings Screen</Text>
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

export { SettingsScreen };