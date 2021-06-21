import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View, Alert, TouchableOpacity, Text} from 'react-native';
import SegmentedControlTab from 'react-native-segmented-control-tab';


interface TodoFilterProps {
    onSetFilterCode: (code: number) => void
}

export default function TodoFilter(props: TodoFilterProps) {
    const [newTodoItem, setNewTodoItem] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(0);

    const todoInputHandler = (newTodo: React.SetStateAction<string>) => {
        setNewTodoItem(newTodo);
    };

    const handleIndexChange = (index: number) => {
        setSelectedIndex(index);
        props.onSetFilterCode(index);
    };

    return (
        <View style={styles.container}>
            <SegmentedControlTab
                values={["All", "To do", "Completed"]}
                selectedIndex={selectedIndex}
                onTabPress={handleIndexChange}
                borderRadius={10}
                tabStyle={{borderColor: '#2f95dc'}}
                tabTextStyle={{color: '#2f95dc'}}
                activeTabStyle={{backgroundColor: '#2f95dc'}}
            />
            <TextInput
                style={styles.input}
                placeholder="Search some today task.."
                placeholderTextColor={'#999'}
                onChangeText={todoInputHandler}
                value={newTodoItem}
                autoCorrect={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10
  },
  input: {
    flex: 1,
    padding: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 18,
    marginLeft: 25,
  },
  button: {
    marginRight: 25,
    marginLeft: 10
  },
  buttons: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
});