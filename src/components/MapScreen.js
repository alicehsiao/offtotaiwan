import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
                                
export default class MapScreen extends Component {
  render() {                
    return (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.container}
          region={{
            latitude: 23.6978,
            longitude: 120.9605,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        />
    );
  }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%'
    }
});