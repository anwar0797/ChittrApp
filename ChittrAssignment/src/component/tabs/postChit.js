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
import {Card, CardItem, Thumbnail, Body, Button, Right} from 'native-base';
import {IMAGE} from '../../constants/Image';
import {TextInput} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export class postChit extends React.Component {

    postChit = async

  constructor() {
    super();
    this.state = {
      dataSource: [],
    };
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgb(27, 40, 54)'}}>
        <CustomHeader
          title="Post a Chit"
          isHome={false}
          navigation={this.props.navigation}
        />

        <TextInput
          style={{
            height: 250,
            textAlignVertical: 'top',
            color: 'white',
            fontSize: 18,
          }}
          placeholder="Post a chit!"
          placeholderTextColor="white"
          multiline={true}
          maxLength={140}
        />

          <Right style={{flexDirection:'column', marginLeft:'80%'}}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.FloatingButtonEvent()}
          style={styles.TouchableOpacity}>
          <FontAwesome name="share-square" size={30} />
        </TouchableOpacity>
        </Right>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    FloatingButtonStyle: {
        resizeMode: 'contain',
        width: 50,
        height: 50,
      },
      TouchableOpacity: {
        position: 'relative',
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        backgroundColor: '#1e90ff',
      },
})