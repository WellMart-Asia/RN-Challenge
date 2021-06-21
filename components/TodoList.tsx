import React, {useState} from 'react';
import {StyleSheet, ScrollView, Text, FlatList} from 'react-native';
import TodoItem from './TodoItem';

interface TodoListProps{
    data: any,
}

export default function TodoList(props: TodoListProps) {
    console.log(props);
    return (
        <FlatList
            keyExtractor={(item) => item.id}
            data={props.data}
            renderItem={({item})=>{
                return <TodoItem 
                    id={item.id} 
                    name={item.taskName} 
                    completed={item.completedStatus} />
            }} />
    );
};

const styles = StyleSheet.create({
    listContainer: {
        alignItems: 'center',
    },
});