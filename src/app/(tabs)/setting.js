import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useColors } from '../../contexts/colorContext';
import { SystemBars} from 'react-native-edge-to-edge';
import { SafeAreaView  } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';


const Setting = () => {
    const { colors, toggleTheme, statusBarStyle, isDark} = useColors();
    return (
        <View style={[{ flex: 1, backgroundColor: colors.background }]}>
            <SystemBars style={statusBarStyle}/>
            <View style={[styles.header, { backgroundColor: colors.surface }]}>
                <Pressable onPress={toggleTheme} style={{backgroundColor: colors.surface, gap: 10, flexDirection: 'row', width: '100%', borderRadius: 5, marginBottom: 20 }}>
                    <Ionicons name={isDark ? 'moon' : 'sunny'} size={20} color={colors.primary} style={{ marginLeft: 10 }} />
                    <View>
                        <Text style={{ color: colors.textPrimary, fontSize: 16 }}>Appearance</Text>
                        <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Dark mode</Text>
                    </View>
                </Pressable>
                <Pressable onPress={()=>{}} style={{backgroundColor: colors.surface, gap: 10, flexDirection: 'row', width: '100%', borderRadius: 5 }}>
                    <Ionicons name={'notifications-outline'} size={20} color={colors.primary} style={{ marginLeft: 10 }} />
                    <View>
                        <Text style={{ color: colors.textPrimary, fontSize: 16 }}>Notifications</Text>
                        <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Manage Notifications</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header:{
        padding: 20,
        margin: 20,
        borderRadius: 10       
    }
})

export default Setting;
