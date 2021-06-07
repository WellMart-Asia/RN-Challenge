import React, { createContext, useState } from 'react'
import { AuthContextData, AuthData } from '../types'

import firebase from 'firebase'

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({children}) => {
    const [authData, setAuthData] = useState<AuthData>()
    var firebaseConfig = {
        apiKey: "AIzaSyCHBQERYLwWXV7c0WNunTB0YTo1El05bfI",
        authDomain: "to-do-app-65492.firebaseapp.com",
        projectId: "to-do-app-65492",
        storageBucket: "to-do-app-65492.appspot.com",
        messagingSenderId: "1097336026558",
        appId: "1:1097336026558:web:bca4589b04ebf920fa35ef",
        measurementId: "G-SE0HYTMSNB"
      };
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
      }else {
          firebase.app(); // if already initialized, use that one
      }
      
    const db = firebase.firestore()
    // const dbInit = () => {
    //     return db
    // }
    const signIn = async (email:string, password:string) => {
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            db.collection('users').doc(user?.uid).get().then((doc) => {
                const data: firebase.firestore.DocumentData | undefined = doc.data()
                if (doc.exists && data) {
                    console.log("Document data:", doc.data()); 
                    setAuthData({uid: user?.uid, email: user?.email, displayName: data.name})
                }else {
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            })
            // console.log(user + '--' + email + '--' + password)
            
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
        });
    }

    const register = async (email:string,password:string,name:string) => {
        firebase.auth().createUserWithEmailAndPassword( email, password)
        .then((userCredential) => {
            // Signed in 
            var user = userCredential.user;
            if (user) {
                db.collection('users').doc(user?.uid).set({
                    name: name,
                    email: user.email,
                }).then(() => {
                    console.log('success to write doccument')
                }).catch((error) => {
                    console.log(error)
                })
            }
            
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorMessage)
            // ..
        });
    }

    const signOut = async () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
            console.log('Sign out success')
            setAuthData(undefined)
          }).catch((error) => {
            // An error happened.
            console.log('Sign out error')
          });
    }

    return (
        //This component will be used to encapsulate the whole App,
        //so all components will have access to the Context
        <AuthContext.Provider value={{authData, signIn, signOut, register}}>
          {children}
        </AuthContext.Provider>
      );
}
