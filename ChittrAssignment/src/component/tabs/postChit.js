import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {CustomHeader} from '../CustomHeader';
import {Card, CardItem, Thumbnail, Body, Button} from 'native-base';
import {IMAGE} from '../../constants/Image';

export class postChit extends React.Component {
    constructor() {
      super();
      this.state = {
        dataSource: [],
      };
    }

    render() {
        return (
            <View style={{flex:1}}>
                <CustomHeader
                    title="Post a Chit"
                    isHome={false}
                    navigation={this.props.navigation}
                />

                <Text>Post Chit</Text>
            </View>
        )
    }
}
