import React, {useState, useEffect} from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {CustomHeader} from '../CustomHeader';
// import {Card, CardItem, Thumbnail, Body, Button} from 'native-base';
// import {IMAGE} from '../../constants/Image';

export class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: 0,
      latitude: 0,
    };
  }

  componentDidMount() {
    const latitude = this.props.navigation.state.params.latitude;
    const longitude = this.props.navigation.state.params.longitude;
    console.log(latitude + ' ' + longitude);
    this.setState({latitude: latitude, longitude: longitude});
   
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomHeader
          title="Chit Location"
          isHome={false}
          navigation={this.props.navigation}
        />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          region={{
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker coordinate={this.state} />
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});
