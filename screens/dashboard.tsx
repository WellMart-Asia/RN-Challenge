import React, {FC, Props, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ApprovalRender, Button } from "../components/Index";
import firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";


const App : FC <Props> = (props) =>{
    const [posts, setPosts] = useState<any>(null);

    const fetchPendingPost = async () => {
        firebase.firestore().collection('posts').where('approved', '==', false).onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setPosts(documents)
        })
    }

    const onApprove = async (id: string) =>{
        const post = await firebase.firestore().collection('posts').doc(id).get();
        post.ref.set({approved: true}, {merge: true});
    }

    const onChange = async (id: string) => {
        const post = await firebase.firestore().collection('posts').doc(id).get();
        post.ref.set({approved: false}, {merge: true});
        post.ref.set({msg: props.msg2}, {merge: true});
    }

    const onReject = async (id: string) =>{
        await firebase.firestore().collection('posts').doc(id).delete();
    }

    useEffect(() => {
        fetchPendingPost();
    }, [])

    return(
        <View style={styles.container}>
            <Text style={styles.title}>To Do List</Text>
            <View style={{height: '70%'}}>
            <FlatList data={posts} renderItem={({item}) => <ApprovalRender msg={item.data().msg} msg2={item.data().msg2} approved={item.data().approved} onApprove={() => onApprove(item.id)} onReject={() => onReject(item.id)} onChanged={() => onChange(item.id)}/>}/>
            </View>
            <Button title="Done" onPress={() => props.navigation.navigate('done')}/>
            <Button title="Back" onPress={() => props.navigation.goBack()}/>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop : 40
      }
})