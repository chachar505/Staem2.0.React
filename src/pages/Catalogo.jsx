import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { videojuegos } from "../data/videojuegos";
import { agregarBiblioteca } from "../biblioteca";
import "./Catalogo.css";

function Catalogo() {
    const [busqueda, setBusqueda] = useState("");
    const [generoSeleccionado, setGeneroSeleccionado] = useState("");
    const [plataformaSeleccionada, setPlataformaSeleccionada] = useState("");

    // Las opciones se obtienen de los datos para mantenerse actualizadas.
    const generos = [...new Set(videojuegos.map((juego) => juego.genero))].sort((a, b) => a.localeCompare(b, "es"));
    const plataformas = [...new Set(videojuegos.map((juego) => juego.plataforma))].sort((a, b) => a.localeCompare(b, "es"));

    // Filtramos el catálogo según todos los campos seleccionados.
    const juegosFiltrados = useMemo(() => {
        const texto = busqueda.trim().toLocaleLowerCase("es");

        return videojuegos.filter((juego) => {
            const coincideNombre = juego.nombre.toLocaleLowerCase("es").includes(texto);
            const coincideGenero = !generoSeleccionado || juego.genero === generoSeleccionado;
            const coincidePlataforma = !plataformaSeleccionada || juego.plataforma === plataformaSeleccionada;

            return coincideNombre && coincideGenero && coincidePlataforma;
        });
    }, [busqueda, generoSeleccionado, plataformaSeleccionada]);

    const limpiarFiltros = () => {
        setBusqueda("");
        setGeneroSeleccionado("");
        setPlataformaSeleccionada("");
    };

    const agregarJuego = (videojuego) => {
        agregarBiblioteca(videojuego);
        alert(`${videojuego.nombre} fue agregado a tu biblioteca`);
    };

    return (
        <main className="catalogo-page">
            <div className="catalogo-encabezado">
                <p>COLECCIÓN</p>
                <h1>Catálogo de videojuegos</h1>
                <span>Explora nuestra colección de videojuegos.</span>
            </div>

            <section className="catalogo-filtros" aria-label="Buscar y filtrar videojuegos">
                <h2>Buscar y filtrar videojuegos</h2>
                <label className="solo-lectores" htmlFor="buscar-videojuego">Buscar por nombre</label>
                <input
                    id="buscar-videojuego"
                    className="filtro-busqueda"
                    type="search"
                    placeholder="Buscar por nombre..."
                    value={busqueda}
                    onChange={(evento) => setBusqueda(evento.target.value)}
                />

                <div className="filtros-selectores">
                    <label className="solo-lectores" htmlFor="filtro-genero">Género</label>
                    <select id="filtro-genero" value={generoSeleccionado} onChange={(evento) => setGeneroSeleccionado(evento.target.value)}>
                        <option value="">Todos los géneros</option>
                        {generos.map((genero) => <option key={genero} value={genero}>{genero}</option>)}
                    </select>

                    <label className="solo-lectores" htmlFor="filtro-plataforma">Plataforma</label>
                    <select id="filtro-plataforma" value={plataformaSeleccionada} onChange={(evento) => setPlataformaSeleccionada(evento.target.value)}>
                        <option value="">Todas las plataformas</option>
                        {plataformas.map((plataforma) => <option key={plataforma} value={plataforma}>{plataforma}</option>)}
                    </select>
                </div>

                <button type="button" className="limpiar-filtros" onClick={limpiarFiltros}>Limpiar filtros</button>
            </section>

            <div className="catalogo-resumen" aria-live="polite">
                <p>Mostrando <strong>{juegosFiltrados.length}</strong> de <strong>{videojuegos.length}</strong> videojuegos</p>
            </div>

            {juegosFiltrados.length > 0 ? (
                <div className="catalogo-grid">
                    {juegosFiltrados.map((videojuego) => (
                        <article className="juego-card" key={videojuego.id}>
                            <Link to={`/videojuego/${videojuego.id}`} className="juego-imagen-link">
                                <div className="juego-imagen">
                                    <img src={videojuego.imagen} alt={videojuego.nombre} />
                                </div>
                            </Link>
                            <div className="juego-contenido">
                                <h2>{videojuego.nombre}</h2>
                                <div className="juego-datos">
                                    <p><strong>Género</strong><span>{videojuego.genero}</span></p>
                                    <p><strong>Plataforma</strong><span>{videojuego.plataforma}</span></p>
                                    <p><strong>Año</strong><span>{videojuego.anio}</span></p>
                                </div>
                                <span className="juego-estado">{videojuego.estado}</span>
                                <div className="juego-botones">
                                    <Link to={`/videojuego/${videojuego.id}`} className="juego-detalles">Ver detalles</Link>
                                    <button className="juego-agregar" onClick={() => agregarJuego(videojuego)}>Agregar a mi biblioteca</button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="catalogo-sin-resultados">
                    <h2>No se encontraron videojuegos</h2>
                    <p>Prueba con otro nombre o modifica los filtros seleccionados.</p>
                    <button type="button" className="limpiar-filtros" onClick={limpiarFiltros}>Ver todo el catálogo</button>
                </div>
            )}
        </main>
    );
}

export default Catalogo;
