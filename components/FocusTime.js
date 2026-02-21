import {useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FocusTime( {focusTask, onBack} ){

    const [selectedTime, setSelectedTime] = useState(10);
    const times = [600, 900, 1200]

    const timeFormat = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        let interval = null;

        if (isRunning && selectedTime > 0) {
            interval = setInterval(() => {
                setSelectedTime(prev => prev - 1);
            }, 1000);
        }

        if (selectedTime === 0 && isRunning) {
            clearInterval(interval);
            setIsRunning(false);
            Alert.alert('Focus session ended', 'Great job on completing your focus time!');
        }

        return () => clearInterval(interval);
    }, [isRunning, selectedTime]);



    const handleStart = () => {
        setIsRunning(prev => !prev);
    }

    return(
        <SafeAreaView style={styles.container}>

            <View style={styles.timerCountDown}>
                <Text style={styles.timeText}>{timeFormat(selectedTime)}</Text>
            </View>

            <View style={styles.focusTitleContainer}>
                <Text style={styles.subTitle}>Focusing on:</Text>
            </View>
            <View style={styles.focusingTaskContainer}>
                <Text style={styles.focusTaskText}>{focusTask}</Text>
            </View>

            <View style={styles.divider}/>

            <View style={styles.timerButtonContainer}>
                {times.map((time) =>(
                   <TouchableOpacity key={time} onPress={() => setSelectedTime(time)} style={styles.timeBtn}>
                        <Text style={styles.timeButton}>{timeFormat(time)}</Text>
                        </TouchableOpacity>
                    ))}
            </View>

            <View style={styles.startBtnContainer}>
                <TouchableOpacity onPress={handleStart} style={styles.startFabBtn}>
                    <Text style= {styles.startText}>{isRunning ? 'Pause' : 'Start'}</Text>
                </TouchableOpacity>                
            </View>

            <View style={styles.backBtnContainer}>
                <TouchableOpacity onPress={onBack}>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
            </View>
          
        </SafeAreaView>
  
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,  
        backgroundColor: '#110553',  
    },
    timerCountDown:{
        marginTop: 30,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding : 20,
    },
    timeText:{
        color: 'white',
        fontSize: 60,
        fontWeight: 'bold',
    },
    focusTitleContainer:{
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    subTitle:{
        color: 'white',
        fontSize: 18,
        fontWeight: 'semi-bold',
    },
    focusingTaskContainer:{
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        padding : 20,
    },
    focusTaskText:{
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    divider:{
        marginTop: 20,
        height: 10,
        backgroundColor: '#20649c',
        marginVertical: 20,  
    },
    
    timerButtonContainer:{
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-evenly',
    },
    timeBtn:{
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'white',
        width: 80,
        height: 80,  
    }, 
    timeButton: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'semi-bold',
    },
    startBtnContainer:{
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    startFabBtn: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        width: 100,
        height: 100,
    },
    startText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'semi-bold',
    },
    backBtnContainer:{
        marginTop: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'semi-bold',
    }
});