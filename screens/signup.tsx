import React, {FC, useEffect, useState} from "react";
import { View, Text, StyleSheet, TextPropTypes, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "../components/Index";
import Input from "../components/input";
import firebase from "firebase";

const App : FC = (props) =>{
    const [name, setName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const signup = async() => {
        if(name && email && password){
            try{
                const {user} = await firebase.auth().createUserWithEmailAndPassword(email, password)
                if(user){
                    await firebase.firestore().collection('users').doc(user.uid).set({name, email, password});
                }

            }catch(error){
                console.log(error)
            }
        }
        else{
            Alert.alert('Error', 'Missing field');
        }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up Screen</Text>
            <Input placeholder="Name" onChangeText={(text) => setName(text)}/>
            <Input placeholder="Email" onChangeText={(text) => setEmail(text)}/>
            <Input placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)}/>
            <Button title="Sign Up" onPress={signup} />
            <View>
                <Text style={{marginHorizontal: 5}}>Already have an account?</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('login')} style={{marginHorizontal: 5}}>
                    <Text style={{color: '#0000FF'}}>Login Here</Text>
                </TouchableOpacity>
            </View>
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
    loginText:{
        flexDirection: 'row',
        marginVertical: 20
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop : 40
      }
})