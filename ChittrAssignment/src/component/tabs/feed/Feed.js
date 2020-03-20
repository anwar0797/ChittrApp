import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import {CustomHeader} from '../../CustomHeader';
import {Card, CardItem, Thumbnail,Toast, Button} from 'native-base';
import {IMAGE} from '../../../constants/Image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import FloatingButton from '../../FloatingButton';
import AutoHeightImage from 'react-native-auto-height-image';


export class Feed extends React.Component {
  FloatingButtonEvent () {
    this.props.navigation.navigate('postChit');
  };

  constructor() {
    super();
    this.state = {
      dataSource: [],
    };
  }

  componentDidMount() {
    const url = 'http://10.0.2.2:3333/api/v0.0.5/chits';
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

  checkLocation(item) {
    if (
      typeof item.location== 'undefined' ||
      item.location == null
    
    ) {
      Toast.show({
        text: 'no location',
        buttonText: 'Okay'
      })
    
    }else{
      this.props.navigation.navigate('Location',{latitude:item.location.latitude,longitude:item.location.longitude});

    }
  } 

  renderItem = ({item}) => {
    const url =
      'http://10.0.2.2:3333/api/v0.0.5/user/' + item.user.user_id + '/photo';
    const photoURL = 
      'http://10.0.2.2:3333/api/v0.0.5/chits/' + item.chit_id + '/photo';
    console.log(url);
    return (
      <View style={{flex: 1, backgroundColor: 'rgb(27, 40, 54)'}}>
        <Card style={{flex: 1, backgroundColor: 'rgb(27, 40, 54)'}}>
          <CardItem style={{backgroundColor: 'rgb(27, 40, 54)'}}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Profile', {user_id: item.user.user_id})}>
              <Thumbnail source={{uri: url}} />
            </TouchableOpacity>
            <Text style={styles.textName}>{item.user.given_name}</Text>
            <Text style={styles.textUserName}>@{item.user.given_name}</Text>
          </CardItem>
          <CardItem style={{backgroundColor: 'rgb(27, 40, 54)'}}>
            <Text style={styles.text}>{item.chit_content}</Text>

            <AutoHeightImage
              source={{uri:photoURL}}
              style={{alignSelf:'center', borderRadius:10}}
              width={200}
              />
          </CardItem>
          <Button
              style={{padding: 15, height: 20}}
              block
              onPress={() => this.checkLocation(item)}>
              <Text>View Location</Text>
            </Button>
        </Card>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgb(27, 40, 54)'}}>
        <CustomHeader
          title="Chits"
          isHome={true}
          navigation={this.props.navigation}
        />

        <FlatList
          data={this.state.dataSource}
          keyExtractor={({id}, index) => id}
          renderItem={this.renderItem}
        />

        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => this.FloatingButtonEvent()}
          style={styles.TouchableOpacity}>
          <FontAwesome name="edit" size={30} />
        </TouchableOpacity>
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
    padding: 5,
  },

  cardText: {
    //flexDirection: 'column',
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: 'rgb(27, 40, 54)',
    padding: 5,
  },

  textName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10,
  },

  textUserName: {
    flex: 1.3,
    fontSize: 14,
    fontWeight: 'bold',
    color: 'grey',
  },

  text: {
    flex: 1,
    flexWrap: 'wrap',
    color: 'white',
    marginLeft: 53,
    padding: 10,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginTop: 20,
  },
  TouchableOpacity: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    bottom: 10,
    borderRadius: 40,
    backgroundColor: '#1e90ff',
  },
  FloatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
});

