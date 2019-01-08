/* eslint-disable no-console */
import React, { Component } from 'react';
import { Button, View } from 'react-native';
import FoodJointList from './FoodJointList';

// Home Screen 
// navigation prop is passed in to every screen component in stack navigator
class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Food Joints',
            headerLeft: (
                <Button 
                    onPress={() => navigation.navigate('MyModal')}
                    title="Info"
                    color="#fff"
                />
            )
        }
    }

    render() {
        const { homeStyle } = styles;
        return (
            <View style={homeStyle}>
                <FoodJointList navigation={this.props.navigation}/>
                < Button
                title = "Map"
                onPress = {
                    () => {
                        this.props.navigation.navigate('Maps');
                    }
                }
                />
            </View>
        );
    }
}

const styles = {
    homeStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
};

export default HomeScreen;