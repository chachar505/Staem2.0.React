import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Registro() {
    const navigate = useNavigate();

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");

    const crearCuenta = (e) => {
        e.preventDefault();

        if (
            nombre.trim() === "" ||
            correo.trim() === "" ||
            contrasena.trim() === ""
        ) {
            setError("Completa todos los campos.");
            return;
        }

        const usuario = {
            nombre: nombre,
            correo: correo,
            contrasena: contrasena
        };

        localStorage.setItem(
            "usuarioRegistrado",
            JSON.stringify(usuario)
        );

        navigate("/login");
    };

    return (
        <main className="container py-5">

            <div className="mx-auto" style={{ maxWidth: "500px" }}>

                <h1 className="mb-3">
                    Crear una cuenta
                </h1>

                <p className="text-muted mb-4">
                    Regístrate para comenzar a utilizar GameUp.
                </p>

                <form onSubmit={crearCuenta}>

                    <div className="mb-3">
                        <label className="form-label">
                            Nombre
                        </label>

                        <input
                            type="text"
                            className="form-control"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Ingresa tu nombre"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Correo electrónico
                        </label>

                        <input
                            type="email"
                            className="form-control"
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            placeholder="ejemplo@correo.com"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">
                            Contraseña
                        </label>

                        <input
                            type="password"
                            className="form-control"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            placeholder="Ingresa una contraseña"
                        />
                    </div>

                    {error && (
                        <p className="text-danger">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Crear cuenta
                    </button>

                </form>

                <div className="mt-4">
                    <span>
                        ¿Ya tienes una cuenta?{" "}
                    </span>

                    <Link to="/login">
                        Iniciar sesión
                    </Link>
                </div>

            </div>

        </main>
    );
}

export default Registro;