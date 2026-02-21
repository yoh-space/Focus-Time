import { useState } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import { SafeAreaView  } from 'react-native-safe-area-context';
import {TextInput } from 'react-native-paper';
import FocusTime from './components/FocusTime';


export default function App(){

  const [addTask, setAddTask] = useState(false);
  const [focusTask, setFocusTask] = useState("");

  const handleAddTask = () => {
    setAddTask(prev => !prev);
  }

  if(addTask){
    return <FocusTime focusTask={focusTask} onBack={handleAddTask} />
  }
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder = "What would you like to focus ..."
          mode = "outlined"
          label = "focuses"
          value= {focusTask}
          onChangeText = {setFocusTask}
          style = {styles.InputText}  
        />
        <TouchableOpacity style={styles.fabButton} onPress={handleAddTask}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.focusedTasks}>
        <Text style={styles.focusTitle}>  Things we've focused on: </Text>
        
        <View style={{padding: 20}}>
          <Text style={{ fontSize: 18 , color: 'white', fontWeight: 'semi-bold'}}> 1, Learn react native </Text>
          <Text style={{ fontSize: 18 , color: 'white', fontWeight: 'semi-bold'}}> 2, Learn JS basics </Text>
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
  }

})