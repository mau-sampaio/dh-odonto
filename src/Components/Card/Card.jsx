import { Link } from "react-router-dom";
import { useTheme } from "../../context/useTheme";
import styles from "./Card.module.css";

const Card = ({ nome, sobrenome, matricula, usuario }) => {

  const { theme } = useTheme()

  return (
    <Link to={`/dentista/${matricula}`}>
      <div className={`card ${theme}`}>
        <img
          className="card-img-top"
          src="/images/doctor.jpg"
          alt={`doctor ${nome}`}
        />
        <div className={`card-body ${styles.CardBody}`}>
          <h5 className={`card-title ${styles.title}`}>{nome} {sobrenome}</h5>
          <p>{usuario.username}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
