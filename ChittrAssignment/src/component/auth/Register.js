import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {Text, Button} from 'native-base';
import {CustomHeader} from '../CustomHeader';
//import { TextInput } from 'react-native-gesture-handler';

export class Register extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        
        <Text style={styles.header}>Registration</Text>

        <TextInput style={styles.textName} 
        placeholder="Name"
        placeholderTextColor="white"/>
        <TextInput style={styles.textFamily} 
        placeholder="Family Name"
        placeholderTextColor="white"/>
        <TextInput style={styles.textEmail} 
        placeholder="Email"
        placeholderTextColor="white"/>
        <TextInput style={styles.textPass} 
        placeholder="Password"
        placeholderTextColor="white"
        secureTextEntry={true}/>
        <TextInput style={styles.textConfirmPass} 
        placeholder="Confirm Password"
        placeholderTextColor="white"
        secureTextEntry={true}/>

        <Button
          block
          light
          style={styles.RegisterBtn}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={{fontWeight: 'bold'}}>Register</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: 'rgb(27, 40, 54)',
    alignSelf: 'stretch'
  },
  header: {
    fontSize:40,
    top:40,
    paddingBottom:10,
    fontWeight: 'bold',
    color: '#7a42f4',
    borderBottomWidth: 1,
    marginLeft: 10
  },
  textName:{
    alignSelf:'stretch',
    top:120,
    borderBottomWidth:0.7,
    borderColor: '#7a42f4',
    color: 'white',
    fontSize: 16,
    marginLeft: 10
  },
  textFamily:{
    alignSelf:'stretch',
    top:140,
    borderBottomWidth:0.7,
    borderColor: '#7a42f4',
    color: 'white',
    fontSize: 16,
    marginLeft: 10
  },
  textEmail:{
    alignSelf:'stretch',
    top:160,
    borderBottomWidth:0.7,
    borderColor: '#7a42f4',
    color: 'white',
    fontSize: 16,
    marginLeft: 10
  },
  textPass:{
    alignSelf:'stretch',
    top:180,
    borderBottomWidth:0.7,
    borderColor: '#7a42f4',
    color: 'white',
    fontSize: 16,
    marginLeft: 10
  },
  textConfirmPass:{
    alignSelf:'stretch',
    top:200,
    borderBottomWidth:0.7,
    borderColor: '#7a42f4',
    color: 'white',
    fontSize: 16,
    marginLeft: 10
  },
  RegisterBtn: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
    top: '65%'
  },
})


// given_name
// family_name
// email
// password
