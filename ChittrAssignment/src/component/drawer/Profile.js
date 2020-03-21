import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {CustomHeader} from '../CustomHeader';
import {Card, CardItem, Thumbnail, Body, Button, Right} from 'native-base';
import {IMAGE} from '../../constants/Image';
import AutoHeightImage from 'react-native-auto-height-image';


export class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
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

  handleFollow = async () => {
    const id = await AsyncStorage.getItem('@token');
    fetch(
      'http://10.0.2.2:3333/api/v0.0.5/user/' +
        this.state.dataSource.user_id +
        '/follow',
      {
        method: 'POST',
        headers: {
          'X-Authorization': id,
        },
      },
    ).then(response => response.json());

    alert('Followed').catch(response => {
      alert('Unable to follow');
    });
    //console.log(responseJson)
  };

  handleUnfollow = async () => {
    const id = await AsyncStorage.getItem('@token');
    fetch(
      'http://10.0.2.2:3333/api/v0.0.5/user/' +
        this.state.dataSource.user_id +
        '/follow',
      {
        method: 'DELETE',
        headers: {
          'X-Authorization': id,
        },
      },
    ).then(response => response.json());

    alert('Unfollowed').catch(response => {
      alert('Unable to unfollow');
    });
  };

  renderItem = ({item}) => {
    const url =
      'http://10.0.2.2:3333/api/v0.0.5/user/' +
      this.state.dataSource.user_id +
      '/photo';

    const photoURL =
      'http://10.0.2.2:3333/api/v0.0.5/chits/' + item.chit_id + '/photo';
    return (
      <View style={{flex: 1, backgroundColor: 'rgb(27, 40, 54)'}}>
        <Card style={{flex: 0, backgroundColor: 'rgb(27, 40, 54)'}}>
          <CardItem style={{backgroundColor: 'rgb(27, 40, 54)'}}>
            <TouchableOpacity>
              <Thumbnail style={{width: 60, height: 60}} source={{uri: url}} />
            </TouchableOpacity>
            <Text style={styles.textName}>
              {this.state.dataSource.given_name}
            </Text>
            <Text style={styles.textUserName}>
              @{this.state.dataSource.given_name}
            </Text>
          </CardItem>
          <CardItem style={styles.cardText}>
            {/* <Text>@{this.state.dataSource.given_name}</Text> */}
            <Text style={styles.text}>{item.chit_content}</Text>

            <AutoHeightImage
              source={{uri: photoURL}}
              style={{alignSelf: 'center', borderRadius: 10}}
              width={200}
            />
          </CardItem>
        </Card>
      </View>
    );
  };

  render() {
    const url =
      'http://10.0.2.2:3333/api/v0.0.5/user/' +
      this.state.dataSource.user_id +
      '/photo';
    return (
      <View style={{flex: 1, backgroundColor: 'rgb(27, 40, 54)'}}>
        <CustomHeader
          title="Profile"
          isHome={true}
          navigation={this.props.navigation}
        />
        <Card>
          <CardItem style={{backgroundColor: 'rgb(10,20,30)'}}>
            <TouchableOpacity>
              <Thumbnail style={{width: 60, height: 60}} source={{uri: url}} />
              <Body>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'white',
                    left: 65,
                    bottom: 55,
                  }}>
                  {this.state.dataSource.given_name}
                </Text>
              </Body>
            </TouchableOpacity>
            <Right>
              <Button
                block
                style={{padding: 10, height: 30, top: 15, right: 5}}
                onPress={this.handleFollow}>
                <Text>FOLLOW</Text>
              </Button>
            </Right>
            <Right>
              <Button
                block
                style={{padding: 10, height: 30, top: 15}}
                onPress={this.handleUnfollow}>
                <Text>UNFOLLOW</Text>
              </Button>
            </Right>
          </CardItem>

          <CardItem
            style={{
              justifyContent: 'center',
              backgroundColor: 'rgb(10,20,30)',
            }}>
            <Button
              style={{padding: 10, height: 30, right: 15}}
              block
              onPress={() => this.props.navigation.navigate('Following',{
                user_id:this.state.userID,
                query:'following'})}> 
              <Text>Following</Text>
            </Button>

            <Button
              style={{padding: 10, height: 30, left: 15, right: 15}}
              block
              onPress={() => this.props.navigation.navigate('Following',{
                user_id:this.state.userID,
                query:'followers'})}>
              <Text>Followers</Text>
            </Button>
          </CardItem>
        </Card>
        <FlatList
          data={this.state.dataSource.recent_chits}
          keyExtractor={({id}, index) => 1}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: 'rgb(27, 40, 54)',
  },

  cardThumbnail: {
    flexDirection: 'row',
    backgroundColor: 'rgb(27, 40, 54)',
  },

  cardText: {
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    backgroundColor: 'rgb(27, 40, 54)',
  },

  textName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    bottom: 15,
    left: 10,
  },

  textUserName: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'grey',
    bottom: 15,
  },

  text: {
    flex: 1,
    flexWrap: 'wrap',
    color: 'white',
    marginLeft: 60,
    padding: 10,
  },
});
