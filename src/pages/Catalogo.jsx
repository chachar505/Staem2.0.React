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
                <p>COLECCIÓN</p>

                <h1>
                    Catálogo de videojuegos
                </h1>

                <span>
                    Explora nuestra colección de videojuegos.
                </span>
            </div>

            <div className="catalogo-grid">

                {videojuegos.map((videojuego) => (

                    <article
                        className="juego-card"
                        key={videojuego.id}
                    >

                        <Link
                            to={`/videojuego/${videojuego.id}`}
                            className="juego-imagen-link"
                        >

                            <div className="juego-imagen">

                                <img
                                    src={videojuego.imagen}
                                    alt={videojuego.nombre}
                                />

                            </div>

                        </Link>

                        <div className="juego-contenido">

                            <h2>
                                {videojuego.nombre}
                            </h2>

                            <div className="juego-datos">

                                <p>
                                    <strong>Género</strong>
                                    <span>{videojuego.genero}</span>
                                </p>

                                <p>
                                    <strong>Plataforma</strong>
                                    <span>{videojuego.plataforma}</span>
                                </p>

                                <p>
                                    <strong>Año</strong>
                                    <span>{videojuego.anio}</span>
                                </p>

                            </div>

                            <span className="juego-estado">
                                {videojuego.estado}
                            </span>

                            <div className="juego-botones">

                                <Link
                                    to={`/videojuego/${videojuego.id}`}
                                    className="juego-detalles"
                                >
                                    Ver detalles
                                </Link>

                                <button
                                    className="juego-agregar"
                                    onClick={() => agregarJuego(videojuego)}
                                >
                                    Agregar a mi biblioteca
                                </button>

                            </div>

                        </div>

                    </article>

                ))}

            </div>

        </main>
    );
}

export default Catalogo;