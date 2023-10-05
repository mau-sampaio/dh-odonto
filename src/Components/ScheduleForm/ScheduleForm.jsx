import { useEffect, useRef, useState } from "react";
import styles from "./ScheduleForm.module.css";
import { useTheme } from "../../context/useTheme";
import { api } from "../../services/axios";
import { useAuth } from "../../context/useAuth";
import Input from "../Form/Input/Input";
import { useForm } from "../../context/useForm";
import Select from "../Form/Select/Select";
import { useNavigate } from "react-router-dom";


const ScheduleForm = () => {
  const { theme } = useTheme()
  const [dentistas, setDentistas] = useState([])
  const [pacientes, setPacientes] = useState([])
  const [campoDentista, setCampoDentista] = useState()
  const [campoPaciente, setCampoPaciente] = useState()
  const [campoHorario, setCampoHorario] = useState()
  const { token } = useAuth()
  const closeBtn = useRef(null)
  const { isValid } = useForm()
  const navigate = useNavigate()

  const getDentistas = async () => {
    const { data } = await api.get('/dentista')
    setDentistas(data)
  }

  const getPacientes = async () => {
    const { data } = await api.get('/paciente')
    setPacientes(data.body)
  }

  useEffect(() => {
    getDentistas()
    getPacientes()
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault()
    const dadosConsulta = {
      paciente: pacientes.find((value) => value.matricula === campoPaciente),
      dentista: dentistas.find((value) => value.matricula === campoDentista),
      dataHoraAgendamento: campoHorario
    }
    try {
      await api.post("/consulta", dadosConsulta, { headers: { Authorization: `Bearer ${token}` } })
      alert("Consulta agendada")
      closeBtn.current.click()
      navigate("/home")
    } catch (error) {
      alert("Erro ao agendar consulta")
    }
  };

  return (
    <>
      <div
        className={`text-center container ${theme === "dark" ? styles.cardDark : ""} `
        }
      >
        <form onSubmit={handleSubmit}>
          <div className={`row align-items-start ${styles.rowSpacing}`}>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="dentist" className="form-label">
                Dentista
              </label>
              <Select
                onChange={(event) => setCampoDentista(event.target.value)}
                className="form-select" name="dentist" id="dentist">
                <option value="" >Selecione</option>
                {dentistas.map((dentista) => {
                  return <option key={dentista.matricula} value={dentista.matricula}>
                    {`${dentista.nome} ${dentista.sobrenome}`}
                  </option>
                })}
              </Select>
            </div>
            <div className="col-sm-12 col-lg-6">
              <label htmlFor="patient" className="form-label">
                Paciente
              </label>
              <Select
                onChange={(event) => setCampoPaciente(event.target.value)}
                className="form-select" name="patient" id="patient">
                <option value="">Selecione</option>
                {pacientes.map((paciente) => {
                  return <option key={paciente.matricula} value={paciente.matricula}>
                    {`${paciente.nome} ${paciente.sobrenome}`}
                  </option>
                })}
              </Select>
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <div className="col-12">
              <label htmlFor="appointmentDate" className="form-label">
                Data
              </label>
              <Input
                onChange={(event) => setCampoHorario(event.target.value)}
                className="form-control"
                id="appointmentDate"
                name="appointmentDate"
                type="datetime-local"
              />
            </div>
          </div>
          <div className={`row ${styles.rowSpacing}`}>
            <button
              className={`btn btn-${theme}`}
              type="submit"
              disabled={!isValid}
            >
              Agendar
            </button>
          </div>
        </form>
        <button data-bs-dismiss="modal" hidden ref={closeBtn}>
        </button>
      </div>
    </>
  );
};

export default ScheduleForm;
