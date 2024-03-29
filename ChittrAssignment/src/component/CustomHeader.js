import React from 'react';
import {
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Thumbnail,
} from 'native-base';
import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import {IMAGE} from '../constants/Image';
//import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export class CustomHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      userID:''
    };
  }

  render() {
    const url =
      'http://10.0.2.2:3333/api/v0.0.5/user/' +
      this.state.dataSource.user_id +
      '/photo';
    let {title, isHome} = this.props;
    return (
      <Header style={{backgroundColor: 'rgb(27, 40, 54)'}}>
        <Left>
          {isHome ? (
            <TouchableOpacity
              onPress={() => this.props.navigation.openDrawer()}>
              <Thumbnail
                source={IMAGE.ICON_LHSMENU}
                style={styles.thumbnail}
              />
            </TouchableOpacity>
          ) : (
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          )}
        </Left>
        <Body>
          <Title>{title}</Title>
        </Body>
        <Right />
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  thumbnail: {
    width: 38,
    height: 38,
    borderRadius: 20,
    marginTop: 5,
  },
  icon: {
    position: 'absolute',
    left: '580%',
    top: 10,
  },
});
