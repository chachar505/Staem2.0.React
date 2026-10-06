import { useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";

function Login() {
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");

    const iniciarSesion = (e) => {
        e.preventDefault();

        const usuarioRegistrado = JSON.parse(
            localStorage.getItem("usuarioRegistrado")
        );

        if (!usuarioRegistrado) {
            setError("No existe una cuenta registrada.");
            return;
        }

        if (
            correo !== usuarioRegistrado.correo ||
            contrasena !== usuarioRegistrado.contrasena
        ) {
            setError("El correo o la contraseña son incorrectos.");
            return;
        }

        localStorage.setItem(
            "usuarioLogueado",
            JSON.stringify({
                nombre: usuarioRegistrado.nombre,
                correo: usuarioRegistrado.correo
            })
        );

        window.location.href = "/";
    };

    return (
        <main className="login-page">

            <div className="login-card">

                <div className="login-logo">
                    GameUp
                </div>

                <h1>
                    Iniciar sesión
                </h1>

                <p className="login-descripcion">
                    Ingresa a tu cuenta para acceder a tu biblioteca.
                </p>

                <form onSubmit={iniciarSesion}>

                    <div className="login-campo">
                        <label htmlFor="correo">
                            Correo electrónico
                        </label>

                        <input
                            id="correo"
                            type="email"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            placeholder="ejemplo@correo.com"
                        />
                    </div>

                    <div className="login-campo">
                        <label htmlFor="contrasena">
                            Contraseña
                        </label>

                        <input
                            id="contrasena"
                            type="password"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            placeholder="Ingresa tu contraseña"
                        />
                    </div>

                    {error && (
                        <p className="login-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="login-boton"
                    >
                        Iniciar sesión
                    </button>

                </form>

                <div className="login-registro">
                    <p>
                        ¿No tienes una cuenta?
                    </p>

                    <Link to="/registro">
                        Crear una cuenta
                    </Link>
                </div>

            </div>

        </main>
    );
}

export default Login;