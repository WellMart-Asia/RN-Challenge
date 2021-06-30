import React from 'react';
import './constants/firebase'
import { View, Text, StyleSheet } from 'react-native';
import MainNav from './navigation/mainNav';


export default function App(){
  return (
    <MainNav/>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})










// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
// import {View, Text, StyleSheet} from 'react-native';

// import useCachedResources from './hooks/useCachedResources';
// import useColorScheme from './hooks/useColorScheme';
// import Navigation from './navigation';

// export default function App() {
//   const isLoadingComplete = useCachedResources();
//   const colorScheme = useColorScheme();

//   if (!isLoadingComplete) {
//     return null;
//   } else {
//     return (
//       <SafeAreaProvider>
//         <Navigation colorScheme={colorScheme} />                                     
//         <StatusBar />
//       </SafeAreaProvider>
//     );
//   }
// }


// const styles = StyleSheet.create({
//   container: {
//     flex : 1,
//     justifyContent: 'center',
//     alignItems : 'center'
//   }
// })