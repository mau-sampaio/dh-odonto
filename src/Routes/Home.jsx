import { useEffect, useState } from "react";
import Card from "../Components/Card/Card";
import { api } from "../services/axios";

const Home = () => {
  const [dentistas, setDentistas] = useState([])

  const getDentistas = async () => {
    const { data } = await api.get('/dentista')
    setDentistas(data)
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
    </>
  );
};

export default Home;
