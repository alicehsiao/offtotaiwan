import React, { Component } from 'react';
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import { RkCard } from 'react-native-ui-kitten';
import Ionicons from 'react-native-vector-icons/Ionicons';

class EventDetailScreen extends Component {
    static navigationOptions = {
        title: 'Event Details',
        headerStyle: {
            backgroundColor: '#ac0d42',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }
    };

    state = {
        bookmark: false,
        isLoggedIn: false
    }
    
    componentDidMount() {
        const bookmark = this.props.navigation.getParam('bookmark', 'no bookmark');
        const isLoggedIn = this.props.navigation.getParam('isLoggedIn', 'no isLoggedIn function');
        this.setState({
            bookmark,
            isLoggedIn
        })
    }

    render(){
        const { navigation } = this.props;
        const start = navigation.getParam('start', 'no start time');
        const end = navigation.getParam('end', 'no end time');
        const engName = navigation.getParam('engName', 'no english name');
        const description = navigation.getParam('engDescription', 'no description');
        const id = navigation.getParam('_id', 'no id'); 
        const updateBookmark = navigation.getParam('updateBookmark', 'no callback');

        const startDate = moment(start.toString()).format('L');
        const endDate = moment(end.toString()).format('L');

        return(
            <ScrollView>
                <RkCard rkType='article'>
                    <Image rkCardImg source={{uri: 'cks'}} />
                    <View>
                        { this.state.isLoggedIn ? 
                        <Ionicons 
                            name="ios-bookmark" 
                            color={this.state.bookmark ? "#ac0d42" : "#fff"}
                            size={36} 
                            style={styles.iconStyle}
                            onPress={() => {
                                    updateBookmark(id);
                                    this.setState({
                                        bookmark: !this.state.bookmark
                                    })
                            }}/> :
                        <Ionicons 
                            name="ios-bookmark" 
                            color={this.state.bookmark ? "#ac0d42" : "#fff"}
                            size={36} 
                            style={styles.iconStyle}
                            onPress={() => alert('Please login to bookmark this event.')}/>
                        }
                    </View>
                    <View rkCardHeader>
                        <View>
                            <Text style={styles.engNameStyle}>
                                {engName}   
                            </Text>
                        </View>
                    </View>
                    <View rkCardContent>
                        <View>
                            <Text>{description === 'no' ? 'No Description' : description}</Text>
                        </View>
                    </View>
                    <View rkCardFooter>
                        <View>
                            <Text>
                                <Text>
                                    <Text style={styles.dateStyle}>Date: </Text> {startDate} - {endDate}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </RkCard>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    engNameStyle: {
        fontWeight: 'bold',
        fontSize: 16
    },
    dateStyle: {
        fontWeight: 'bold'
    },
    iconStyle: {
        position: 'absolute', 
        right: 15, 
        bottom: 150
    }
})


export { EventDetailScreen };

