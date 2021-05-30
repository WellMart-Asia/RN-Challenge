import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

interface props {
    onClick: () => void;
    title: string;
}

const ButtonComponent:React.FC<props> = (props) => {
    return (
        <View>
            <Button 
                title={ props.title }
                onPress={() => { props.onClick() }}
            />
        </View>
    )
}

export default ButtonComponent;