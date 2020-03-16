import React from 'react';
import {
  View,
  Text,
  Stylesheet,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

import {AntDesign, Entypo} from 'react-native-vector-icons';

export default class FloatingButton extends React.Component {
  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        <Text>Button</Text>
      </View>
    );
  }
}

const styles = Stylesheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
  },
});
