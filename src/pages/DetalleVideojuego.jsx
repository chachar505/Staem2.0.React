import { useParams, Link } from "react-router-dom";
import { videojuegos } from "../data/videojuegos";
import { agregarBiblioteca } from "../biblioteca";

import "./DetalleVideojuego.css";

function DetalleVideojuego() {
    const { id } = useParams();

    const videojuego = videojuegos.find(
        (juego) => juego.id === Number(id)
    );

    const agregarJuego = () => {
        agregarBiblioteca(videojuego);
        alert(`${videojuego.nombre} fue agregado a tu biblioteca`);
    };

    if (!videojuego) {
        return (
            <main className="detalle-page">
                <div className="detalle-no-encontrado">
                    <h1>
                        Videojuego no encontrado
                    </h1>

                    <Link to="/catalogo">
                        Volver al catálogo
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="detalle-page">
            <Link
                to="/catalogo"
                className="detalle-volver"
            >
                ← Volver al catálogo
            </Link>

            <section className="detalle-card">

                <div className="detalle-imagen">
                    <img
                        src={videojuego.imagen}
                        alt={videojuego.nombre}
                    />
                </div>

                <div className="detalle-info">

                    <p className="detalle-etiqueta">
                        VIDEOJUEGO
                    </p>

                    <h1>
                        {videojuego.nombre}
                    </h1>

                    <div className="detalle-datos">

                        <div>
                            <span>Género</span>

                            <strong>
                                {videojuego.genero}
                            </strong>
                        </div>

                        <div>
                            <span>Plataforma</span>

                            <strong>
                                {videojuego.plataforma}
                            </strong>
                        </div>

                        <div>
                            <span>Año</span>

                            <strong>
                                {videojuego.anio}
                            </strong>
                        </div>

                    </div>

                    <div className="detalle-estado">
                        {videojuego.estado}
                    </div>

                    <button
                        className="detalle-boton"
                        onClick={agregarJuego}
                    >
                        Agregar a mi biblioteca
                    </button>

                    {videojuego.enlaceCompra && (
                        <div className="detalle-compra">

                            <p className="detalle-compra-titulo">
                                ¿Dónde comprar?
                            </p>

                            <p className="detalle-compra-texto">
                                Encuentra este videojuego en su tienda oficial.
                            </p>

                            <a
                                href={videojuego.enlaceCompra}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="detalle-tienda"
                            >
                                Ir a la página del juego
                            </a>

                        </div>
                    )}

                </div>

            </section>
        </main>
    );
}

export default DetalleVideojuego;