import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

import "./Navbar.css";

function Navbar() {
    const [usuario, setUsuario] = useState(() => {
        try {
            const usuarioGuardado = localStorage.getItem("usuarioLogueado");

            return usuarioGuardado
                ? JSON.parse(usuarioGuardado)
                : null;
        } catch (error) {
            localStorage.removeItem("usuarioLogueado");
            return null;
        }
    });

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

                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "activo" : ""
                        }
                    >
                        Inicio
                    </NavLink>

                    <NavLink
                        to="/catalogo"
                        className={({ isActive }) =>
                            isActive ? "activo" : ""
                        }
                    >
                        Catálogo
                    </NavLink>

                    <NavLink
                        to="/biblioteca"
                        className={({ isActive }) =>
                            isActive ? "activo" : ""
                        }
                    >
                        Biblioteca
                    </NavLink>

                    <NavLink
                        to="/contacto"
                        className={({ isActive }) =>
                            isActive ? "activo" : ""
                        }
                    >
                        Contacto
                    </NavLink>

                    {usuario ? (
                        <div className="navbar-usuario-contenedor">

                            <span className="navbar-usuario">
                                {usuario.nombre}
                            </span>

                            <button
                                type="button"
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