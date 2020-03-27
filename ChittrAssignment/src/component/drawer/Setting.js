import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {Text} from 'native-base';
import {CustomHeader} from '../CustomHeader';
import {IMAGE} from '../../constants/Image'

export class Setting extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <CustomHeader title="Setting" navigation={this.props.navigation} />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Setting Screen</Text>
          <Image
            source={IMAGE.ICON_USER_DEFAULT}
            style={styles.photo}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  photo: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginTop: 20,
  }
})
