import React,{useState} from 'react';
import Todo from './Todo';
import TodoForm from './TodoForm';
import Checkbox from 'react-native';

function TodoList() {
    const [todos, setTodos]= useState([])
    
    const addTodo = todo =>{
        if(!todo.text || /^\s*$/.test(todo.text)){
            return;
        
        }
        const newTodos=[todo, ...todos];

        setTodos(newTodos);   
        console.log(...todos);
        };


    const removeTodo = id =>{
        const removedArr = [...todos].filter(todo => todo.id !== id)

        setTodos(removedArr)
    }

    const updateTodo = (todoId, newValue) => {
        if (!newValue.text || /^\s*$/.test(newValue.text)) {
          return;
        }
    
        setTodos(prev => prev.map(item => (item.id === todoId ? newValue : item)));
      };
    
    const completeTodo =id=>{
        let updatedTodos = todos.map(todo =>{
            if(todo.id===id){    
            todo.isComplete = !todo.isComplete
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    return (
        <>
            <h1>To-do List's</h1>
            <TodoForm onSubmit={addTodo}/>
            <Todo 
            todos={todos} 
            completeTodo ={completeTodo} 
            removeTodo={removeTodo} 
            updateTodo={updateTodo}/>
        </>
    );
}

export default TodoList;
