import { useState } from "react";
import { useTheme } from "../../context/useTheme";
import styles from "./Form.module.css"
import { removeLocalStorage } from "../../context/localStorage";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import Input from "../Form/Input/Input";
import { useForm } from "../../context/useForm";

const LoginForm = () => {
  const { theme } = useTheme()
  const { logar } = useAuth()
  const [login, setLogin] = useState(null)
  const [password, setPassword] = useState(null)
  const navigate = useNavigate()
  const { isValid } = useForm()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await logar(login, password)
      alert("Login realizado com sucesso")
      navigate('/home')
    } catch {
      alert("Login ou senha incorreto! Verifique suas informações novamente")
      removeLocalStorage('token')
    }
  };

  return (
    <>
      <div
        className={`text-center card container ${theme}  ${styles.card}`}
      >
        <div className={`card-body ${styles.CardBody}`}>
          <form onSubmit={handleSubmit}>
            <Input
              onChange={(e) => setLogin(e.target.value)}
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Login"
              name="login"
              data-testid="input-login"
              required
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              className={`form-control ${styles.inputSpacing}`}
              placeholder="Password"
              name="password"
              type="password"
              data-testid="input-password"
              required
            />
            <button
              className="btn btn-primary"
              type="submit"
              data-testid="btn-login"
              disabled={!isValid}>
              Enviar
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
