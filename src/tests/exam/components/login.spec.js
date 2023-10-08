import { fireEvent, render, screen } from "../../test-utils"
import Login from "../../../Routes/Login"

describe("Login", () => {
    test("Deve renderizar o componente corretamente.", () => {
        render(<Login />)
        expect(screen.getByText('Login')).toBeInTheDocument();
        expect(screen.getByTestId('input-login')).toBeInTheDocument();
        expect(screen.getByTestId('input-password')).toBeInTheDocument();
        expect(screen.getByTestId('btn-login')).toBeInTheDocument();
    })

    test("Deve dar erro no campo \"Login\" se possuir menos que 5 caracteres", () => {
        render(<Login />)
        const input = screen.getByTestId('input-login');
        fireEvent.change(input, { target: { value: '1234' } })
        expect(input.value).toBe("1234")

        const msgErro = screen.getByTestId('input-login-erro');
        expect(msgErro).toBeInTheDocument()

        expect(input).toHaveClass('is-invalid')
        expect(screen.getByText("O campo precisa ter mais que 5 caracteres.")).toBeInTheDocument()
    })

    test("Deve dar erro se o campo \"Login\" se estiver vazio", () => {
        render(<Login />)
        const input = screen.getByTestId('input-login');
        fireEvent.change(input, { target: { value: 'a' } })
        fireEvent.change(input, { target: { value: '' } })
        expect(input.value).toBe('')

        const msgErro = screen.getByTestId('input-login-erro');
        expect(msgErro).toBeInTheDocument()

        expect(input).toHaveClass('is-invalid')
        expect(screen.getByText("O campo não pode ser vazio!")).toBeInTheDocument()
    })

    test("Deve dar erro no campo \"Password\" se possuir menos que 5 caracteres", () => {
        render(<Login />)
        const input = screen.getByTestId('input-password');
        fireEvent.change(input, { target: { value: '1234' } })
        expect(input.value).toBe("1234")

        const msgErro = screen.getByTestId('input-password-erro');
        expect(msgErro).toBeInTheDocument()

        expect(input).toHaveClass('is-invalid')
        expect(screen.getByText("O campo precisa ter mais que 5 caracteres.")).toBeInTheDocument()
    })

    test("Deve dar erro se o campo \"Password\" se estiver vazio", () => {
        render(<Login />)
        const input = screen.getByTestId('input-password');
        fireEvent.change(input, { target: { value: 'a' } })
        fireEvent.change(input, { target: { value: '' } })
        expect(input.value).toBe('')

        const msgErro = screen.getByTestId('input-password-erro');
        expect(msgErro).toBeInTheDocument()

        expect(input).toHaveClass('is-invalid')
        expect(screen.getByText("O campo não pode ser vazio!")).toBeInTheDocument()
    })

    test("Deve deixar o botão de \"Enviar\" desabilitado se um dos campos para logar estiver com erro.", () => {
        render(<Login />)
        const input = screen.getByTestId('input-login');
        fireEvent.change(input, { target: { value: '123' } })
        expect(input.value).toBe("123")

        const inputPass = screen.getByTestId('input-password');
        fireEvent.change(inputPass, { target: { value: '123456' } })
        expect(inputPass.value).toBe('123456')

        expect(screen.getByTestId("btn-login")).toBeDisabled()
    })

    test("Deve habilitar o botão de \"Enviar\" se os campos estiverem preenchido corretamente", () => {
        render(<Login />)
        const input = screen.getByTestId('input-login');
        fireEvent.change(input, { target: { value: '123456' } })
        expect(input.value).toBe("123456")

        const inputPass = screen.getByTestId('input-password');
        fireEvent.change(inputPass, { target: { value: '123456' } })
        expect(inputPass.value).toBe('123456')
        expect(screen.getByTestId("btn-login")).toBeEnabled()
    })
})