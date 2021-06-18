import React from  'react';
import {View,Text,StyleSheet} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Task=(props: { text: boolean | React.ReactChild | React.ReactFragment | React.ReactPortal | null | undefined; })=>{
    return(
        <View style={styles.item}>
            <View style={styles.itemLeft}>
               <TouchableOpacity style={styles.square}></TouchableOpacity> 
               <Text style={styles.itemText}>{props.text}</Text>
            </View>
            <View style={styles.circular}></View>
            
        </View>
    )
};
const styles = StyleSheet.create({
    item:{
        backgroundColor:'#ffff',
        padding:15,
        borderRadius:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginBottom:20,
    },
    itemLeft:{
        flexDirection:'row',
        alignItems:'center',
        flexWrap:'wrap',
    },
    itemText:{
        maxWidth:'80%',

    },
    square:{
        width:24,
        height:24,
        backgroundColor:'#7952b3',
        opacity:0.4,
        borderRadius:5,
        marginRight:15,
    },
    circular:{
        width:12,
        height:12,
        borderColor:'#7952b3',
        borderWidth:2,
        borderRadius:5,

    },
});

export default Task;