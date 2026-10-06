import { useParams, Link } from "react-router-dom";
import { videojuegos } from "../data/videojuegos";
import { agregarBiblioteca } from "../biblioteca";

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
            <main className="container py-4">
                <h1>Videojuego no encontrado</h1>

                <Link
                    to="/catalogo"
                    className="btn btn-primary mt-3"
                >
                    Volver al catálogo
                </Link>
            </main>
        );
    }

    const plataforma = videojuego.plataforma.toLowerCase();

    let tienda = null;

    if (plataforma.includes("nintendo")) {
        tienda = {
            nombre: "Nintendo eShop",
            descripcion: "Busca este videojuego en la tienda oficial de Nintendo.",
            url: "https://www.nintendo.com/us/store/"
        };
    } else if (plataforma.includes("pc")) {
        tienda = {
            nombre: "Steam",
            descripcion: "Busca este videojuego en Steam.",
            url: "https://store.steampowered.com/"
        };
    } else if (plataforma.includes("playstation")) {
        tienda = {
            nombre: "PlayStation Store",
            descripcion: "Busca este videojuego en la tienda oficial de PlayStation.",
            url: "https://store.playstation.com/"
        };
    } else if (plataforma.includes("xbox")) {
        tienda = {
            nombre: "Xbox",
            descripcion: "Busca este videojuego en la tienda oficial de Xbox.",
            url: "https://www.xbox.com/games/store"
        };
    }

    return (
        <main className="container py-4">

            <Link
                to="/catalogo"
                className="btn btn-secondary mb-4"
            >
                ← Volver al catálogo
            </Link>

            <div className="row">

                <div className="col-md-6">
                    <img
                        src={videojuego.imagen}
                        className="img-fluid rounded"
                        alt={videojuego.nombre}
                    />
                </div>

                <div className="col-md-6">

                    <h1>{videojuego.nombre}</h1>

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

                    <p>
                        <strong>Estado:</strong>{" "}
                        {videojuego.estado}
                    </p>

                    <button
                        className="btn btn-primary"
                        onClick={agregarJuego}
                    >
                        Agregar a mi biblioteca
                    </button>


                    {tienda && (
                        <div className="mt-5 p-4 border rounded bg-light">

                            <h2 className="h4">
                                Dónde comprar
                            </h2>

                            <p className="text-muted">
                                {tienda.descripcion}
                            </p>

                            <a
                                href={tienda.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-outline-primary"
                            >
                                Ver en {tienda.nombre}
                            </a>

                        </div>
                    )}

                </div>

            </div>

        </main>
    );
}

export default DetalleVideojuego;