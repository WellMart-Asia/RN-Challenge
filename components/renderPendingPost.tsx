import React, {FC, useState} from "react";
import {View, Text, StyleSheet, Dimensions, TextInput} from "react-native"
import {Button} from "../components/Index"
import firebase from "firebase";

const {width, height} = Dimensions.get('screen')

interface Props{
    msg: string,
    approved: string,
    timeStamp: number;
    onApprove: () => void;
    onReject: () => void;
    onChanged: () => void;
    msg2: string
}


const App : FC <Props> = (props) => {
    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
                <TextInput style={{width: '60%'}}>({props.msg}{props.msg2})</TextInput>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                <Button title="Change" onPress={props.onChanged}/>
                <Button title="Make as Done" onPress={props.onApprove}/>
                <Button title="Delete" onPress={props.onReject}/>
            </View>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container: {
        width: width / 1.1,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 10,
        padding: 20,
        backgroundColor: '#FFF',
        shadowOffset: {
            width: 3,
            height: 3
        },
        shadowColor: '#CCC',
        shadowOpacity: 0.9
    }
})