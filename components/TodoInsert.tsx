import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View, Alert, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface TodoInsertProps {
  onAddTodo: (text: string) => void
}

export default function TodoInsert(props: TodoInsertProps) {
    const [newTodoItem, setNewTodoItem] = useState('');

    const todoInputHandler = (newTodo: React.SetStateAction<string>) => {
        setNewTodoItem(newTodo);
    };
    
    const addTodoHandler = () => {
        props.onAddTodo(newTodoItem);
        setNewTodoItem('');
    };

    return (
        <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              placeholder="Create a new task.."
              placeholderTextColor={'#999'}
              onChangeText={todoInputHandler}
              value={newTodoItem}
              autoCorrect={false}
          />
          <View style={styles.button}>
            <TouchableOpacity onPress={addTodoHandler}>
              <Text style={styles.buttons}>
                <Icon name="pluscircleo" size={25} color="#2f95dc" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    padding: 5,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 14,
    marginLeft: 25,
  },
  button: {
    marginRight: 25,
    marginLeft: 10
  },
  buttons: {
    flexDirection: 'row',
  },
});