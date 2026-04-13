import { useState , useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { SystemBars} from 'react-native-edge-to-edge';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from "expo-router";
import { useTasks } from "../../contexts/taskContexts";
import { useColors } from "../../contexts/colorContext";
export default function FocusTime() {

  const { colors } = useColors();
  const { setTasks, selectedTask} = useTasks();

  const focusTask = selectedTask;
  
  const [isRunning, setIsRunning] = useState(false);
  const times = [5, 900, 1200];
  const [selectedTime, setSelectedTime] = useState();

  const timeFromat = (times) => {
    const minutes = Math.floor(times / 60);
    const seconds = Math.floor(times % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  const showToast = () => {
    Toast.show({
        position: 'bottom',
        type: 'info',
        text1: `You have successfully focused on ${focusTask}`,
    })
  }

  useEffect(()=>{
    let intervalId;

    if(isRunning && selectedTime > 0){
        intervalId = setInterval(()=>{
            setSelectedTime(prev => prev - 1)
        },1000)          
    }

     if(!isRunning || selectedTime < 0) {
        clearInterval(intervalId);
    }
    
    else if(selectedTime === 0){ 
        showToast();
        setIsRunning(false);
        setTasks( prev =>[...prev, selectedTask]);

    }
    return () => clearInterval(intervalId);

  },[isRunning, selectedTime])


  return(
        <SafeAreaView style={[styles.container,{backgroundColor: colors.background}]} edges={['top']}>
            <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity style={[styles.backButton, {backgroundColor: colors.background}]} onPress={()=> { 
                router.back();
                setSelectedTime(null);
            }}>
                <Ionicons name="chevron-back" size={24} color={colors.textPrimary} />
                <Text style={{color: colors.textPrimary}}>Back</Text>
            </TouchableOpacity>      

            <Text style={[styles.timerText, {color: colors.textPrimary}]}>
                {selectedTime ? timeFromat(selectedTime) : '00:00'}
            </Text>
            <Text style={[styles.subTitle, {color: colors.textPrimary}]}> Focusing on : </Text>
            <Text style={[styles.focusTask, {color: colors.textPrimary}]}>{focusTask}</Text>
            
            <View style={{height: 10, width: '100%', backgroundColor: colors.surface, marginTop: 30, marginBottom: 20}}/> 

            <View style={[styles.timeOptions,{backgroundColor: colors.background}]}>
                {times.map((time, index) => (
                    <TouchableOpacity key={index} style={[styles.timeOptionsButton,{backgroundColor: colors.background}]} onPress={() => setSelectedTime(time)}>
                        <Text style={[styles.timeOptionsText,{color: colors.textPrimary}]}>{timeFromat(time)}</Text>
                    </TouchableOpacity>
                ))}
            </View>   

            <TouchableOpacity style={styles.startFab} onPress={() => {setIsRunning(!isRunning)}}>
                <Text style={{color: colors.textPrimary}}>{isRunning ? 'Stop' : 'Start'}</Text>
            </TouchableOpacity>
        </ScrollView>
    <Toast />

        </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    imageBackground:{
        flex: 1,
        alignItems: 'center',
    },
    timerText: {
        fontWeight: 'bold',
        fontSize: 60,
        color: 'white',
        marginTop: 50,
    },
    subTitle:{
        fontSize: 18,
        color: 'white',
        marginTop: 50,
    },
    focusTask: {
        fontSize: 30,
        color : 'white',
        marginTop: 20,
        fontWeight: 'bold',
    },
    timeOptions: {
        flexDirection: 'row',
        marginTop: 30,
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
    },
    timeOptionsButton: {
        height: 100,
        width: 100,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
    },
    timeOptionsText:{
        fontSize: 18,
        color: 'white',
    },
    startFab: {
        height: 80,
        width: 80,
        borderRadius: 40,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
    },
    backButton: {
        flexDirection : 'row',
        height: 40,
        width: 80,
        borderRadius: 25,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-start',
    }    
})