import React from 'react';
import { View, TextInput, Text } from 'react-native';

const Input = ({label, value, onChangeText, placeholder, isSecure}) => {
    return (
        <View style={{flex: 1,flexDirection: 'row', alignItems: 'center', justifyContent:'center'}}>
            <Text style={{ flex: 3, paddingLeft: 10, fontSize: 15}}> 
                {label}
            </Text>
            <TextInput secureTextEntry={isSecure} autoCorrect={false} placeholder={placeholder} style={{ fontSize: 15,flex: 7 ,paddingLeft: 10, paddingRight: 10, height: 30}} value ={value} onChangeText={onChangeText}>

            </TextInput>
        </View> 
    )
}

export default Input;
