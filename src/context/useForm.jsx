import { createContext, useContext, useState } from "react";

const formContext = createContext()

export function FormProvider(props) {
    const [form, setForm] = useState()
    const [isValid, setIsValid] = useState()

    function campoValido(nome, estado) {
        setForm((value) => {
            const obj = { ...value, [nome]: estado }
            validarFormulario(obj)
            return obj
        })

    }

    function validarFormulario(formAtual) {
        const formValid = Object.entries(formAtual).every(([key, value]) => !!value)
        setIsValid(formValid)
    }

    return (
        <formContext.Provider value={{ campoValido, isValid, form }}>
            {props.children}
        </formContext.Provider>
    )
}

export function useForm() {
    const context = useContext(formContext);
    return context
}