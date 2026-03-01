import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { SafeAreaView  } from 'react-native-safe-area-context';
import {TextInput } from 'react-native-paper';
import { useState } from 'react';
import FocusTime from './components/FocusTime';

export default function App(){

  const [switchScreen , setSwitchScreen ] = useState(false);
  const [task , setTask ] = useState("");
  const [tasks, setTasks] = useState([]); 
  const [selectedTask, setSelectedTask] = useState("");


  const changeScreen = () => {
    setSwitchScreen(!switchScreen);
  }

  const addTask = ( ) => {
    const trimmed = task.trim();

    if (trimmed.length > 0)
    {
      setTasks( prev =>[...prev, trimmed]);
      setTask("");
      setSelectedTask(trimmed);

    }
  }

  if(switchScreen){
    return <FocusTime focusTask={selectedTask} onBack={changeScreen}/>
  }


  return(
    <SafeAreaView style={styles.container}>
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
          changeScreen();
        }}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.focusedTasks}>
        <Text style={styles.focusTitle}>  Things we've focused on: </Text>
        {tasks.map((task,index) => (
          <Text key={index} style={styles.taskText}>{task}</Text>
        ))}
        
        <View style={{padding: 20}}>

        </View>

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
  },
  focusTitle:{
    fontWeight: 'bold',
    fontSize: 22,
    marginLeft: 10,
    color : 'white'
  },
  taskText: {
    fontWeight: 'semi-bold',
    frontSize: 18, 
    color: 'white',
    padding: 10,
  }
})