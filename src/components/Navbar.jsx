import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-contenido">
                <Link to="/" className="navbar-logo">
                    GameUp
                </Link>

                <div className="navbar-links">
                    <Link to="/">Inicio</Link>
                    <Link to="/catalogo">Catálogo</Link>
                    <Link to="/biblioteca">Biblioteca</Link>
                    <Link to="/contacto">Contacto</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;