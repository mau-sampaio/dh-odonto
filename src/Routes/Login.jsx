import LoginForm from "../Components/Login/LoginForm";
import { FormProvider } from "../context/useForm";

const Login = () => {
  return (
    <>
      <h1>Login</h1>
      <FormProvider>
        <LoginForm />
      </FormProvider>

    </>
  );
};

export default Login;
