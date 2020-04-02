import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Text, Button} from 'native-base';
import {CustomHeader} from '../CustomHeader';
import {IMAGE} from '../../constants/Image'

export class Setting extends React.Component {
  constructor(){
    super();
    this.state={
      dataSource:[],
      userID:''
    };
  }

  componentDidMount() {
    const user_id = this.props.navigation.state.params.user_id;
    this.setState({userID:user_id});
    const url = 'http://10.0.2.2:3333/api/v0.0.5/user/' + user_id;
    fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          dataSource: responseJson,
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const url =
      'http://10.0.2.2:3333/api/v0.0.5/user/' +
      this.state.dataSource.user_id +
      '/photo';
    return (
      <View style={{flex: 1}}>
        <CustomHeader title="Setting" navigation={this.props.navigation} />
        <View style={{flex: 1, alignItems:'center', backgroundColor: 'rgb(27, 42, 51)'}}>
          <Image
            source={{uri:url}}
            style={styles.photo}
          />
          <Text style={{fontSize:18, color:'white'}}>@{this.state.dataSource.given_name}</Text>
          <Button
                style={{padding:90, height: 30, top:'15%'}}
                onPress={() => {this.props.navigation.navigate('Update'), {user_id: this.state.dataSource.user_id}}}>
                <Text>Edit Profile</Text>
              </Button>
              <Button
                style={{padding:90, height: 45, top:'25%'}}
                onPress={() => {this.props.navigation.navigate('Feed')}}>
                <Text>Back to Home</Text>
              </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  photo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 20,
  }
})
