import { useState , useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FocusTime({ focusTask, onBack }) {
  const [isRunning, setIsRunning] = useState(false);
  const times = [600, 900, 1200]; 
  const [ selectedTime, setSelectedTime] = useState(null);

  const timeFromat = (times) => {
    const minutes = Math.floor(times / 60);
    const seconds = Math.floor(times % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  useEffect(() => {
    let interval = null;
    if(isRunning && selectedTime > 0){
        interval = setInterval(() => {
            setSelectedTime((prevTime) => prevTime - 1);
        }, 1000);
    } else if (!isRunning && selectedTime !== 0){
        clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, selectedTime])

  return(
    <SafeAreaView style={styles.container}>
        <Text style={styles.timerText}>
            {selectedTime ? timeFromat(selectedTime) : '0:00'}
        </Text>

        <Text style={styles.subTitle}> Focusing on : </Text>
        <Text style={styles.focusTask}>{focusTask}</Text>
        
        <View style={{height: 10, width: '100%', backgroundColor: '#241b9a', marginTop: 30, marginBottom: 20}}/> 

        <View style={styles.timeOptions}>
            {times.map((time, index) => (
                <TouchableOpacity key={index} style={styles.timeOptionsButton} onPress={() => setSelectedTime(time)}>
                    <Text style={styles.timeOptionsText}>{timeFromat(time)}</Text>
                </TouchableOpacity>
            ))}
        </View>   

        <TouchableOpacity style={styles.startFab} onPress={() => {setIsRunning(!isRunning)}}>
            <Text style={{color: 'white'}}>{isRunning ? 'Pause' : 'Start'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={{color: 'white'}}>Back</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#252250',
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
        marginTop: 50,
        height: 50,
        width: 100,
        borderRadius: 25,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    }    
})