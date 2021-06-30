import React, {FC, useState, useEffect} from "react";
import { View, Text, StyleSheet, Alert, Dimensions } from "react-native";
import { Button } from "../components/Index";
import firebase from "firebase";
import Input from "../components/input";
import { PostRender } from "../components/Index";
import { FlatList } from "react-native-gesture-handler";

const App : FC = (props) =>{
    const [msg, setMsg] = useState<string | null>(null);
    const [user, setUser] = useState<any>(null);
    const [posts, setPosts] = useState<any>([]);


    const post = async () => {
        if(msg){
            const data = {
                msg,
                timeStamp: Date.now(),
                approved: false
            }

            try{
                await firebase.firestore().collection('posts').add(data);
            } catch (err){
                console.log(err);
            }

        } else {
            Alert.alert('Missing Fields')
        }
    }

    const signOut = async () => {
        await firebase.auth().signOut().then(() => {
            Alert.alert('Are u sure to log out?');
        });
    }

    const fetchCurrentUser = async () =>{
        const uid = firebase.auth().currentUser.id;
        const user = await firebase.firestore().collection('users').doc(uid).get();
        setUser({id: user.id, ...user.data()})
    }

    const fetchPosts = async () => {
        firebase.firestore().collection('posts').where('approved', '==', false).onSnapshot(querySnapShot => {
            const documents = querySnapShot.docs;
            setPosts(documents)
        })
    }

    useEffect(() => {
        fetchCurrentUser();
        fetchPosts()
    }, [])

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Input To Do List : </Text>
            <View style={{flex: 0.5, marginTop: 50}}>
                { posts.length > 0 ?(
                        <FlatList data={posts} renderItem={({item}) => <PostRender msg={item.data().msg} approved={item.data().approved}/>}/>
                ): (
                    <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}> 
                        <Text>Nothing to display</Text>
                    </View>
                )}
            </View>
            <View>
                <Input placeholder="Write Your To Do List Here" onChangeText={(text) => setMsg(text)}></Input>
            </View>
             <View>
                        <Button title="Post" onPress={post}/>
                        <Button title="Dashboard" onPress={() => props.navigation.navigate('dashboard')}/>
                        <Button title="Sign Out" onPress={signOut}/>
             </View>
        </View>
    )
}

export default App;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop : 40
      }
})