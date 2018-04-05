import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const Header = (props) => (
        <View style={[HeaderStyles.viewStyle]}>
        <Text style={[HeaderStyles.textStyle]}>{props.headerText}</Text>
        </View>
);

const HeaderStyles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold'
    },
    viewStyle: {
        backgroundColor: '#FF5360',
        justifyContent: 'center',
        alignContent: 'center',
        height: 84,
        paddingTop: 40,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        elevation: 2,
        position: 'relative'
    }
});
export default Header;
