import {View, Text, StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Pressable} from 'react-native';
import { SafeAreaView  } from 'react-native-safe-area-context';
import {TextInput } from 'react-native-paper';
import { useState } from 'react';
import { SystemBars} from 'react-native-edge-to-edge';
import { router } from 'expo-router';
import { useTasks } from '../../contexts/taskContexts';



export default function App(){
  const { task, setTask, tasks, setSelectedTask } = useTasks();


  const addTask = ( ) => {
    const trimmed = task.trim();

    if (trimmed.length > 0)
    {
      setTask("");
      setSelectedTask(trimmed);
      router.push({
        pathname: '/focusTime',
      })
    
    }
  }


  return(
    <SafeAreaView style={styles.container}>

      <SystemBars style="light"/>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder = "What would you like to focus ..."
          mode = {"outlined"}
          label = "Focus"
          style = {styles.InputText} 
          value = {task}
          onChangeText = {(text)=> setTask(text)}

        />

        <TouchableOpacity style={styles.fabButton} onPress={() => {
          addTask();
        }}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.focusedTasks}>
        <Text style={styles.focusTitle}>  Things we've focused on: </Text>
        <ImageBackground style={styles.taskBackground} source= { require('../../../assets/images/TaskScrollBackground.png')} resizeMode='cover'>
          <ScrollView style={{padding: 20}} contentContainerStyle={{gap: 10, marginTop: 0}}>
            {tasks.map((text, index) => (
              <Pressable key={index} onPress={() => {changeScreen(); setSelectedTask(text);}} >
                <Text key={index} style={styles.taskText}>- {text}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </ImageBackground>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#2d056d'
  },
  inputContainer:{
    flexDirection: 'row',
    padding: 20,
  },
  InputText:{
    flex: 1,
  },
  fabButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'white',
    marginLeft: 10,
  },
  fabText:{
    fontSize: 20,
    color: 'white',
  },
  focusedTasks:{
    marginTop: 20,
    padding: 10,
    flex: 1,
  },
  focusTitle:{
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 10,
    color : 'white'
  },
  taskText: {
    fontWeight: 'bold',
    fontSize: 20, 
    color: 'white',
    padding: 10,
  },
  taskBackground:{
    flex: 1,
    resizeMode: 'cover',
    overflow: 'hidden',
    borderRadius: 20,
    marginTop: 10

  }
})