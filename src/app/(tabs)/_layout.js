import {Tabs} from "expo-router";
import { Ionicons } from '@expo/vector-icons';
export default function Layout() {
    return(
        <Tabs screenOptions={{
            tabBarStyle:{
                backgroundColor: '#2d056d',
                setOffset: 0,
                borderTopWidth: 0,
            },  
            tabBarActiveTintColor: '#fff', 
            tabBarInactiveTintColor: '#007784',   
        }}>
            <Tabs.Screen name='index' options={{
                headerShown: false,
                tabBarIcon: () => <Ionicons name='home-outline' size={24} color='grey' />,}}/>
            <Tabs.Screen name='focusTime' options={{
                headerShown: false,
                tabBarIcon: () => <Ionicons name='timer-outline' size={24} color='grey' />,}}/>
            <Tabs.Screen name='setting' options={{
                headerShown: false,
                tabBarIcon: () => <Ionicons name='settings-outline' size={24} color='grey' />,
            }}/>
        </Tabs>
    )
}