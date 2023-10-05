import { createContext, useContext, useState } from "react";
import { getLocalStorage, removeLocalStorage, saveLocalStorage } from "./localStorage";
import { api } from "../services/axios";

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(getLocalStorage('token'))
    const [isLogged, setIsLogged] = useState(!!token)
    const logar = (login, password) => {
        return api.post('/auth', {
            username: login,
            password: password
        }).then(({ data }) => {
            saveLocalStorage('token', data.token);
            setToken(data.token);
            setIsLogged(true);
            return data
        }).catch((error) => {
            deslogar()
            throw new Error(error)
        })

    }
    const deslogar = () => {
        removeLocalStorage('token')
        setToken()
        setIsLogged(false)
    }
    return <AuthContext.Provider value={{ token, isLogged, logar, deslogar }}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    return context
}