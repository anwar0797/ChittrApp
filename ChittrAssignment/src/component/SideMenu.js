import React from 'react';
import {
  View,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';
import {Text, List, ListItem} from 'native-base';
import {IMAGE} from '../constants/Image';
import {NavigationActions, DrawerActions} from 'react-navigation';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export class SideMenu extends React.Component {

  FloatingButtonEvent() {
    this.componentDidMount();
    this.componentWillUnmount();
  }

  constructor(props) {
    super(props);
    this.state = {
      loggedUser: [],
    };
  }

  async componentDidMount() {
    this.fetchData();
    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
        this.fetchData();
      },
    );
  }

  componentWillUnmount() {
    this.willFocusSubscription.remove();
  }

  async fetchData() {
    const id = await AsyncStorage.getItem('@id');
    console.log('passed id' + id);
    fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id)
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          loggedUser: responseJson,
        });
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }

  handleSignOut = async () => {
    const tokenLogOut = await AsyncStorage.getItem('@token');

    fetch('http://10.0.2.2:3333/api/v0.0.5/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Authorization': tokenLogOut,
      },
    }).then(
      this.props.navigation.navigate('auth'),
      alert('Successful sign out'),
    );
    //AsyncStorage.clear()
  };

  render() {
    const {navigation} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.top}>
          <Image
            onPress={() => this.props.navigatation.navigate('Profile')}
            source={IMAGE.ICON_USER_DEFAULT}
            style={styles.photo}
          />
          <Text style={styles.userName}>
            {this.state.loggedUser.given_name}
          </Text>
          <Text style={styles.userHandle}>
            @{this.state.loggedUser.family_name}
          </Text>

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => this.FloatingButtonEvent()}
            style={styles.TouchableOpacity}>
            <FontAwesome name="retweet" size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Feed', {
                user_id: this.state.loggedUser.user_id,
              })
            }
            style={[styles.list, styles.firstList]}>
            <View>
              <FontAwesome
                style={styles.icon}
                name="home"
                size={20}
                color="rgb(136, 153, 166)"
              />
              <Text style={styles.text}> Home </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Profile', {
                user_id: this.state.loggedUser.user_id,
              })
            }
            style={[styles.list, styles.firstList]}>
            <View>
              <FontAwesome
                style={styles.icon}
                name="user-o"
                size={20}
                color="rgb(136, 153, 166)"
              />
              <Text style={styles.text}> Profile </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Setting', {
                user_id: this.state.loggedUser.user_id,
              })
            }
            style={[styles.list, styles.firstList]}>
            <View>
              <FontAwesome
                style={styles.icon}
                name="cog"
                size={20}
                color="rgb(136, 153, 166)"
              />
              <Text style={styles.text}> Settings and privacy</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <List>
          <ListItem noBorder onPress={this.handleSignOut}>
            <Text style={{color: 'white'}}>Logout</Text>
          </ListItem>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(27, 42, 51)',
    paddingTop: 10,
  },
  list: {
    padding: 10,
    height: 60,
    borderColor: 'red',
    borderWidth: 0,
  },
  text: {
    position: 'absolute',
    left: '24%',
    top: 10,
    color: 'white',
    fontSize: 16,
  },
  top: {
    paddingBottom: 40,
    paddingLeft: 30,
    marginBottom: 10,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginTop: 20,
  },
  userName: {
    marginTop: 15,
    color: 'white',
    fontWeight: 'bold',
  },
  userHandle: {
    marginTop: 1,
    color: 'rgb(136, 153, 166)',
    fontWeight: '300',
  },
  followingCount: {
    color: 'white',
    position: 'absolute',
    left: 0,
    top: 10,
    fontWeight: 'bold',
  },
  followingText: {
    color: 'rgb(136, 153, 166)',
    fontWeight: '300',
  },
  followersCount: {
    color: 'white',
    position: 'absolute',
    right: 30,
    top: 10,
    fontWeight: 'bold',
  },
  followersText: {
    color: 'rgb(136, 153, 166)',
    fontWeight: '300',
  },
  firstList: {
    marginTop: 0,
    borderTopWidth: 0.3,
    borderTopColor: 'black',
    height: 60,
    borderTopWidth: 0.3,
    borderTopColor: 'black',
  },
  icon: {
    position: 'absolute',
    left: 20,
    top: 10,
  },
  TouchableOpacity: {
    position: 'absolute',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 10,
    borderRadius: 40,
    backgroundColor: '#1e90ff',
  },
});
