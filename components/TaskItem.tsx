import React from 'react'
import { StyleSheet, Image, TouchableOpacity } from 'react-native'
import { View, Text } from './Themed'


type MyProps = {
    TaskTitle: string;
    TaskTime: string;
    TaskDescription:string;
    TaskIsDone: boolean;
    onEdit(): void;
    onRemove(): void;
    markAsDone(): void
}
class TaskItem extends React.Component<MyProps> {
    constructor(props:any){
        super(props)
        this.state={}
    }
    render(){
        return (
            <TouchableOpacity style={styles.taskItemContainer}>
                <View style={styles.taskItemContent}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.taskName}>{this.props.TaskTitle}</Text>
                        <Text style={this.props.TaskIsDone ? styles.taskComplete : styles.taskIncomplete}>{this.props.TaskIsDone ? 'Completed' : 'Incompleted'}</Text>
                    </View>
                    <Text style={styles.taskTime}>{this.props.TaskTime}</Text>
                    <Text style={styles.taskDescription}>{this.props.TaskDescription}</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity  onPress={this.props.onEdit} style={{flexDirection: 'row'}}>
                            <Image source={require('../assets/images/edit-logo.svg')} style={{marginTop: 4,width: 20, height: 20, }}/>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={this.props.onRemove} style={{flexDirection: 'row', marginLeft: 5}}>
                            <Image source={require('../assets/images/trash-logo.svg')} style={{marginTop: 4,width: 20, height: 20, }}/>
                        </TouchableOpacity>
                        <TouchableOpacity  onPress={this.props.markAsDone} style={{flexDirection: 'row', marginLeft: 5}}>
                            <Text style={{color: '#CE1EC7', marginTop: 5}}>Mark as done</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    taskItemContainer: {
        borderRadius: 5,
        minHeight: 130,
        marginVertical: 5,
        borderWidth: 0.5,
    },
    taskItemContent: {
        marginHorizontal: 15,
        marginVertical: 10
    },
    taskName: {
        fontSize: 20
    },
    taskTime: {
        fontSize: 13
    }, 
    taskDescription: {
        fontSize: 15
    },
    taskComplete: {
        color: 'green',
        marginTop: 5,
        marginLeft: 10
    },
    taskIncomplete: {
        color: 'red',
        marginTop: 5,
        marginLeft: 10
    }
})

export default TaskItem