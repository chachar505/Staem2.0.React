import { useState } from "react";
import {
    obtenerBiblioteca,
    cambiarEstado
} from "../biblioteca";

import "./Biblioteca.css";

function Biblioteca() {
    const [biblioteca, setBiblioteca] = useState(obtenerBiblioteca());

    const marcarEstado = (id, estado) => {
        cambiarEstado(id, estado);
        setBiblioteca([...obtenerBiblioteca()]);
    };

    const jugados = biblioteca.filter(
        (videojuego) => videojuego.estadoBiblioteca === "jugado"
    );

    const pendientes = biblioteca.filter(
        (videojuego) => videojuego.estadoBiblioteca === "pendiente"
    );

    const mostrarJuego = (videojuego) => (
        <div className="juego-card" key={videojuego.id}>
            <img
                src={videojuego.imagen}
                alt={videojuego.nombre}
                className="juego-imagen"
            />

            <div className="juego-contenido">
                <h2 className="juego-nombre">
                    {videojuego.nombre}
                </h2>

                <p className="juego-dato">
                    <strong>Género:</strong>{" "}
                    {videojuego.genero}
                </p>

                <p className="juego-dato">
                    <strong>Plataforma:</strong>{" "}
                    {videojuego.plataforma}
                </p>

                <div className="juego-botones">
                    <button
                        className="boton-jugado"
                        onClick={() =>
                            marcarEstado(
                                videojuego.id,
                                "jugado"
                            )
                        }
                    >
                        Jugado
                    </button>

                    <button
                        className="boton-pendiente"
                        onClick={() =>
                            marcarEstado(
                                videojuego.id,
                                "pendiente"
                            )
                        }
                    >
                        Pendiente
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <main className="biblioteca-page">
            <h1 className="biblioteca-titulo">
                Mi biblioteca
            </h1>

            <section className="biblioteca-seccion">
                <h2 className="biblioteca-seccion-titulo">
                     Videojuegos jugados
                </h2>

                {jugados.length === 0 ? (
                    <p className="sin-juegos">
                        Todavía no tienes videojuegos jugados.
                    </p>
                ) : (
                    <div className="biblioteca-grid">
                        {jugados.map(mostrarJuego)}
                    </div>
                )}
            </section>

            <section className="biblioteca-seccion">
                <h2 className="biblioteca-seccion-titulo">
                     Videojuegos pendientes
                </h2>

                {pendientes.length === 0 ? (
                    <p className="sin-juegos">
                        No tienes videojuegos pendientes.
                    </p>
                ) : (
                    <div className="biblioteca-grid">
                        {pendientes.map(mostrarJuego)}
                    </div>
                )}
            </section>
        </main>
    );
}

export default Biblioteca;