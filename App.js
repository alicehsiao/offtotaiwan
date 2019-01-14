/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// React Native Elements: ToolTip, Social Icons, Search, Header, Card
import React, { Component } from 'react';
import { View, Image, TouchableHighlight } from 'react-native';
import SplashScreen from "react-native-splash-screen";
import { Container, Header } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }

  render() {
    return (
      <Container>
        <Header />
          <Grid>
            <Row style={{ backgroundColor: 'green', height: 160, margin: 5}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableHighlight onPress = {()=>alert("Photo Pressed")}>
                  <View style={{height: 160, width: 200}}>
                      <Image
                        style= {{flex:1 , width: undefined, height: undefined, borderRadius: 20}}
                        source={{uri: 'explore'}} 
                      />
                  </View>
                </TouchableHighlight>
              </View>
            </Row>
            <Row style={{ backgroundColor: 'pink', height: 160, margin: 5}}>
              <Col style={{ height: 160}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableHighlight onPress = {()=>alert("Photo Pressed")}>
                    <View style={{height: 150, width: 150}}>
                        <Image
                          style= {{flex:1 , width: undefined, height: undefined, borderRadius: 20}}
                          source={{uri: 'explore'}} 
                        />
                    </View>
                  </TouchableHighlight>
                </View>
              </Col>
              <Col style={{ height: 160}}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableHighlight onPress = {()=>alert("Photo Pressed")}>
                    <View style={{height: 150, width: 150}}>
                        <Image
                          style= {{flex:1 , width: undefined, height: undefined, borderRadius: 20}}
                          source={{uri: 'explore'}} 
                        />
                    </View>
                  </TouchableHighlight>
                </View>
              </Col>
            </Row>
            <Row style={{ backgroundColor: 'yellow', height: 160, margin: 5}}>
              <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableHighlight onPress = {()=>alert("Photo Pressed")}>
                  <View style={{height: 160, width: 200}}>
                      <Image
                        style= {{flex:1 , width: undefined, height: undefined, borderRadius: 20}}
                        source={{uri: 'explore'}} 
                      />
                  </View>
                </TouchableHighlight>
              </View>
            </Row>
          </Grid>
      </Container>
    );
  }
}
