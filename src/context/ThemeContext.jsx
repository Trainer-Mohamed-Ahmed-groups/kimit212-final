import React, { createContext, useState } from 'react'

export const ThemeContext = createContext()

export default function ThemeProvider({ children }) {

    const [themeColor, setThemeColor] = useState(localStorage.getItem('Theme')
        ? localStorage.getItem('Theme')
        : 'light')

    const handleTheme = () => {
        setThemeColor(themeColor === 'light' ? 'dark' : 'light')

        localStorage.setItem('Theme', themeColor === 'light' ? 'dark' : 'light')
    }

    return (
        <ThemeContext.Provider value={{ themeColor, handleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
