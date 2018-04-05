import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({size}) => {
    return (
        <View style={styles.spinnerStyle}> 
            <ActivityIndicator size={size} />
        </View>
    )
}

const styles = {
    spinnerStyle : {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    }
}

export default Spinner;