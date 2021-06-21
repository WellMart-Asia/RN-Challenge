import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';
import TodoContext from '../contexts/TodoContext';

interface TodoItemProps{
  id: string,
  name: string,
  completed: boolean,
}

export default function TodoListItem(props: TodoItemProps) {  
  const [isModalVisible, setModalVisible] = useState(false);
  const [editedTodoItem, setEditedTodoItem] = useState(props.name);
  const {onToggle, onRemove, onEdit} = useContext(TodoContext);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const todoInputHandler = (newTodo: React.SetStateAction<string>) => {
    setEditedTodoItem(newTodo);
  };
  
  const strikedTextOrNot = () => {
    if(props.completed)
       return <Text style={[styles.text, styles.strikeText]}>
          {props.name}
        </Text>;
    else{
      return <Text style={[styles.text, styles.unstrikeText]}>
          {props.name}
        </Text>;
    }
  }

  const checkedOrNot = () => {
    if(props.completed)
       return <View style={styles.completeCircle}>
            <Icon name="checkcircle" size={20} color="#2f95dc" /> 
          </View>;
    else{
      return <View style={styles.circle}>
        </View>;
    }
  }

  return (
    <View style={styles.container}>

      <TouchableOpacity onPressOut={onToggle(props.id)}>
        {checkedOrNot()}
      </TouchableOpacity>

      {strikedTextOrNot()}

      <TouchableOpacity style={styles.buttonContainer} onPress={toggleModal}>
        <Text style={styles.buttons}>
          <Icon name="edit" size={20} color="#ccc" />
        </Text>
      </TouchableOpacity>

      <Modal 
        isVisible={isModalVisible}
        onBackdropPress={() => {
            setModalVisible(false);
            return null;
          }}>
        <View style={styles.card}>
          <View style={styles.buttonContainerModal}>
            <Text style={[styles.textModal, { color: 'black', fontWeight: 'bold' }]} >
              Edit a task
            </Text>
          </View>

          <View style={[styles.separator, { width: '100%', backgroundColor: '#bbb' }]} />

          <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder="Enter a new task name.."
                placeholderTextColor={'#999'}
                onChangeText={todoInputHandler}
                value={editedTodoItem}
                autoCorrect={false}
            />
            <View style={styles.buttons}>
              <TouchableOpacity style={styles.buttonContainer} onPress={onRemove(props.id)}>
                <Text style={styles.buttons}>
                  <Icon name="delete" size={20} color="#e33057" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.separator} />

          <TouchableOpacity 
            style={styles.buttonContainerModal}
            onPressIn={onEdit(props.id, editedTodoItem)} 
            onPressOut={toggleModal}>
            <Text style={styles.textModal}>
              Save changes
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  text: {
    flex: 5,
    fontWeight: '500',
    fontSize: 14,
    marginVertical: 20,
    width: 100,
  },
  textModal:{
    flexDirection: 'row',
    fontSize: 16,
    color:'#2f95dc'
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 15,
    borderColor: '#2f95dc',
    borderWidth: 2,
    marginRight: 15,
    marginLeft: 0,
  },
  completeCircle: {
    marginRight: 15,
  },
  strikeText: {
    color: '#bbb',
    textDecorationLine: 'line-through',
  },
  unstrikeText: {
    color: '#29323c',
  },
  buttons: {
    flexDirection: 'row',
  },
  buttonContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  buttonContainerModal: {
    marginVertical: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
  },
  card: {
    flexDirection:'column',
    alignItems:'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 35
  },
  input: {
    flex: 1,
    padding: 10,
    borderBottomColor: '#bbb',
    borderBottomWidth: 1,
    fontSize: 14,
  },
  separator: {
    height: 1,
    width: '95%',
    backgroundColor: '#eee',
  },
});