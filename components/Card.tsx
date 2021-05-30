import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather, AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import { PageParamList } from '../types';

interface Props {
    data: {
        key: string
        title: string,
        description: string,
        isFinished: boolean
    };
    update: (item: any) => void;
    delete: (key: string) => void;
    deleteButton: boolean;
    updateCloseButton: (status: boolean, key: number) => void;
    index: number;
}

type mainScreenProp = StackNavigationProp<PageParamList, "Home">;

function Card(props: Props) {
    const navigation = useNavigation<mainScreenProp>();
    const [isLongPress, setLongPress] = useState(typeof props.deleteButton !== 'undefined' ? props.deleteButton : false);
    const [isCheck, setCheck] = useState(props.data.isFinished);

    useEffect(() => { 
        setTimeout(() =>{
            setLongPress(props.deleteButton)
        }, !props.deleteButton ? 1000 : 0);
    }, [props.deleteButton]);
    
    return (
        <View style={ [styles.cardStyle, props.data.isFinished ? styles.Finished : styles.notFinished] }>
            <TouchableOpacity style={ styles.checkContainerStyle } onPress={() => {
                props.data.isFinished = props.data.isFinished ? false: true;
                props.update(props.data);
                setCheck(props.data.isFinished)
            }}>
                { props.data.isFinished ? <Feather name="check-square" style={ styles.checkStyle } /> : <Feather name="square" style={ styles.checkStyle } /> }
            </TouchableOpacity>
            <TouchableOpacity 
                style={ styles.dataStyle } 
                onLongPress={() => {
                    setLongPress(true);
                    props.updateCloseButton(true, props.index);
                }}
                onPress={() => { 
                    navigation.navigate('UpdateTask', {
                        data: props.data
                    });
                }}
            >
                <View>
                    <Text style={ (isCheck) ? styles.isFinishedText : styles.notFinishedText }>{ props.data.title }</Text>
                    <Text style={ (isCheck) ? styles.isFinishedText : styles.notFinishedText }>{ props.data.description }</Text>
                </View>
            </TouchableOpacity>
            {isLongPress ? 
                <TouchableOpacity style={ styles.closeContainerStyle } onPress={() => {props.delete(props.data.key)}}>
                    <AntDesign name="closecircle" style={styles.closeStyle}/>
                    <Text>{isLongPress}</Text>
                </TouchableOpacity> 
                : <Text></Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    cardStyle: {
        height: 60,
        borderRadius: 15,
        marginVertical: 5,
        marginHorizontal: 10,
        flexDirection: "row"
    },
    Finished: {
        backgroundColor: "#02c39a"
    },
    notFinished: {
        backgroundColor: "#fce38a"
    },
    checkContainerStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    checkStyle: {
        fontSize: 25,
        padding: 10
    },
    dataStyle: {
        flex: 4,
        paddingVertical: 10,
        paddingRight: 10
    },
    isFinishedText: {
        textDecorationLine: "line-through"
    },
    notFinishedText: {
        textDecorationLine: "none"
    },
    closeStyle: {
        fontSize: 20,
        position: "relative",
        backgroundColor: "white",
        borderRadius: 50
    }, 
    closeContainerStyle: {
        padding: 30,
        position: "absolute",
        top: -35,
        right: -35,
    }
})

export default Card;