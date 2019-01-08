import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';

class ModalScreen extends Component {
  render() {
    const { homeStyle, textStyle } = styles;

    return (
      <View style={homeStyle}>
        <Text style={textStyle}>This is a modal!</Text>
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Dismiss"
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
    },
    textStyle: {
        fontSize: 30
    }
};

export default ModalScreen;