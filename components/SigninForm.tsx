import React, { useState } from 'react';
import { View } from 'react-native';
import Firebase from 'firebase';
import Button from './Button';
import LabeledTextInput from './LabelledTextInput';

const signIn = (
  email: string,
  password: string,
  setUserCredential: React.Dispatch<React.SetStateAction<Firebase.auth.UserCredential | null>>,
  setError: React.Dispatch<React.SetStateAction<any>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsLoading(true);

  Firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      setUserCredential(userCredential);
    })
    .catch((reason) => {
      setError(reason);
    })
    .finally(() => {
      setIsLoading(false);
    });
};

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userCredential, setUserCredential] = useState<null | Firebase.auth.UserCredential>(null);
  const [error, setError] = useState(null);

  return (
    <View>
      <LabeledTextInput
        label="E-mail"
        placeholder="Enter your e-mail"
        value={email}
        onChangeText={setEmail}
      />
      <LabeledTextInput
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {
        isLoading ? null
          : (
            <Button
              onPress={_ => signIn(
                email,
                password,
                setUserCredential,
                setError,
                setIsLoading
              )}
            >
              {'Sign In '}
            </Button>
          )
      }
    </View>
  );
};
