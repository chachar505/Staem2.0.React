import { useState } from "react";
import {
    obtenerBiblioteca,
    cambiarEstado,
    quitarBiblioteca
} from "../biblioteca";

import "./Biblioteca.css";

function Biblioteca() {
    const [biblioteca, setBiblioteca] = useState(obtenerBiblioteca());
    const [busqueda, setBusqueda] = useState("");
    const [filtroEstado, setFiltroEstado] = useState("todos");
    const [filtroGenero, setFiltroGenero] = useState("todos");
    const [filtroPlataforma, setFiltroPlataforma] = useState("todas");

    const marcarEstado = (id, estado) => {
        cambiarEstado(id, estado);
        setBiblioteca([...obtenerBiblioteca()]);
    };

    const quitarJuego = (id) => {
        quitarBiblioteca(id);
        setBiblioteca([...obtenerBiblioteca()]);
    };

    // Opciones para los filtros según los juegos guardados.
    const generos = [...new Set(biblioteca.map((juego) => juego.genero))];
    const plataformas = [...new Set(biblioteca.map((juego) => juego.plataforma))];

    // Buscamos por nombre y aplicamos los filtros seleccionados.
    const juegosFiltrados = biblioteca.filter((juego) => {
        const coincideNombre = juego.nombre
            .toLowerCase()
            .includes(busqueda.toLowerCase());
        const coincideGenero = filtroGenero === "todos" || juego.genero === filtroGenero;
        const coincidePlataforma = filtroPlataforma === "todas" || juego.plataforma === filtroPlataforma;

        return coincideNombre && coincideGenero && coincidePlataforma;
    });

    const jugados = juegosFiltrados.filter(
        (videojuego) => videojuego.estadoBiblioteca === "jugado"
    );

    const pendientes = juegosFiltrados.filter(
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
                <h2 className="juego-nombre">{videojuego.nombre}</h2>

                <p className="juego-dato">
                    <strong>Género:</strong> {videojuego.genero}
                </p>

                <p className="juego-dato">
                    <strong>Plataforma:</strong> {videojuego.plataforma}
                </p>

                <div className="juego-botones">
                    <button
                        className="boton-jugado"
                        onClick={() => marcarEstado(videojuego.id, "jugado")}
                    >
                        Jugado
                    </button>

                    <button
                        className="boton-pendiente"
                        onClick={() => marcarEstado(videojuego.id, "pendiente")}
                    >
                        Pendiente
                    </button>

                    <button
                        className="boton-quitar"
                        onClick={() => quitarJuego(videojuego.id)}
                    >
                        Quitar
                    </button>
                </div>
            </div>
        </div>
    );

    const noHayResultados = juegosFiltrados.length === 0;

    return (
        <main className="biblioteca-page">
            <h1 className="biblioteca-titulo">Mi biblioteca</h1>

            <section className="biblioteca-filtros">
                <h2>Buscar y filtrar videojuegos</h2>

                <input
                    type="text"
                    className="biblioteca-buscador"
                    placeholder="Buscar por nombre..."
                    value={busqueda}
                    onChange={(evento) => setBusqueda(evento.target.value)}
                />

                <div className="biblioteca-filtros-opciones">
                    <select
                        value={filtroEstado}
                        onChange={(evento) => setFiltroEstado(evento.target.value)}
                        aria-label="Filtrar por estado"
                    >
                        <option value="todos">Todos los estados</option>
                        <option value="jugado">Jugados</option>
                        <option value="pendiente">Pendientes</option>
                    </select>

                    <select
                        value={filtroGenero}
                        onChange={(evento) => setFiltroGenero(evento.target.value)}
                        aria-label="Filtrar por género"
                    >
                        <option value="todos">Todos los géneros</option>
                        {generos.map((genero) => (
                            <option key={genero} value={genero}>{genero}</option>
                        ))}
                    </select>

                    <select
                        value={filtroPlataforma}
                        onChange={(evento) => setFiltroPlataforma(evento.target.value)}
                        aria-label="Filtrar por plataforma"
                    >
                        <option value="todas">Todas las plataformas</option>
                        {plataformas.map((plataforma) => (
                            <option key={plataforma} value={plataforma}>{plataforma}</option>
                        ))}
                    </select>
                </div>

                <button
                    className="boton-limpiar-filtros"
                    onClick={() => {
                        setBusqueda("");
                        setFiltroEstado("todos");
                        setFiltroGenero("todos");
                        setFiltroPlataforma("todas");
                    }}
                >
                    Limpiar filtros
                </button>
            </section>

            {noHayResultados ? (
                <p className="sin-juegos">
                    {biblioteca.length === 0
                        ? "Todavía no tienes videojuegos en tu biblioteca."
                        : "No se encontraron videojuegos con esos filtros."}
                </p>
            ) : (
                <>
                    {(filtroEstado === "todos" || filtroEstado === "jugado") && (
                        <section className="biblioteca-seccion">
                            <h2 className="biblioteca-seccion-titulo">Videojuegos jugados</h2>
                            {jugados.length === 0 ? (
                                <p className="sin-juegos">No hay videojuegos jugados que coincidan con la búsqueda.</p>
                            ) : (
                                <div className="biblioteca-grid">{jugados.map(mostrarJuego)}</div>
                            )}
                        </section>
                    )}

                    {(filtroEstado === "todos" || filtroEstado === "pendiente") && (
                        <section className="biblioteca-seccion">
                            <h2 className="biblioteca-seccion-titulo">Videojuegos pendientes</h2>
                            {pendientes.length === 0 ? (
                                <p className="sin-juegos">No hay videojuegos pendientes que coincidan con la búsqueda.</p>
                            ) : (
                                <div className="biblioteca-grid">{pendientes.map(mostrarJuego)}</div>
                            )}
                        </section>
                    )}
                </>
            )}
        </main>
    );
}

export default Biblioteca;