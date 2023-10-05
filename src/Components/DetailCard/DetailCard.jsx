import { useEffect, useState } from "react";
import ScheduleFormModal from "../modal/ScheduleFormModal";
import styles from "./DetailCard.module.css";
import { useParams } from "react-router-dom";
import { useTheme } from "../../context/useTheme";
import { api } from "../../services/axios"
import { useAuth } from "../../context/useAuth";

const DetailCard = () => {

  const [denstista, setDentista] = useState([])
  const [user, setUser] = useState([])
  const params = useParams()
  const { theme } = useTheme()
  const { token } = useAuth()

  const getDentistaMatricula = async (id) => {
    const { data } = await api.get(`/dentista?matricula=${id}`)
    setDentista(data)
    setUser(data.usuario.username)
  }

  useEffect(() => {
    getDentistaMatricula(params.id)
  }, [params]);
  return (
    <>
      <h1>Detalhes sobre {denstista.nome} </h1>
      <section className="card col-sm-12 col-lg-6 container">
        <div
          className={`card-body row ${theme}`}
        >
          <div className="col-sm-12 col-lg-6">
            <img
              className="card-img-top"
              src="/images/doctor.jpg"
              alt="doctor placeholder"
            />
          </div>
          <div className="col-sm-12 col-lg-6">
            <ul className="list-group">
              <li className="list-group-item">Nome: {denstista.nome}</li>
              <li className="list-group-item">
                Sobrenome: {denstista.sobrenome}
              </li>
              <li className="list-group-item">
                Usuário: {user}
              </li>
            </ul>
            <div className="text-center">
              {!!token &&
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  className={`btn btn-${theme} ${styles.button}`}>
                  Marcar consulta
                </button>}
            </div>
          </div>
        </div>
      </section>
      <ScheduleFormModal />
    </>
  );
};

export default DetailCard;
