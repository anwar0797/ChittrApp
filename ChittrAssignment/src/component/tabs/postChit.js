import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import {CustomHeader} from '../CustomHeader';
import {Card, CardItem, Thumbnail, Body, Button, Right} from 'native-base';
import {IMAGE} from '../../constants/Image';
import {TextInput} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export class postChit extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      chit_content: '',
    };
  }

  handleChitText = text => {
    this.setState({chit_content: text});
  };

  handleChit = async () => {
    const id = await AsyncStorage.getItem('@token');
    fetch('http://10.0.2.2:3333/api/v0.0.5/chits/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': id
      },
      body: JSON.stringify({
        chit_id: 0,
        timestamp: Date.now(),
        chit_content: this.state.chit_content,
        location: {
          longitude: 0,
          latitude: 0,
        },
        user: {
          user_id: 0,
          given_name: '',
          family_name: '',
          email: '',
        },
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        alert('Chit posted');
        this.props.navigation.navigate('Feed');
      })
      .catch(responseJson => {
        alert('Chit not posted');
      });
    //console.log(responseJson)
  };

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
          onChangeText={this.handleChitText}
        />

        <Right style={{flexDirection: 'column', marginLeft: '80%'}}>
          <TouchableOpacity style={styles.TouchableOpacity}
            activeOpacity={0.5}
            onPress={this.handleChit}>
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
});
