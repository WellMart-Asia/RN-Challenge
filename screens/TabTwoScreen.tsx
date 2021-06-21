// import React, { useState, useEffect } from 'react';
// import { Button, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';
// import Modal from 'react-native-modal';

// import EditScreenInfo from '../components/EditScreenInfo';
// import { Text, View } from '../components/Themed';
// import Icon from 'react-native-vector-icons/AntDesign';

// const STORAGE_KEY = 'user';

// export default function TabTwoScreen() {
//   const [isModalVisible, setModalVisible] = useState(false);
//   const [user, setUser] = useState<any | null>(null);
//   const { getItem, setItem } = useAsyncStorage('user');

//   const toggleModal = () => {
//     setModalVisible(!isModalVisible);
//   };

//   const userNameInputHandler = (userName: React.SetStateAction<string>) => {
//     writeItemToStorage(userName);
//   };

//   const readItemFromStorage = async () => {
//     const item = await getItem();
//     setUser(item);
//   };

//   const writeItemToStorage = async (newValue: any) => {
//     await setItem(newValue);
//     setUser(newValue);
//   };

//   useEffect(() => {
//     readItemFromStorage();
//   }, []);
  
//   const emptyOrNot = () => {
//     if(user !== null){
      
//     } else {

//     }
//   };

//   console.log(user);
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Tab Two</Text>
//       <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
//       <EditScreenInfo path="/screens/TabTwoScreen.tsx" />

//       <Modal 
//         isVisible={isModalVisible}
//         onBackdropPress={() => {
//             setModalVisible(false);
//             return null;
//           }}>
//         <View style={styles.card}>
//           <View style={styles.buttonContainerModal}>
//             <Text style={[styles.textModal, { color: 'black', fontWeight: 'bold' }]} >
//               Edit a task
//             </Text>
//           </View>

//           <View style={[styles.separator, { width: '100%', backgroundColor: '#bbb' }]} />

//           <View style={styles.inputContainer}>
//             <TextInput
//                 style={styles.input}
//                 placeholder="Enter a new task name.."
//                 placeholderTextColor={'#999'}
//                 onChangeText={userNameInputHandler}
//                 value={user}
//                 autoCorrect={false}
//             />
//             <View style={styles.buttons}>
//               <TouchableOpacity style={styles.buttonContainer} onPress={onRemove(props.id)}>
//                 <Text style={styles.buttons}>
//                   <Icon name="delete" size={20} color="#e33057" />
//                 </Text>
//               </TouchableOpacity>
//             </View>
//           </View>

//           <View style={styles.separator} />

//           <TouchableOpacity 
//             style={styles.buttonContainerModal}
//             onPressIn={onEdit(props.id, editedTodoItem)} 
//             onPressOut={toggleModal}>
//             <Text style={styles.textModal}>
//               Save changes
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   separator: {
//     marginVertical: 30,
//     height: 1,
//     width: '80%',
//   },
//   textModal:{
//     flexDirection: 'row',
//     fontSize: 16,
//     color:'#2f95dc'
//   },
//   buttonContainerModal: {
//     marginVertical: 20,
//     marginHorizontal: 20,
//     alignItems: 'center',
//     flexDirection: 'row',
//   },
//   card: {
//     flexDirection:'column',
//     alignItems:'center',
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     marginLeft: 10,
//     marginRight: 10,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingVertical: 35
//   },
//   input: {
//     flex: 1,
//     padding: 10,
//     borderBottomColor: '#bbb',
//     borderBottomWidth: 1,
//     fontSize: 14,
//   },
//   buttons: {
//     flexDirection: 'row',
//   },
//   buttonContainer: {
//     marginVertical: 10,
//     marginHorizontal: 10,
//     alignItems: 'center',
//   },
// });
