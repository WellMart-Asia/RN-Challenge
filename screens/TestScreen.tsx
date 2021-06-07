import React from 'react';
import { StyleSheet } from 'react-native'
import { View,Text } from '../components/Themed';

export default function TestScreen(){
    return(
        <View>
            <Text style={styles.title}>This is The Test Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: 'blue',
    },
})