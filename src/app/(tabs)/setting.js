import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useColors } from '../../contexts/colorContext';
import { SystemBars} from 'react-native-edge-to-edge';
import { SafeAreaView  } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';


const Setting = () => {
    const { colors, toggleTheme, statusBarStyle, isDark} = useColors();
    return (
        <SafeAreaView style={[{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }]}>
            <SystemBars style={statusBarStyle}/>
            <Text style={{ fontSize: 20, color: colors.textPrimary }}>Setting Screen</Text>
            <View>
                <Pressable onPress={toggleTheme} style={{ marginTop: 20, padding: 10, backgroundColor: colors.primary, borderRadius: 5 }}>
                    <Text style={{ color: colors.onPrimary, fontSize: 16 }}>Change theme color</Text>
                    <Ionicons name={isDark ? 'moon' : 'sunny'} size={20} color={colors.onPrimary} style={{ marginLeft: 10 }} />
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default Setting;
