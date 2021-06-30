import React, {FC, useState} from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Input from "../components/input";
import { Button } from "../components/Index";
import firebase from "firebase";


const App : FC = (props) =>{
    const [email, setEmail] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);

    const login = async() => {
        if(email && password){
            const {user} = await firebase.auth().signInWithEmailAndPassword(email,password);
        } else {
            Alert.alert('Missing Fields')
        }
    }


    return(
        <View style={styles.container}>
            <Text style={styles.title}>Login Screen</Text>
            <Input placeholder="Email" onChangeText={(text) => setEmail(text)}/>
            <Input placeholder="Password" secureTextEntry onChangeText={(text) => setPassword(text)}/>
            <Button title="Login" onPress={login} />

            <View style={styles.loginText}>
            <Text style={{marginHorizontal: 5}}>Haven't an account yet?</Text>
                <TouchableOpacity onPress={() => props.navigation.navigate('signup')} style={{marginHorizontal: 5}}>
                    <Text style={{color: '#0000FF'}}>SignUp here</Text>
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