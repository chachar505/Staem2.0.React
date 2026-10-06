import { Link } from "react-router-dom";
import { videojuegos } from "../data/videojuegos";

import "./Inicio.css";

function Inicio() {
    const juegoPrincipal = videojuegos[0];
    const juegosDestacados = videojuegos.slice(1, 5);

    return (
        <main className="inicio-page">

            <section className="inicio-hero">

                <div className="inicio-hero-contenido">

                    <p className="inicio-etiqueta">
                        GameUp
                    </p>

                    <h1>
                        Tu colección de videojuegos,
                        <span> en un solo lugar.</span>
                    </h1>

                    <p className="inicio-descripcion">
                        Explora nuevos títulos, conoce sus detalles
                        y guarda tus videojuegos favoritos en tu
                        propia biblioteca.
                    </p>

                    <div className="inicio-botones">

                        <Link
                            to="/catalogo"
                            className="inicio-boton principal"
                        >
                            Explorar catálogo
                        </Link>

                        <Link
                            to="/biblioteca"
                            className="inicio-boton secundario"
                        >
                            Ver mi biblioteca
                        </Link>

                    </div>

                </div>


                {juegoPrincipal && (
                    <Link
                        to={`/videojuego/${juegoPrincipal.id}`}
                        className="juego-principal"
                    >

                        <img
                            src={juegoPrincipal.imagen}
                            alt={juegoPrincipal.nombre}
                        />

                        <div className="juego-principal-info">

                            <p>
                                Videojuego destacado
                            </p>

                            <h2>
                                {juegoPrincipal.nombre}
                            </h2>

                            <span>
                                Ver detalles →
                            </span>

                        </div>

                    </Link>
                )}

            </section>


            <section className="destacados">

                <div className="destacados-encabezado">

                    <div>

                        <p className="seccion-etiqueta">
                            DESCUBRE
                        </p>

                        <h2>
                            Más videojuegos
                        </h2>

                        <p>
                            Revisa algunos de los títulos
                            disponibles en nuestro catálogo.
                        </p>

                    </div>

                    <Link
                        to="/catalogo"
                        className="ver-todos"
                    >
                        Ver catálogo →
                    </Link>

                </div>


                <div className="destacados-grid">

                    {juegosDestacados.map((videojuego) => (
                        <Link
                            key={videojuego.id}
                            to={`/videojuego/${videojuego.id}`}
                            className="destacado-card"
                        >

                            <img
                                src={videojuego.imagen}
                                alt={videojuego.nombre}
                            />

                            <div className="destacado-info">

                                <h3>
                                    {videojuego.nombre}
                                </h3>

                                <p>
                                    {videojuego.genero}
                                </p>

                                <span>
                                    Ver detalles →
                                </span>

                            </div>

                        </Link>
                    ))}

                </div>

            </section>


            <section className="inicio-final">

                <div>

                    <h2>
                        Encuentra tu próximo videojuego
                    </h2>

                    <p>
                        Explora todos los títulos disponibles
                        y agrega tus favoritos a tu biblioteca.
                    </p>

                </div>

                <Link
                    to="/catalogo"
                    className="inicio-boton final"
                >
                    Ver catálogo
                </Link>

            </section>

        </main>
    );
}

export default Inicio;