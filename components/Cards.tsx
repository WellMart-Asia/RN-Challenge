import React from 'react';
import { FlatList, View, Text, ScrollView, StyleSheet } from 'react-native';

import Card from './Card';

interface Props {
    data: Data[];
    update: (item: any) => void;
    delete: (key: string) => void;
    deleteButton: boolean[];
    updateCloseButton: (status: boolean, key: number) => void;
}

interface Data {
    key: string
    title: string;
    description: string;
    isFinished: boolean;
}

const Cards:React.FC<Props> = (props) => {
    return (
        <View style={ styles.CardsStyle }>
                <FlatList
                    data={props.data}
                    extraData={props}
                    renderItem={(data) => (<Card data={data.item} update={ props.update } delete={ props.delete } deleteButton={ props.deleteButton[data.index]} updateCloseButton={ props.updateCloseButton} index={ data.index }/>)}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    CardsStyle: {
        backgroundColor: "white",
        elevation: 1,
        borderRadius: 15,
        height: "88%",
        top: 10,
        paddingVertical: 10
    }
})

export default Cards;