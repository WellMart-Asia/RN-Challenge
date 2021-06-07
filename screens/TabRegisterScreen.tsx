import React, { useState, useContext } from 'react'
import { TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import { View,Text } from '../components/Themed'
import Navigation from '../navigation'
import { PropsParam } from '../types'
import firebase from 'firebase'
import { AuthContext } from '../context/Auth'


export default function TabRegisterScreen<PropsParam>({navigation}: {navigation:any}){
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const authContext = useContext(AuthContext)

    const CreateAccount = () => {
        authContext.register(email,password, name)
        navigation.navigate('TabLogin')
    }
    return (
        <View style={styles.container}>
            <View style={{marginBottom: 10}}>
                <Image source={require('../assets/images/register-logo.svg')} style={{width: 220, height: 220, }}/>
            </View>
            <View style={styles.registerForm}>
            <TextInput
                onChangeText={name => setName(name)}
                defaultValue={name}
                placeholder='Name...'
                style={styles.nameInput}
            />
            <TextInput
                onChangeText={email => setEmail(email)}
                defaultValue={email}
                placeholder='Email...'
                style={styles.emailInput}
            />
            <TextInput
                onChangeText={password => setPassword(password)}
                defaultValue={password}
                placeholder='Password...'
                secureTextEntry={true}
                style={styles.passwordInput}
            />
            </View>
            <TouchableOpacity onPress={CreateAccount} style={styles.registerBtn}>
                <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}}>Create Account</Text>
            </TouchableOpacity>
            <View style={styles.login}>
                <Text>Already have an account? </Text>
                <Text style={styles.loginLink} onPress={() => navigation.navigate('TabLogin')}>Login</Text>
            </View>
        </View>
        
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    registerForm: {
        marginTop: 2
    },
    nameInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        height: 25,
        width: 250,
        padding: 20,
    },
    emailInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        height: 25,
        width: 250,
        padding: 20,
        marginTop: 4
    },
    passwordInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        height: 25,
        width: 250,
        padding: 20,
        marginTop: 4
    },
    registerBtn: {
        backgroundColor: '#FF78E9',
        textAlign: 'center',
        borderRadius: 15,
        padding: 11,
        marginTop: 6,
        width: 250
    },
    login: {
        flexDirection: 'row'
    },
    loginLink: {
        color: 'blue'
    } 
})