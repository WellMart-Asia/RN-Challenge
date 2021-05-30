import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const Floating = () => {
    return (
            <View style={ styles.FloatingStyle }>
                <Feather name="plus" style={ styles.LogoStyle } />
            </View>
    )
}

const styles = StyleSheet.create({
    LogoStyle: {
        fontSize: 30
    },
    FloatingStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: "100%"
    }
})

export default Floating;