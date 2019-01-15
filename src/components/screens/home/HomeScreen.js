/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, Image, TouchableHighlight, StyleSheet, TouchableOpacity } from 'react-native';
import { Container } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import NavigationService from '../../../NavigationService';
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
                    <Row style={styles.topRowStyle}>
                        <View style={styles.containerStyle}>
                            <TouchableHighlight onPress = {()=>alert("Photo Pressed")}>
                                <View style={styles.largeImageViewStyle}>
                                    <Image
                                        style= {styles.imageStyle}
                                        source={{uri: 'explore'}} 
                                    />
                                </View>
                            </TouchableHighlight>
                        </View>
                    </Row>
                    <Row style={styles.midRowStyle}>
                        <Col>
                            <View style={styles.containerStyle}>
                                <TouchableHighlight onPress = {()=>alert("Photo Pressed")}>
                                    <View style={styles.smallImageViewStyle}>
                                        <Image
                                        style= {styles.imageStyle}
                                        source={{uri: 'bike'}} 
                                        />
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </Col>
                        <Col>
                            <View style={styles.containerStyle}>
                                <TouchableHighlight onPress = {()=>alert("Photo Pressed")}>
                                    <View style={styles.smallImageViewStyle}>
                                        <Image
                                        style= {styles.imageStyle}
                                        source={{uri: 'hike'}} 
                                        />
                                    </View>
                                </TouchableHighlight>
                            </View>
                        </Col>
                    </Row>
                    <Row style={styles.lastRowStyle}>
                        <View style={styles.containerStyle}>
                            <TouchableOpacity onPress = {()=>NavigationService.navigate('FoodJoints')}>
                                <View style={styles.largeImageViewStyle}>
                                    <Image
                                        style= {styles.imageStyle}
                                        source={{uri: 'eat'}} 
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </Row>
                </Grid>
            </Container>
        );
    } 
}

const styles = StyleSheet.create({
    topRowStyle: {
        height: 175, 
        marginTop: 10
    },
    midRowStyle: {
        height: 175
    },
    lastRowStyle:{
       height: 175, 
       marginBottom: 5
    },
    containerStyle: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    imageStyle: {
        flex: 1, 
        width: undefined, 
        height: undefined, 
        borderRadius: 15
    },
    largeImageViewStyle: {
        height: 175, 
        width: 219
    },
    smallImageViewStyle: {
        height: 140, 
        width: 140
    }
})

export { HomeScreen };
