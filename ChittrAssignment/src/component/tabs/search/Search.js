import React from 'react';
import {
  FlatList,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {CustomHeader} from '../../CustomHeader';
import {Card, CardItem, Thumbnail, List, ListItem} from 'native-base';
import SearchInput, {createFilter} from 'react-native-search-filter';
import {IMAGE} from '../../../constants/Image';

export class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      textInput: '',
    };
  }
  renderItem = ({item}) => {
    const photoUrl =
      'http://10.0.2.2:3333/api/v0.0.5/user/' + item.user_id + '/photo';
    return (
      <View>
        <List style={{borderColor: 'white', borderWidth: 0.5}}>
          <ListItem onPress={() => this.props.navigation.navigate('Profile', {user_id: item.user_id})}>
            <Thumbnail style={styles.photo} source={{uri:photoUrl}} />
            <Text style={{color: 'white', marginLeft:10}}>{item.given_name}</Text>
            <ListItem>
              <Text style={{color: 'white'}}>@{item.given_name}</Text>
            </ListItem>
          </ListItem>
        </List>
      </View> 
    );
  };

  getSearch(userInput) {
    this.setState({userInput});
    const url =
      'http://10.0.2.2:3333/api/v0.0.5/search_user?q=' + userInput + '';
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

  // searchUpdated(term) {
  //   this.setState({searchTerm: term});
  // }

  render() {
    return (
      <View style={styles.container}>
        <CustomHeader
          title="Search"
          isHome={true}
          navigation={this.props.navigation}
        />
        <SearchInput
          style={styles.searchInput}
          onChangeText={term => {
            if (term.length < 2) {
              this.setState({
                dataSource: [],
              });
            } else {
              this.getSearch(term);
            }
          }}
          //term style={{color:'white'}}
          placeholderTextColor="white"
          placeholder="Search for Users"
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
  photo: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginTop: 20,
  },
  searchInput: {
    padding: 10,
    borderColor: 'white',
    borderWidth: 2,
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(27, 40, 54)',
  },
});
