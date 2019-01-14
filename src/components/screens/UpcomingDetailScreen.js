/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { View, ScrollView, Image, Text } from 'react-native';
import moment from 'moment';
import {
    RkCard,
} from 'react-native-ui-kitten';


class UpcomingDetailScreen extends Component {
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

    render(){
        const { navigation } = this.props;
        const start = navigation.getParam('start', 'no start time');
        const end = navigation.getParam('end', 'no end time');
        const engName = navigation.getParam('engName', 'no english name');
        const description = navigation.getParam('engDescription', 'no description');

        const startDate = moment(start.toString()).format('L');
        const endDate = moment(end.toString()).format('L');

        return(
            <ScrollView>
                <RkCard rkType='article'>
                    <Image rkCardImg source={{uri: 'explore'}} />
                    <View rkCardHeader>
                        <View>
                            <Text style={{fontWeight: "bold", fontSize: 16 }}>
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
                                    <Text style={{fontWeight: "bold" }}>Date: </Text> {startDate} - {endDate}
                                </Text>
                            </Text>
                        </View>
                    </View>
                </RkCard>
            </ScrollView>
        )
    }
}


export { UpcomingDetailScreen };

