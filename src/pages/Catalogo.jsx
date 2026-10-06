import { Link } from "react-router-dom";
import { videojuegos } from "../data/videojuegos";
import { agregarBiblioteca } from "../biblioteca";

import "./Catalogo.css";

function Catalogo() {
    const agregarJuego = (videojuego) => {
        agregarBiblioteca(videojuego);
        alert(`${videojuego.nombre} fue agregado a tu biblioteca`);
    };

    return (
        <main className="catalogo-page">
            <div className="catalogo-encabezado">
                <h1>Catálogo de videojuegos</h1>

                <p>
                    Explora nuestra colección de videojuegos
                    y encuentra tu próximo juego favorito.
                </p>
            </div>

            <div className="catalogo-grid">
                {videojuegos.map((videojuego) => (
                    <div
                        className="catalogo-card"
                        key={videojuego.id}
                    >
                        <Link
                            to={`/videojuego/${videojuego.id}`}
                            className="catalogo-imagen-link"
                        >
                            <img
                                src={videojuego.imagen}
                                alt={videojuego.nombre}
                                className="catalogo-imagen"
                            />
                        </Link>

                        <div className="catalogo-contenido">
                            <h2>
                                {videojuego.nombre}
                            </h2>

                            <p>
                                <strong>Género:</strong>{" "}
                                {videojuego.genero}
                            </p>

                            <p>
                                <strong>Plataforma:</strong>{" "}
                                {videojuego.plataforma}
                            </p>

                            <p>
                                <strong>Año:</strong>{" "}
                                {videojuego.anio}
                            </p>

                            <span className="catalogo-estado">
                                {videojuego.estado}
                            </span>

                            <Link
                                to={`/videojuego/${videojuego.id}`}
                                className="boton-detalles"
                            >
                                Ver detalles
                            </Link>

                            <button
                                className="boton-biblioteca"
                                onClick={() =>
                                    agregarJuego(videojuego)
                                }
                            >
                                Agregar a mi biblioteca
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Catalogo;