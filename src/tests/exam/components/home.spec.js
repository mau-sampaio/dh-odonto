import Home from "../../../Routes/Home"
import { render, screen, waitFor } from "../../test-utils"
import MockAdapter from "axios-mock-adapter"
import { api } from "../../../services/axios";

const mockAxios = new MockAdapter(api, { onNoMatch: "throwException" });

describe("Home", () => {
    test("Deve renderizar o componente corretamente.", async () => {
        mockAxios.onGet('/dentista').reply(200, [
            {
                nome: "Admin",
                sobrenome: "Admin",
                matricula: "a5352bb7-1f7e-488c-9cce-042df550a4f0",
                usuario: {
                    username: "dentistaAdmin"
                }
            }])
        render(<Home />)
        expect(screen.getByText('Home')).toBeInTheDocument();
        await waitFor(() => {
            expect(screen.getAllByTestId("card").length).toBe(1)
        })
    })

    test("Deve mostra uma mensagem se der erro ao carregar a lista de medicos.", async () => {
        mockAxios.onGet('/dentista').networkError()
        render(<Home />)
        expect(screen.getByText('Home')).toBeInTheDocument();
        expect(await screen.findByTestId("aviso")).toBeInTheDocument()
        expect(screen.queryByTestId("card")).toBeFalsy()
    })
})