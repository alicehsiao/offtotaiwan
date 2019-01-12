import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#f4511e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    render(){
        return(
            <View style={styles.container}>
                <Text>Home Screen</Text>
                <Button
                title = "Go to Food Joints"
                onPress = {
                    () => this.props.navigation.navigate('FoodJoints')
                }
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export { HomeScreen };