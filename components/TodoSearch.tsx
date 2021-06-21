import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Alert, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

interface TodoSearchProps {
    onSetKeywords: (taskName: string) => void
}

export default function TodoSearch(props: TodoSearchProps) {
    const [taskNameToSearch, setTaskNameToSearch] = useState('');

    const todoInputHandler = (taskName: React.SetStateAction<string>) => {
        setTaskNameToSearch(taskName);
        props.onSetKeywords(taskName.toString());
    };

    return (
        <View style={styles.inputContainer}>
            <View style={styles.logo}>
                <Text style={styles.logos}>
                    <Icon name="search1" size={25} color="#2f95dc" />
                </Text>
            </View>
            <TextInput
                style={styles.input}
                placeholder="Enter a task name to search for.."
                placeholderTextColor={'#999'}
                onChangeText={todoInputHandler}
                value={taskNameToSearch}
                autoCorrect={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25
  },
  input: {
    flex: 1,
    padding: 5,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 14,
    marginLeft: 5,
  },
  logo: {
    marginRight: 10
  },
  logos: {
    flexDirection: 'row',
  },
});