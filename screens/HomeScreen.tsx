import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { ITodoGroupByDate, useTodoContext } from '../contexts/TodoContext';
import { Text, TextThin, TextSemiBold, View } from '../components/Themed';
import Todos from '../components/homeScreen/Todos';
import useColorScheme from '../hooks/useColorScheme';
import Colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';

const HomeScreen = ({ navigation }: StackScreenProps<RootStackParamList, 'Home'>) => {
    const { todosGroupDate, todoStatus, category } = useTodoContext();
    let todayTodos: ITodoGroupByDate[] = [];
    todosGroupDate.filter(todo => todo.date == 'today').forEach(todo => todayTodos.push(todo));
    let todayTaskCount = todayTodos[0]?.todos.length;
    let textDetail = `${todayTaskCount}${todoStatus === 'All' ? '' : ` ${todoStatus}`}${category === 'All' ? '' : ` ${category}`}`
    const colorScheme = useColorScheme();

    return (
        <View style={styles.container}>
            {/* <SearchBar /> */}
            <TextSemiBold style={styles.helloText}>Hello, Nanda!</TextSemiBold>
            <TextThin style={styles.taskText}>You have <Text style={styles.taskCountText}>{todayTaskCount === 0 ? 'No' : textDetail} tasks</Text> today!</TextThin>
            <Todos />
            <TouchableOpacity style={{
                ...styles.addButton,
                backgroundColor: Colors[colorScheme].highlighDarker,
            }} onPress={() => navigation.push('AddTodo')}>
                <AntDesign name='plus' size={40} color={colorScheme == 'dark' ? 'white' : 'black'} />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingVertical: 40,
        flex: 1,
    },
    helloText: {
        fontSize: 30,
        letterSpacing: 1.5,
    },
    taskText: {
        marginTop: -5,
        // marginBottom: 10,
    },
    taskCountText: {
        color: '#64ffda'
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 70,
        height: 70,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 50,
        textAlign: 'center',
    }
});

export default HomeScreen;