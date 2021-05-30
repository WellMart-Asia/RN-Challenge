import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Input from './Input';

interface props {
    effect: (data: string) => void;
}

const SearchInput: React.FC<props> = (props) => {
    return (
        <View style={ styles.SearchInputStyle }>
            <Feather name="search" style={ styles.LogoStyle } />
            <View style={ styles.InputStyle }> 
                <Input placeholder="search" effect={props.effect}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    SearchInputStyle: {
        flexDirection: "row",
        borderRadius: 15,
        backgroundColor: "white",
        height: 50,
        elevation: 1
    },
    InputStyle: {
        flex: 1, 
        marginRight: 10
    },
    LogoStyle: {
        marginHorizontal: 10,
        alignSelf: "center",
        fontSize: 25
    }
})

export default SearchInput;