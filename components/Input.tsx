import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface props {
    placeholder: string;
    effect: (text: string) => void;
    value?: string;
}

const Input:React.FC<props> = (props) => {
    return (
        <View>
            <TextInput 
                style={ styles.InputStyle }
                placeholder={ props.placeholder }
                onChangeText={ (text) => { props.effect(text) } }
                value={ props.value }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    InputStyle: {
        backgroundColor: '#ffffff',
        height: '100%',
        fontSize: 20
    }
})

export default Input;