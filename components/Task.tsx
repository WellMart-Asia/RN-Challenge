import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Task = (props) =>{
    return (
        <View style={styles.item}> 
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square}>
                    <CheckBox style={styles.checkboxes}/>
                </TouchableOpacity>
                <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <View style={styles.circular}></View>
        </View>
    )
}

const styles = StyleSheet.create({
    item:{
        backgroundColor : "#0192",
        padding : 10,
        borderRadius: 10,
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        marginBottom : 5,
        marginTop : 5
    },
    itemLeft:{
        flexDirection : 'row',
        alignItems : 'center',
        flexWrap : 'wrap'
    },
    square:{
        width : 24,
        height : 24,
        backgroundColor : '#55BCF6',
        borderRadius : 15,
        marginRight : 15
    },
    itemText:{
        maxWidth : '80%'
    },
    circular:{
        width : 12,
        height : 12,
        borderColor : '#55BCF6',
        borderWidth : 2,
        borderRadius : 5,
        marginLeft : 5
    },
    checkboxes:{
        alignItems : 'center',
        justifyContent: 'space-between'
    }
});

export default Task;