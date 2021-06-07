import firebase from 'firebase'
import React, { useEffect, useState, useContext } from 'react'
import { StyleSheet, Image, TouchableOpacity, Modal, TextInput, FlatList, ScrollView } from 'react-native'
import {  } from 'react-native-gesture-handler'
import Calendar from '../components/Calendar'
import TaskItem from '../components/TaskItem'
import { Text, View } from '../components/Themed'
import { AuthContext } from '../context/Auth'
import { PropsParam, ButtonParam} from '../types'


interface ITask {
    key:number | undefined;
    isDone:boolean | undefined;
    description:string | undefined;
    time:string | undefined;
    title:string | undefined;
}

export default function TabTaskScreen<Props>({}){
    const date = new Date()
    const[isAddTaskMode, setIsAddTaskMode] = useState(false)
    const[isEditTaskMode, setIsEditTaskMode] = useState(false)
    const[selectedTask, setSelectedTask] = useState<ITask>({key: 0, title: '', time: '', isDone: false, description: ''})
    const[taskList, setTaskList] = useState<any[]>([])
    const[nameTask, setNameTask] = useState('')
    const[timeTask, setTimeTask] = useState('')
    const[descriptionTask, setDescriptionTask] = useState('')
    const authContext = useContext(AuthContext)
    const [isFilterCompleted, setIsFilterCompleted] = useState(false)
    const [isFilterInCompleted, setIsFilterInCompleted] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    // const[taskList, settaskList] = useState<any[]>([
    //     {key: 1, isDone: false, description: 'Jl.peninggaran', time: '20:00', title:'My First Task'},
    //     {key: 2, isDone: true, description: 'Jl.peninggaran 2', time: '20:00', title:'My Second Task'},
    //     {key: 3, isDone: false, description: 'my head my mind if you dont think i cant its complicated no matter i only wanna do bad things to you do the same yeah. bad things to you. i want you forever', time: '20:00', title:'My Third Task'}
    // ])
    const db = firebase.firestore();
    
    const fetchTask = async () => {
        return db.collection('users').doc(authContext.authData?.uid).get()
    }
    const setTaskFirebase = (newTask:Array<object>) => {
        return db.collection('users').doc(authContext.authData?.uid).set(newTask)
    }
    useEffect(() => {
        const fetchTask = async () =>{
            try {
                const db = firebase.firestore();
                const ref = db.collection("users");

                const docs = await ref.doc(authContext.authData?.uid).get()
                const data: firebase.firestore.DocumentData | undefined = docs.data()
                if (docs.exists && data) {
                    if (data.tasks !== undefined) {
                        setTaskList(data.tasks)
                    }
                }
               

            } catch (error) {
                console.log("Error : " + error)
            }
        }
        fetchTask()
    })


    let name = authContext.authData?.displayName
    const FloatingButton : React.FC<ButtonParam> = ({style, onPress}) => (
        <TouchableOpacity style={style} onPress={onPress}>
            <Image source={require('../assets/images/add.svg')} style={{width: 30, height: 30, }}/>
        </TouchableOpacity>
    )   
    const AddTaskHandler = () => {
        setIsAddTaskMode(true)
    }
   
 
    const SubmitAddTaskHandler = () => {
        let key:number;
        if (taskList.length == 0) {
            key = 1
        }else {
            key = taskList[taskList.length - 1].key+1
        }
        
        const newTask = [...taskList, {key: key, title: nameTask, time: timeTask, description: descriptionTask, isDone: false}]
        db.collection('users').doc(authContext.authData?.uid).update({
            tasks: newTask
        }).then((docRef) => {
            console.log("Success to update")
        }).catch((error) => {
            console.log("error update")
        })
        setTaskList(newTask)
        setNameTask('')
        setTimeTask('')
        setDescriptionTask('')
        setIsAddTaskMode(false)
    }
    
    const FilterCompleted = () => {
        if (isFilterCompleted) {
            setIsFilterCompleted(false)
            setIsFilterInCompleted(false)
        }else {
            setIsFilterCompleted(true)
            setIsFilterInCompleted(false)
        }

    }

    const FilterInCompleted = () => {
        if (isFilterInCompleted) {
            setIsFilterCompleted(false)
            setIsFilterInCompleted(false)
        }else {
            setIsFilterCompleted(false)
            setIsFilterInCompleted(true)
        }

    }

    const EditTaskHandler = (key:number) => {
        const selected = taskList.filter(val => {
            return val.key === key
        })
        setSelectedTask(selected[0])
        setIsEditTaskMode(true)
    }

    const SubmitEditTaskHandler = () => {
        const key:number|undefined = selectedTask?.key
        const index = taskList.findIndex(val => val.key == key)
        if (key) {
            taskList[index] = selectedTask
        }
        db.collection('users').doc(authContext.authData?.uid).update({
            tasks: taskList
        }).then((docRef) => {
            console.log("Success to update")
        }).catch((error) => {
            console.log("error update")
        })
        console.log(selectedTask)
        setIsEditTaskMode(false)
    }
    
    const RemoveTaskHandler = (key:number) => {
        console.log(taskList)
        const index = taskList.findIndex(val => val.key == key)
        console.log(index)
        var array = [...taskList]; // make a separate copy of the array
        if (index !== -1) {
          array.splice(index, 1);
          console.log(array)
          setTaskList(array)
          console.log(taskList)
        }

       
        db.collection('users').doc(authContext.authData?.uid).update({
            tasks: array
        }).then((docRef) => {
            console.log("Success to update")
        }).catch((error) => {
            console.log("error update")
        })
    }

    const MarkAsDoneHandler = (key:number) => {
        const selected = taskList.filter(val => {
            return val.key === key
        })
        selected[0].isDone = true
        setSelectedTask(selected[0])
        db.collection('users').doc(authContext.authData?.uid).update({
            tasks: taskList
        }).then((docRef) => {
            console.log("Success to update")
        }).catch((error) => {
            console.log("error update")
        })
    }
    return (
            <View style={styles.container}>
            <Modal
             animationType="slide"
             transparent={true}
             visible={isAddTaskMode}
             style={styles.addTaskModal}
             onRequestClose={() => {
                 setIsAddTaskMode(false)
             }}
             >
                <View style={styles.addTaskModal}>
                    <Text style={styles.addTaskTitle}>Add New Task</Text>
                    <TextInput
                        onChangeText={nameTask => setNameTask(nameTask)}
                        defaultValue={nameTask}
                        placeholder='Task Name...'
                        style={styles.inputNameTask}
                    />
                    <TextInput
                        onChangeText={timeTask => setTimeTask(timeTask)}
                        defaultValue={timeTask}
                        placeholder='Task Time...'
                        style={styles.inputTimeTask}
                    />
                    <TextInput
                        onChangeText={descriptionTask => setDescriptionTask(descriptionTask)}
                        defaultValue={descriptionTask}
                        placeholder='Task Description...'
                        style={styles.inputDescriptionTask}
                    />
                    <TouchableOpacity onPress={SubmitAddTaskHandler} style={styles.btnAddTask}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Create Task</Text>
                    </TouchableOpacity>
                </View>   
            </Modal>  
            <Modal
             animationType="slide"
             transparent={true}
             visible={isEditTaskMode}
             style={styles.addTaskModal}
             onRequestClose={() => {
                 setIsEditTaskMode(false)
             }}
             >
                <View style={styles.addTaskModal}>
                    <Text style={styles.addTaskTitle}>Edit Task</Text>
                    <TextInput
                        onChangeText={titleTask => {
                            const prevTask = selectedTask
                            prevTask.title = titleTask
                            setSelectedTask(prevTask)
                        }}
                        defaultValue={selectedTask?.title}
                        placeholder='Task Name...'
                        style={styles.inputNameTask}
                    />
                    <TextInput
                        onChangeText={timeTask => {
                            const prevTask = selectedTask
                            prevTask.time = timeTask
                            setSelectedTask(prevTask)
                        }}
                        defaultValue={selectedTask?.time}
                        placeholder='Task Time...'
                        style={styles.inputTimeTask}
                    />
                    <TextInput
                        onChangeText={descriptionTask => {
                            const prevTask = selectedTask
                            prevTask.description = descriptionTask
                            setSelectedTask(prevTask)
                        }}
                        defaultValue={selectedTask?.description}
                        placeholder='Task Description...'
                        style={styles.inputDescriptionTask}
                    />
                    <TouchableOpacity onPress={SubmitEditTaskHandler} style={styles.btnAddTask}>
                        <Text style={{color: 'white', fontWeight: 'bold'}}>Edit Task</Text>
                    </TouchableOpacity>
                </View>   
            </Modal> 
            <ScrollView>
                <View style={styles.containerContent}>
                    <View style={styles.greetContainer}>
                        <Text style={styles.greetText}>Good Morning, {name}</Text>
                    </View>
                    <View style={styles.calendar}>    
                        <Calendar/> 
                    </View>
                    <Text style={styles.menuTitle}>Your Schedule's</Text>
                    <View style={styles.filterTask}>
                        <TouchableOpacity style={isFilterCompleted ?  styles.btnFilterCompletedActive : styles.btnCompleted} onPress={FilterCompleted}>
                            <Text>Completed</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={isFilterInCompleted ?  styles.btnFilterIncompletedActive : styles.btnIncompleted} onPress={FilterInCompleted}>
                            <Text>Incompleted</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.taskContainer}>
                        
                        <FlatList
                            data={isFilterCompleted ? taskList.filter(task => task.isDone === true) : isFilterInCompleted ? taskList.filter(task => task.isDone === false) : taskList}
                            keyExtractor={item => item.key}
                            renderItem={({item}) => (
                                <TaskItem
                                    TaskTitle={item.title}
                                    TaskTime={item.time}
                                    TaskDescription={item.description}
                                    TaskIsDone={item.isDone}
                                    onEdit={() => EditTaskHandler(item.key)}
                                    onRemove={() => RemoveTaskHandler(item.key)}
                                    markAsDone={() => MarkAsDoneHandler(item.key)}
                                />
                            )}
                        />
                    </View>
                </View>
                </ScrollView>                  
                    <FloatingButton style={styles.floatingButton} onPress={AddTaskHandler}/>    
                    <TouchableOpacity onPress={authContext.signOut} style={styles.signOut}> 
                        <Text style={styles.signOutText}>Logout</Text>
                    </TouchableOpacity>        
            </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerContent: {
        flex: 1,
        marginHorizontal: 15,
    }, 
    greetContainer: {
        marginTop: 20,
    },
    greetText : {
        fontSize: 23,
    },
    calendar : {
        marginVertical: 15,
    },
    taskContainer : {
        marginVertical: 15,
        minHeight: '1700'
    },  
    menuTitle: {
        marginVertical: 5,
        fontSize: 23,
    },
    floatingButton: {
        borderRadius: 80,
        backgroundColor: '#CE1EC7',
        position: 'absolute',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        right: 30,
        bottom: 40,
    },
    addTaskModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
    },
    addTaskTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    inputNameTask: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        height: 25,
        width: 250,
        padding: 15,
    },
    inputTimeTask: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        height: 25,
        width: 250,
        padding: 15,
        marginTop: 4,
    },
    inputDescriptionTask: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 8,
        height: 25,
        width: 250,
        padding: 15,
        marginTop: 4,
    },
    btnAddTask: {
        backgroundColor: '#FF78E9',
        textAlign: 'center',
        borderRadius: 10,
        padding: 8,
        marginTop: 6,
        width: 250
    },
    filterTask: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    btnCompleted: {
        alignItems: 'center',
        alignSelf: 'stretch',
        width: '45%',
        borderRadius: 6,
        padding: 7,
        backgroundColor: '#F5F5F5',
        marginHorizontal: 7,
    },
    btnIncompleted: {
        alignItems: 'center',
        alignSelf: 'stretch',
        width: '45%',
        borderRadius: 6,
        padding: 7,
        backgroundColor: '#F5F5F5',
        marginHorizontal: 7,
    },
    btnFilterCompletedActive: {
        alignItems: 'center',
        alignSelf: 'stretch',
        width: '45%',
        borderRadius: 6,
        padding: 7,
        backgroundColor: 'green',
        marginHorizontal: 7,
    },
    btnFilterIncompletedActive: {
        alignItems: 'center',
        alignSelf: 'stretch',
        width: '45%',
        borderRadius: 6,
        padding: 7,
        backgroundColor: 'red',
        marginHorizontal: 7,
    }, 
    signOut: {
        backgroundColor: '#CE1EC7',
        alignItems: 'center'
    },
    signOutText: {
        marginTop: 5,
        fontSize: 15,
        maxHeight: 30,
        color: 'white',
        fontWeight: 'bold'
    }
})

// export default TabTaskScreen