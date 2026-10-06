import { useState } from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
    const [usuario, setUsuario] = useState(
        JSON.parse(localStorage.getItem("usuarioLogueado"))
    );

    const cerrarSesion = () => {
        localStorage.removeItem("usuarioLogueado");
        setUsuario(null);
    };

    return (
        <nav className="navbar">

            <div className="navbar-contenido">

                <Link to="/" className="navbar-logo">
                    GameUp
                </Link>

                <div className="navbar-links">

                    <Link to="/">
                        Inicio
                    </Link>

                    <Link to="/catalogo">
                        Catálogo
                    </Link>

                    <Link to="/biblioteca">
                        Biblioteca
                    </Link>

                    <Link to="/contacto">
                        Contacto
                    </Link>

                    {usuario ? (
                        <div className="navbar-usuario-contenedor">

                            <span className="navbar-usuario">
                                {usuario.nombre}
                            </span>

                            <button
                                className="navbar-logout"
                                onClick={cerrarSesion}
                            >
                                Cerrar sesión
                            </button>

                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="navbar-login"
                        >
                            Iniciar sesión
                        </Link>
                    )}

                </div>

            </div>

        </nav>
    );
}

export default Navbar;