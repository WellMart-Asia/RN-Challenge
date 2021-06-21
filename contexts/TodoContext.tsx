import React, { useReducer } from 'react';
import { TodoContextParamList } from '../types';

interface ProviderProps {
    children: React.ReactNode;
};

const TodoContext = React.createContext<Partial<TodoContextParamList>>({});

function todoReducer(state: any, action: any){
    switch(action.type){
        case 'add':
            return [
                ...state,
                {
                    id: (state.length + 1).toString(), 
                    taskName: action.text, 
                    completedStatus: false, 
                    createdAt: new Date()
                },
            ];
        case 'remove':
            return state.filter((todo: any) => todo.id !== action.id);
        case 'toggle':
            return state.map( (todo: any) =>
                todo.id === action.id ? {...todo, completedStatus: !todo.completedStatus} : todo,
            );
        case 'edit':
            return state.map( (todo: any) =>
                todo.id === action.id ? {...todo, taskName: action.newName} : todo,
            );
        default:
            return state;
    }
};

export function TodoProvider(props: ProviderProps ){
    const [todos, dispatch] = useReducer(todoReducer, [] as any);

    const addTodo = (text: string) => {
        dispatch({ type: 'add', text: text});
        console.log(todos);
    };
  
    const onRemove = (id: string) => (e: any) => {
        dispatch({ type: 'remove', id: id});
    };
  
    const onToggle = (id: string) => (e: any) => {
        dispatch({ type: 'toggle', id: id });
    };
  
    const onEdit = (id: string, newName: string) => (e: any) => {
        dispatch({ type: 'edit', id: id, newName: newName});
    };

    return (
        <TodoContext.Provider value={{ data: todos, addTodo, onRemove, onToggle, onEdit}}>
            {props.children}
        </TodoContext.Provider>
    );
};

export default TodoContext;