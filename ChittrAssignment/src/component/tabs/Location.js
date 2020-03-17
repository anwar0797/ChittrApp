import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {CustomHeader} from '../CustomHeader';
// import {Card, CardItem, Thumbnail, Body, Button} from 'native-base';
// import {IMAGE} from '../../constants/Image';

export class Location extends React.Component {
    constructor() {
      super();
      this.state = {
        dataSource: [],
      };
    }

    render() {
        return (
            <MapView
            provider={PROVIDER_GOOGLE}
            style={{flex:1}}
            initialRegion={{
                latitude:37.7885,
                longitude:-122.4324,
                latitudeDelta:0.0922,
                longitudeDelta:0.0421
            }}
            />
            
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#2c3e50'
    }
})
