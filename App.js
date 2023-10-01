import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { StyleSheet, Text, View ,FlatList} from 'react-native';
import { initializeApp, getApps } from "firebase/app";
//import {getFirestore, setDoc, doc} from 'firebase/firestore';
import { getFirestore, setDoc, doc, collection, onSnapshot, addDoc } from 'firebase/firestore';
import {Appbar, Button, TextInput} from 'react-native-paper';
import TodoComponent from './src/Todocomponent';

  // Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCdSo7PKS5sJaC_mgt07yRpJRyGjPrfLQI",
    authDomain: "todo-b2c1b.firebaseapp.com",
    projectId: "todo-b2c1b",
    storageBucket: "todo-b2c1b.appspot.com",
    messagingSenderId: "36544773586",
    appId: "1:36544773586:web:503763a9ec6da5a41e1c0b"
  };
if(!getApps().length){
  initializeApp(firebaseConfig);
}
const firestore = getFirestore();

export default function App() {

  const [Todo,settodo] = React.useState('');
  const [loading,setLoading]=React.useState(true);
  const [todos,settodos] = React.useState([]);
  
  
  // const addtodo =async()=>{
  //   await setDoc(doc(firestore, "todos","Thing"),{
  //     title: Todo,
  //     complet:false,
  //   });
  const addtodo = async () => {
    const todoCollection = collection(firestore, "todos");
    await addDoc(todoCollection, {
      title: Todo,
      complet: false,
    });
  }


  React.useEffect(() => {
    //return ref.onSnapshot(querySnapshot => {
      const unsubscribe = onSnapshot(collection(firestore, "todos"), querySnapshot => {
        const list = [];
        querySnapshot.forEach(doc => {
          const { title, complete } = doc.data();
          list.push({
            id:doc.id,
            title,
            complete,
          });
      });

      settodos(list);
      setLoading(false);
      // if (loading) {
      //   setLoading(false);
      // }
    });
    return()=> unsubscribe();
  });
  if(loading){
    return null;
  }

  return (
    <View style={{flex:1}}>
    <Appbar>
      <Appbar.Content title={'TODOs List'} />
    </Appbar>
    {/* <ScrollView style={{flex: 1}}>
      <Text>List of TODOs!</Text>
    </ScrollView> */}
    <FlatList 
        style={{flex: 1}}
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TodoComponent {...item} />}
      />
    <TextInput label={'New Todo'} value={Todo} onChangeText={(text) => settodo(text)} />
    <Button onPress={addtodo}>Add To Do</Button>
  </View>

  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
