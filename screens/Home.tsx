import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { PageParamList } from '../types';
import firebase from '../firebase';

import SearchInput from '../components/SearchInput';
import Cards from '../components/Cards';
import Floating from '../components/Floating';

interface state {
    task: any[],
    deleteButton: boolean[],
    completeFilter: boolean, 
    incompleteFilter: boolean
}

type Navigation = StackScreenProps<PageParamList, "Home">

class Home extends Component<Navigation, state> {
    constructor(props: any) {
        super(props);

        this.state = {
            task: [],
            deleteButton: [],
            completeFilter: false,
            incompleteFilter: false
        }

        this.updateCloseButton = this.updateCloseButton.bind(this);
        this.getSearchInput = this.getSearchInput.bind(this);
    }

    componentDidMount() {
        this.readData(this.state.task);
    }

    resetDeleteButton = () => {
        let deleteButton: any = [];
        for(let i = 0; i < Object.keys(this.state.task).length; i++) {
            deleteButton.push(false);
        }
        this.setState({deleteButton: deleteButton});
    }

    updateCloseButton(status: boolean, key: number) {
        let array: boolean[] = this.state.deleteButton;
        array[key] = status;
        this.setState({deleteButton: array});
    }

    readData(currentData: any[]) {
        let data = firebase.database().ref('/task');
        data.on('value', snapshot => { 
            if(JSON.stringify(snapshot.val()) !== "null") {
                let obj = snapshot.val();
                let arr: any[] = [];

                for(var i in obj) {
                    arr.push({
                        key: i,
                        title: obj[i].title,
                        description: obj[i].description,
                        isFinished: obj[i].isFinished
                    })
                }

                let set: boolean = false;

                if(([...currentData].length !== [...arr].length)) {
                    this.setState({ task: [...arr] });
                    return true;
                } else {
                    for(let i = 0; i < [...currentData].length; i++) {
                        for(let item = 0; item < Object.keys(currentData[i]).length; item++) {
                            if(currentData[i][item] !== [...arr][i][item]) {
                                set = true;
                                break;
                            }
                        }
                        if(set) {
                            break;
                        }
                    }
                }

                if(set) {
                    this.setState({ task: [...arr] });
                }
            } else {
                this.setState({task: []})
            }
        })
    }

    readDataFilter() {
        let data = firebase.database().ref('/task');
        data.orderByChild("isFinished").equalTo(!this.state.completeFilter || this.state.incompleteFilter).once('value', snapshot => { 
            if(JSON.stringify(snapshot.val()) !== "null") {
                let obj = snapshot.val();
                let arr: any[] = [];

                for(var i in obj) {
                    arr.push({
                        key: i,
                        title: obj[i].title,
                        description: obj[i].description,
                        isFinished: obj[i].isFinished
                    })
                }
                this.setState({task: arr})
            } else {
                this.setState({task: []})
            }
        })
    }

    readDataSearch(text: string) {
        let data = firebase.database().ref('/task');
        data.orderByChild("title").startAt(text).endAt(text + "\uf8ff").once('value', snapshot => { 
            if(JSON.stringify(snapshot.val()) !== "null") {
                let obj = snapshot.val();
                let arr: any[] = [];

                for(var i in obj) {
                    arr.push({
                        key: i,
                        title: obj[i].title,
                        description: obj[i].description,
                        isFinished: obj[i].isFinished
                    })
                }
                this.setState({task: arr})
            } else {
                this.setState({task: []})
            }
        })
    }

    updateData(data: any) {
        firebase.database().ref('/task/' + data.key).set({
            title: data.title,
            description: data.description,
            isFinished: data.isFinished
        });
    }

    deleteData(key: string) {
        firebase.database().ref('/task/' + key).remove();
    }

    getSearchInput(data: string) {
        this.readDataSearch(data);
    }

    render() {
        return (
            <View style={ styles.HomeScreen } onStartShouldSetResponderCapture={() => { this.resetDeleteButton(); return false }}>
                <SearchInput effect={this.getSearchInput} />
                <View style={ styles.FilterContainerStyle }>
                    <TouchableOpacity 
                        style={ [styles.FilterStyle, this.state.completeFilter ? styles.green : styles.blank] }
                        onPress={() => {
                            this.setState({ completeFilter: !this.state.completeFilter, incompleteFilter: false });
                            if(!this.state.completeFilter) {
                                this.readDataFilter();
                            } else {
                                this.readData(this.state.task)
                            }
                        }}
                    >
                        <Text>complete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={ [styles.FilterStyle, this.state.incompleteFilter ? styles.green : styles.blank] }
                        onPress={() => {
                            this.setState({ incompleteFilter: !this.state.incompleteFilter, completeFilter: false });
                            if(!this.state.incompleteFilter) {
                                this.readDataFilter();
                            } else {
                                this.readData(this.state.task)
                            }
                        }}
                    >
                        <Text>incomplete</Text>
                    </TouchableOpacity>
                </View>
                <Cards data={this.state.task} update={ this.updateData } delete={ this.deleteData } deleteButton={this.state.deleteButton} updateCloseButton={this.updateCloseButton}/>
                <TouchableOpacity style={ styles.FloatingStyle } onPress={() => this.props.navigation.navigate('CreateTask')}>
                    <Floating />
                </TouchableOpacity>
            </View> 
        );
    }
}

const styles = StyleSheet.create({
    HomeScreen: {
        padding: 10
    },
    FloatingStyle: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: "pink",
        position: "absolute",
        bottom: 20,
        right: 20,
        elevation: 5
    },
    FilterContainerStyle: {
        flexDirection: "row"
    },
    FilterStyle: {
        flex: 1,
        marginTop: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 15,
        elevation: 1,
        marginHorizontal: 5,
        textTransform: 'capitalize'
    },
    green: {
        backgroundColor: "lime"
    },
    blank: {
        backgroundColor: "white",
    }
});

export default Home;