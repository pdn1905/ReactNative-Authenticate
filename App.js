/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  Image, 
  TouchableOpacity
} from 'react-native';
import Header from './component/Common/Header';
import firebase from 'firebase';
import LoginForm from './component/LoginForm';
import Button from './component/Common/Button';
import Spinner from './component/Common/Spinner';
import ImagePicker from 'react-native-image-picker';

// var {width, height} = Dimensions.get()
export default class App extends Component {
  state = { isLogged: null, avatarSource: null, uri: null }
  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyB52XmoS-3fDBIqBs-EVult-jhqCGKhyVY",
      authDomain: "authentication-af061.firebaseapp.com",
      databaseURL: "https://authentication-af061.firebaseio.com",
      projectId: "authentication-af061",
      storageBucket: "authentication-af061.appspot.com",
      messagingSenderId: "945869558089"
    })

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
          this.setState({isLogged: true });
      } else {
        this.setState({isLogged: false });
      }
    })
  }



  renderContent() {

    switch (this.state.isLogged) {
      case true:
        return (
          <View style={{height:60, paddingTop: 20}}>
            <Button onPress={() => {
              firebase.auth().signOut()
            }} >
              <Text>Log Out</Text>
            </Button>
          </View>
      )
      case false:
        return (
          <LoginForm uriImage={this.state.uri} />
        ) 
      case null: 
      return (
        <View style={{ flex: 1 }}>
          <Spinner size='large' ></Spinner>
          </View>
      )
    }
  }

  selectPhotoTapped() {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled photo picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
        // let source = { uri: response.uri };

        // You can also display the image using data:
        let source = { uri: 'data:image/jpeg;base64,' + response.data };

        this.setState({
          uri: response.uri,
          avatarSource: source
        });
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor="blue" barStyle="light-content" />
        <Header headerText='Authenticate' />
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
        <View style={{ alignItems: 'center', paddingTop: 20}}>
          <Image style={{ height: 150, width: 150, borderRadius: 75, borderColor: 'black', borderWidth: 1}} source={this.state.avatarSource} />
        </View>
        </TouchableOpacity>
        {this.renderContent()}
      </View>
    );
  }
}
