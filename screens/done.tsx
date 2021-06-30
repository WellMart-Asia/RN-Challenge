import React, {FC, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ApprovalRender, Button } from "../components/Index";
import firebase from "firebase";
import { PostRender } from "../components/Index";
import { FlatList } from "react-native-gesture-handler";

const App : FC = (props) =>{
    const [posts, setPosts] = useState<any>([]);

    const fetchPendingPost = async () => {
        firebase.firestore().collection('posts').where('approved', '==', true).onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setPosts(documents)
        })
    }


    useEffect(() => {
        fetchPendingPost();
    }, [])

    return(
        <View style={styles.container}>
            <Text style={styles.title}>DONE TO DO LIST</Text>
            <View style={{flex: 0.5, marginTop: 50}}>
                { posts.length > 0 ?(
                        <FlatList data={posts} renderItem={({item}) => <PostRender msg={item.data().msg} approved={item.data().approved}/>}/>
                ): (
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}> 
                        <Text>Nothing to display</Text>
                    </View>
                )}
            </View>

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
        paddingTop : 10
      }
})