import { useEffect, useState } from "react";
import Card from "../Components/Card/Card";
import { api } from "../services/axios";

const Home = () => {
  const [dentistas, setDentistas] = useState([])
  const [aviso, setAviso] = useState("")

  const getDentistas = async () => {
    try {
      const { data } = await api.get('/dentista')
      setDentistas(data)
    } catch {
      setAviso("Não foi possivel carregar a lista. Tente novamente!")
    }
  }

  useEffect(() => {
    getDentistas()
  }, []);

  return (
    <>
      <h1>Home</h1>
      <div className="card-grid container">
        {dentistas.map((dentista) => {
          return <Card key={dentista.matricula}
            {...dentista} />
        })}
      </div>
      {aviso && <div data-testid="aviso">
        {aviso}
      </div>}
    </>
  );
};

export default Home;
