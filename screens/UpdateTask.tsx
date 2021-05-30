import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { PageParamList } from '../types';
import firebase from '../firebase';

import Input from '../components/Input';
import ButtonComponent from '../components/Button';

interface state {
    key: string;
    title: string;
    description: string;
    isFinished: boolean;
}

type Navigation = StackScreenProps<PageParamList, "UpdateTask">

class UpdateTask extends Component<Navigation, state>{
     constructor(props: any) {
        super(props);

        this.state = { 
            key: this.props.route.params?.data.key,
            title: this.props.route.params?.data.title,
            description: this.props.route.params?.data.description,
            isFinished: this.props.route.params?.data.isFinished
        }
    }

    getTitle(text: string) {
        this.setState({ title: text });
    }

    getDescription(text: string) {
        this.setState({ description: text });
    }

    // updateData() {
    //     if(this.state.title) {
    //         firebase.database().ref("/task").push({ 
    //             title: this.state.title,
    //             description: this.state.description ? this.state.description : "",
    //             isFinished: false
    //         })
    //         this.props.navigation.navigate('Home');
    //     } else {
    //         alert("fill all columns!!!");
    //     }
    // }

    updateData() {
        if(this.state.title) {
            firebase.database().ref('/task/' + this.state.key).set({
                title: this.state.title,
                description: this.state.description,
                isFinished: this.state.isFinished
            });
            this.props.navigation.navigate('Home');
        } else {
            alert("fill all columns!!!");
        }
    }

    render() {
        return (
            <View style={ styles.CreateTaskScreen }>
                <View style={ styles.TitleStyle }>
                    <Input placeholder="Title" effect={this.getTitle.bind(this)} value={this.state.title}/>
                </View>
                <View style={ styles.DescriptionStyle }>
                    <Input placeholder="Description" effect={this.getDescription.bind(this)} value={this.state.description}/>
                </View>
                <View>
                    <ButtonComponent onClick={ this.updateData.bind(this) } title="Update"/>
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

export default UpdateTask;

