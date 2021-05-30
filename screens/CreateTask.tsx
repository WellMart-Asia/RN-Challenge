import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { PageParamList } from '../types';
import firebase from '../firebase';

import Input from '../components/Input';
import ButtonComponent from '../components/Button';

interface state {
    title: string;
    description: string;
}

type Navigation = StackScreenProps<PageParamList, "CreateTask">

class CreateTask extends Component<Navigation, state>{
     constructor(props: any) {
        super(props);

        this.state = { 
            title: "",
            description: ""
        }
    }

    getTitle(text: string) {
        this.setState({ title: text });
    }

    getDescription(text: string) {
        this.setState({ description: text });
    }

    createData() {
        if(this.state.title) {
            firebase.database().ref("/task").push({ 
                title: this.state.title,
                description: this.state.description ? this.state.description : "",
                isFinished: false
            })
            this.props.navigation.navigate('Home');
        } else {
            alert("fill all columns!!!");
        }
    }

    render() {
        return (
            <View style={ styles.CreateTaskScreen }>
                <View style={ styles.TitleStyle }>
                    <Input placeholder="Title" effect={this.getTitle.bind(this)} />
                </View>
                <View style={ styles.DescriptionStyle }>
                    <Input placeholder="Description" effect={this.getDescription.bind(this)} />
                </View>
                <View>
                    <ButtonComponent onClick={ this.createData.bind(this) } title="Create" />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    CreateTaskScreen: {
        padding: 10
    },
    TitleStyle: {
        height: 50,
        elevation: 1,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 1
    },
    DescriptionStyle: {
        height: 100,
        elevation: 1,
        margin: 10,
        borderRadius: 15,
        backgroundColor: "white",
        paddingHorizontal: 10,
        paddingVertical: 1
    }
});

export default CreateTask;

