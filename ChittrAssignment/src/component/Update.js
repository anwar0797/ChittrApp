import React from 'react';
import {View, TextInput, StyleSheet, AsyncStorage} from 'react-native';
import {Text, Button, TabHeading} from 'native-base';
import {CustomHeader} from '../component/CustomHeader';

export class Update extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      userID: '',
      loggedUser: [],
      given_name:'',
      family_name:'',
      email:'',
      password:'',
      confirm_pass:''
    };
  }

  handleName = text => {
    this.setState({given_name: text})
  };
  handleFamilyName = text => {
    this.setState({family_name: text})
  };
  handleEmail = text => {
    this.setState({email: text})
  };
  handlePassword = text => { 
    this.setState({password: text})
  };
  handleConfirmPass = text => {
    this.setState({confirm_pass: text})
  };

  handleUpdate = async () => {
    const id = await AsyncStorage.getItem('@id');
    const token = await AsyncStorage.getItem('@token');
    fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id, {
      method:'PATCH',
      headers:{'Content-Type': 'application/json', 'X-Authorization': token},
      body: JSON.stringify({
        family_name: this.state.family_name,
        given_name: this.state.given_name,
        email: this.state.email,
        password: this.state.password
      })
    })
    .then(response => response.json())
    .then(responseJson => {
      alert("successful");
      this.props.navigation.navigate('Feed');
    }).catch(responseJson =>{alert('Unable to update')})
    
    //console.log(responseJson)
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomHeader title="Update" navigation={this.props.navigation} />
        <View style={styles.container}>
          <Text style={styles.header}>Update Details</Text>

          <TextInput
            style={styles.textName}
            placeholder="Name"
            placeholderTextColor="white"
            // value={this.state.given_name}
            onChangeText={this.handleName}
          />
          <TextInput
            style={styles.textFamily}
            placeholder="Family Name"
            placeholderTextColor="white"
            // value={this.state.family_name}
            onChangeText={this.handleFamilyName}
          />
          <TextInput
            style={styles.textEmail}
            placeholder="Email"
            placeholderTextColor="white"
            // value={this.state.email}
            onChangeText={this.handleEmail}
          />
          <TextInput
            style={styles.textPass}
            placeholder="Password"
            placeholderTextColor="white"
            secureTextEntry={true}
            // value={this.state.password}
            onChangeText={this.handlePassword}
          />
          <TextInput
            style={styles.textConfirmPass}
            placeholder="Confirm Password"
            placeholderTextColor="white"
            secureTextEntry={true}
            // value={this.state.confirm_pass}
            onChangeText={this.handleConfirmPass}
          />

          <Button block light style={styles.RegisterBtn}
          onPress= {this.handleUpdate}>
            <Text style={{fontWeight: 'bold'}}>Update</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(27, 40, 54)',
    justifyContent: 'center',
  },
  header: {
    fontSize: 40,
    paddingBottom: 10,
    fontWeight: 'bold',
    color: '#7a42f4',
    borderBottomWidth: 1,
    marginLeft: 10,
    bottom: '15%',
  },
  textName: {
    bottom: '8%',
    borderBottomWidth: 0.7,
    borderColor: '#7a42f4',
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  textFamily: {
    borderBottomWidth: 0.7,
    borderColor: '#7a42f4',
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    bottom: '6%',
  },
  textEmail: {
    borderBottomWidth: 0.7,
    borderColor: '#7a42f4',
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    bottom: '4%',
  },
  textPass: {
    borderBottomWidth: 0.7,
    borderColor: '#7a42f4',
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    bottom: '2%',
  },
  textConfirmPass: {
    borderBottomWidth: 0.7,
    borderColor: '#7a42f4',
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  RegisterBtn: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
    top: '35%',
  },
});
