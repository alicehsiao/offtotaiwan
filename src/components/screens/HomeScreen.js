/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { Container, Header } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import NavigationService from '../../NavigationService';
import { Icon } from 'react-native-elements';

class HomeScreen extends Component {
    static navigationOptions = {
        title: 'Home',
        headerStyle: {
            backgroundColor: '#ac0d42',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
        headerRight: (
            <Icon
                onPress={()=>NavigationService.navigate('Settings')}
                name='ios-settings'
                type='ionicon'
                color='#fff'
                containerStyle={{paddingRight: 15}}
            />
        )
    };

    render() {
        return (
            <Container>
                <Grid>
                    <Row style={{ height: 175, marginTop: 10}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableHighlight onPress = {()=>alert("Photo Pressed")}>
                                <View style={{height: 175, width: 219}}>
                                    <Image
                                        style= {{flex:1 , width: undefined, height: undefined, borderRadius: 15}}
                                        source={{uri: 'explore'}} 
                                    />
                                </View>
                            </TouchableHighlight>
                        </View>
                    </Row>
                    <Row style={{ height: 175 }}>
                        <Col>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableHighlight onPress = {()=>alert("Photo Pressed")}>
                                    <View style={{height: 140, width: 140}}>
                                        <Image
                                        style= {{flex:1 , width: undefined, height: undefined, borderRadius: 15}}
                                        source={{uri: 'bike'}} 
                                        />
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </Col>
                        <Col>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <TouchableHighlight onPress = {()=>alert("Photo Pressed")}>
                                    <View style={{height: 140, width: 140}}>
                                        <Image
                                        style= {{flex:1 , width: undefined, height: undefined, borderRadius: 15}}
                                        source={{uri: 'hike'}} 
                                        />
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </Col>
                    </Row>
                    <Row style={{ height: 175, marginBottom: 5}}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableHighlight onPress = {()=>NavigationService.navigate('FoodJoints')}>
                                <View style={{height: 175, width: 219}}>
                                    <Image
                                        style= {{flex:1 , width: undefined, height: undefined, borderRadius: 15}}
                                        source={{uri: 'eat'}} 
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


export { HomeScreen };
