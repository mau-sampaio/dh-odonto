import { Link } from "react-router-dom";
import { useTheme } from "../../context/useTheme";
import styles from "./Navbar.module.css";
import { useAuth } from "../../context/useAuth";

const Navbar = () => {
  const { theme, trocarTema } = useTheme()
  const { isLogged, deslogar } = useAuth()

  const handleLogout = () => {
    deslogar()
  }

  return (
    <header className="sticky-top">
      <nav
        className={`navbar navbar-expand-sm navbar-${theme} bg-${theme}`}
        aria-label="Third navbar example"
      >
        <div className="container">
          <Link className={`navbar-brand ${styles.navbarBrand}`} to="/home">
            DH Odonto
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample03"
            aria-controls="navbarsExample03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarsExample03"
          >
            <ul className="navbar-nav mb-2 mb-sm-0">
              <li className={`nav-item ${styles.navBarLink}`}>
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className={`nav-item ${styles.navBarLink}`}>

                {isLogged ?
                  <Link className={`nav-link btn-${theme} `} onClick={() => handleLogout()} to={'/login'}>
                    Logout
                  </Link> : <Link className={`nav-link btn-${theme} `} to="/login">
                    Login
                  </Link>}
              </li>
              <li className={`nav-item`}>
                <button
                  onClick={() => trocarTema(theme === 'light' ? 'dark' : 'light')}
                  className={`btn btn-${theme} ${styles.btnStyle
                    }`}
                >
                  {theme === 'dark' ? '☀' : '🌙'}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
