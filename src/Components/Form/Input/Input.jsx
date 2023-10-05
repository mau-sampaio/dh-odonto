import { useState, useEffect } from "react";
import styles from "./input.module.css"
import { useForm } from "../../../context/useForm";


const Input = (props) => {
    const [erro, setErro] = useState();
    const { campoValido } = useForm();

    useEffect(() => {
        if (campoValido) {
            campoValido(props.name, false)
        }
    }, [])

    const handleErrors = (event) => {
        if (props.onChange) {
            props.onChange(event)
        }
        const value = event.target.value;
        let isValid = false
        setErro()
        if (props.type === "datetime-local") {
            if (!value) {
                setErro("Data inválida")
            } else if (new Date() > new Date(value)) {
                const date = new Date()
                setErro(`A data selecionada precisa ser maior que ${date.toLocaleString("default", { day: "2-digit" })}/${date.toLocaleString("default", { month: "2-digit" })}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()} `)
            } else {
                isValid = true
            }
        }
        else if (value === undefined || value === null) {
            setErro("O campo não pode ser vazio!")
        } else if (value.length <= 5) {
            setErro("O campo precisa ter mais que 5 caracteres.")
        } else {
            isValid = true
        }


        if (campoValido) {
            campoValido(props.name, isValid)
        }
    }

    return <div className={`input-group has-validation ${styles.input}`}>
        <input type="text" {...props} onChange={handleErrors}
            className={`form-control ${props.className} ${erro ? 'is-invalid' : ''}`} />
        <div className="invalid-feedback">
            {erro}
        </div>
    </div>
}

export default Input;