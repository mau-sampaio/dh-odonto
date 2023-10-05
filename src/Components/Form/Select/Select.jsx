import { useState } from "react";
import { useForm } from "../../../context/useForm";


const Select = (props) => {
    const [erro, setErro] = useState();
    const { campoValido } = useForm();

    const handleErrors = (event) => {
        console.log(event)
        if (props.onChange) {
            props.onChange(event)
        }
        setErro()
        const value = event.target.value;
        if (!value) {
            setErro("Selecione uma opção.")
        }
        if (campoValido) {
            campoValido(props.name, !!value)
        }
    }

    return <div className={`input-group has-validation`}>
        <select {...props} onChange={handleErrors}
            className={`form-control ${props.className} ${erro ? 'is-invalid' : ''}`} >
            {props.children}
        </select>
        <div className="invalid-feedback">
            {erro}
        </div>
    </div >
}

export default Select;