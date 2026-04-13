import {createContext , useContext , useState } from 'react'
import { darkStatusBar, lightStatusBar, darkTheme, lightTheme } from '../utils/colors';

const ColorContext = createContext();
 
export default function ColorProvider({children}) {
    const [isDark , setIsDark ] = useState(true);

    const toggleTheme = () => setIsDark(prev => !prev);
    const colors = isDark ? darkTheme : lightTheme;
    const statusBarStyle = isDark ? lightStatusBar : darkStatusBar;
    const value = {colors, statusBarStyle, toggleTheme, isDark};

    return (
        <ColorContext.Provider value={value}>
            {children}
        </ColorContext.Provider>
    )
}

export const useColors = () => {
    const context = useContext(ColorContext);

    if (!context) {
        throw new Error('useColors must be used within a ColorContext');
    }
    return context;
}
