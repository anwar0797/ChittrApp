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
import {CustomHeader} from '../component/CustomHeader'
import {Card, CardItem, Thumbnail, Toast, Button} from 'native-base';
//import {IMAGE} from '../../../constants/Image';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//import FloatingButton from '../../FloatingButton';
import AutoHeightImage from 'react-native-auto-height-image';

export class Following extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      query:''
    };
  }

  componentDidMount() {
    this.handleFollow();
  }

  handleFollow() {
    const user_id = this.props.navigation.state.params.user_id;
    const query = this.props.navigation.state.params.query; 
  
    fetch('http:/10.0.2.2:3333/api/v0.0.5/user/' + user_id + '/'+query)
      .then(response => response.json())
      .then(responseJson => { 
          this.setState({
              dataSource:responseJson,
          })
        console.log(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderItem = ({item}) => {
    const url =
      'http://10.0.2.2:3333/api/v0.0.5/user/' + item.user_id + '/photo';
    console.log(url);
    return (
      <View style={{flex: 1, backgroundColor: 'rgb(27, 40, 54)'}}>
        <Card style={{flex: 1, backgroundColor: 'rgb(27, 40, 54)'}}>
          <CardItem style={{backgroundColor: 'rgb(27, 40, 54)'}}>
         
              <Thumbnail source={{uri: url}} />
            <Text style={styles.textName}>{item.given_name}</Text>
            <Text style={styles.textUserName}>@{item.given_name}</Text>
          </CardItem>
          
        </Card>
      </View>
    );
  };

  render() {
    return (
      <View style={{flex: 1, backgroundColor: 'rgb(27, 40, 54)'}}>
        <CustomHeader
          title="List"
          isHome={true}
          navigation={this.props.navigation}
        />

        <FlatList
          data={this.state.dataSource}
          keyExtractor={({id}, index) => id}
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
