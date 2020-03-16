import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Text, Button} from 'native-base';

export class Login extends React.Component {
  state = {
    username: '',
    password: '',
  };
  handleEmail = text => {
    this.setState({username: text});
  };
  handlePassword = text => {
    this.setState({password: text});
  };
  login = (username, pass) => {
    alert('username: ' + username + ' password: ' + pass);
  };

  render() {
    return (
      <View style={styles.Container}>
        <Text style={styles.Logo}>Chittr</Text>
        <TextInput
          style={styles.Username}
          underlineColorAndroid="transparent"
          placeholder="Username"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handleEmail}
        />

        <TextInput
          style={styles.Password}
          underlineColorAndroid="transparent"
          placeholder="Password"
          placeholderTextColor="#9a73ef"
          autoCapitalize="none"
          onChangeText={this.handlePassword}
        />
        <Button
          block
          light
          style={styles.LoginBtn}
          onPress={() => this.props.navigation.navigate('app')}>
          <Text style={{fontWeight: 'bold'}}>Login</Text>
        </Button>

        <Text style={{fontSize: 20, color: 'white'}}>OR</Text>

        <Button
          block
          light
          style={styles.RegisterBtn}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={{fontWeight: 'bold'}}>Register</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(27, 40, 54)',
  },
  Logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#7a42f4',
    marginBottom: 40,
  },
  Username: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    color: 'white',
  },
  Password: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderWidth: 1,
    color: 'white',
  },
  LoginBtn: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  RegisterBtn: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
});
