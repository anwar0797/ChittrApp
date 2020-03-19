import React from 'react';
import {View, TextInput, StyleSheet, AsyncStorage} from 'react-native';
import {Text, Button} from 'native-base';

export class Login extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      email:'',
      password:'',
      userID:''
    };
  }

  handleEmail = text => {
    this.setState({email: text})
  };
  handlePassword = text => {
    this.setState({password: text})
  };

  handleLogin = async () => {
    fetch('http://10.0.2.2:3333/api/v0.0.5/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then(response => response.json())
      .then(responseJson => {
        AsyncStorage.setItem('@token', responseJson.token.toString());
        AsyncStorage.setItem('@id', responseJson.id.toString());
        this.props.navigation.navigate('app')
      })
      .catch(responseJson => {
        alert('Invalid Login Credentials');
      });
    //console.log(responseJson)
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
          secureTextEntry={true}
          onChangeText={this.handlePassword}
        />
        <Button block light style={styles.LoginBtn} 
        onPress={this.handleLogin}>
          <Text style={{fontWeight: 'bold'}}>Login</Text>
        </Button>

        <Text style={{fontSize: 20, color: 'white'}}>OR</Text>

        <Button
          block
          light
          style={styles.RegisterBtn}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={{fontWeight: 'bold'}}>Create an Account</Text>
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
    borderBottomWidth: 1,
    width: 300,
    color: 'white',
  },
  Password: {
    margin: 15,
    height: 40,
    borderColor: '#7a42f4',
    borderBottomWidth: 1,
    width: 300,
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
