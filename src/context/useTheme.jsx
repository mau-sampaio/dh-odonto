import { createContext, useContext, useState } from "react";
import { getLocalStorage, saveLocalStorage } from "./localStorage";

const themeContext = createContext()

export function ThemeProvider(props) {
    const [theme, setTheme] = useState(getLocalStorage('theme') ?? 'light')

    function trocarTema(novoTema) {
        if (novoTema === theme) {
            return
        }
        setTheme(novoTema)
        saveLocalStorage('theme', novoTema)
    }

    return (<themeContext.Provider value={{ theme, trocarTema }} >
        {props.children}
    </themeContext.Provider>
    )
}

export function useTheme() {
    const context = useContext(themeContext);
    return context
}
