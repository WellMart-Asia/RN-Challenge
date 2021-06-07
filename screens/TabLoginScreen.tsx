import React, { useEffect, useState, useContext } from 'react'
import { TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import { View,Text } from '../components/Themed'
import Navigation from '../navigation'
import { PropsParam } from '../types'
import firebase from 'firebase'
import { AuthContext } from '../context/Auth'


export default function TabLoginScreen<PropsParam>({navigation}:{navigation:any}){
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    const authContext = useContext(AuthContext)
    
    return (
        <View style={styles.container}>
            <View style={{marginBottom: 10}}>
                <Image source={require('../assets/images/login-logo.svg')} style={{width: 220, height: 220, }}/>
            </View>
            <View style={styles.loginForm}>
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
                style={styles.passwordInput}
                secureTextEntry={true}
            />
            </View>
            <TouchableOpacity onPress={() => authContext.signIn(email,password)} style={styles.loginBtn}>
                <Text style={{fontSize: 15, color: 'white', fontWeight: 'bold'}}>Login</Text>
            </TouchableOpacity>
            <View style={styles.register}>
                <Text>Don't have an account? </Text>
                <Text style={styles.registerLink} onPress={() => navigation.navigate('TabRegister')}>Register</Text>
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
    loginForm: {
        marginTop: 2
    },
    emailInput: {
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 15,
        height: 25,
        width: 250,
        padding: 20,
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
    loginBtn: {
        backgroundColor: '#FF78E9',
        textAlign: 'center',
        borderRadius: 15,
        padding: 11,
        marginTop: 6,
        width: 250
    },
    register: {
        flexDirection: 'row'
    },
    registerLink: {
        color: 'blue'
    } 
})