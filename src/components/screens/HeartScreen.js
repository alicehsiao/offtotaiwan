import React, { Component } from 'react';
import { View, Text, StyleSheet, Button  } from 'react-native';
import NavigationService from '../../NavigationService';

class HeartScreen extends Component {
    static navigationOptions = {
        title: 'Favorites',
        headerStyle: {
            backgroundColor: '#ac0d42',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    render(){
        return(
            <View style={styles.container}>
                <Text>Heart Screen</Text>
                <Button
                    title = "Go Home"
                    onPress = {
                        () => NavigationService.navigate('Home')
                }/>
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