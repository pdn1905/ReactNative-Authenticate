import React,{ Component } from 'react';
import { View, Text, TextInput, Platform } from 'react-native';
import CardSection from './Common/CardSection';
import RNFetchBlob from 'react-native-fetch-blob';
import Card from './Common/Card';
import Button from './Common/Button';
import Input from './Common/Input';
import firebase from 'firebase';
import Spinner from './Common/Spinner';

const Blob = RNFetchBlob.polyfill.Blob
const fs = RNFetchBlob.fs
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
window.Blob = Blob

export default class LoginForm extends Component {
    state = {
        email:'',
        password: '',
        error: '',
        isLoading: false,
        uri: null
    };

    componentWillReceiveProps(nextProps) {
        console.log('ÂHHAHA',nextProps.uriImage)
        this.setState({
            uri: nextProps.uriImage,
        });
    }

    changedTextEmail= (email) => {
        this.setState({ email: email })
    };
    
    changedTextPassword= (pass) => {
        this.setState({ password: pass })
    };

    signinAction() {
            const {email, password} = this.state;
            this.setState({ error: '', isLoading:true });
            firebase.auth().signInWithEmailAndPassword(email,password).then(() => {
                this.onLoginSuccess.bind(this),
                this.uploadImage()
            }).catch( () => {
                firebase.auth().createUserWithEmailAndPassword(email,password).then(() => {
                    this.onLoginSuccess.bind(this)
                }).catch( (errorl) => {
                    this.setState({ error: errorl.message, isLoading: false });
                        
                    })
                 }
            )
    };

    uploadImage() {
        console.log('uploadImage---uploadImage')
          const mime = 'application/octet-stream'
          const uri = this.state.uri
          const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
          let uploadBlob = null
    
          const imageRef = firebase.storage().ref('images').child('image_003')
    
          fs.readFile(uploadUri, 'base64')
            .then((data) => {
              return Blob.build(data, { type: `${mime};BASE64` })
            })
            .then((blob) => {
              uploadBlob = blob
              return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
              uploadBlob.close()
              return imageRef.getDownloadURL()
            })
            .then((url) => {
                console.log('URL', url)
            })
            .catch((error) => {
                console.log('URL', error)
          })
      }

    renderButton() {
        if (this.state.isLoading) {
            return <Spinner size='small' />
        } 

        return (<Button onPress={this.signinAction.bind(this)}>
                    <Text>Login</Text>
              </Button>);
    };

    onLoginSuccess() {
        this.setState({
            email:'',
            password: '',
            error: '',
            isLoading: false
        })
    };

    render() {
        return(
            <Card>
                <CardSection>
                    <Input isSecure={false} placeholder='user@gmail.com' label={'Email :'} value={this.state.email} onChangeText={email => this.changedTextEmail(email) }>
                    
                    </Input>
                </CardSection>

                <CardSection>
                    <Input isSecure={true} placeholder='********' label={'Password :'} value={this.state.password} onChangeText={pass => this.changedTextPassword(pass) }>
                    
                    </Input>
                </CardSection>  
                <Text style={styles.errorTextStyle}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
};

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'   
    }
};