import { videojuegos } from "../data/videojuegos";

function Catalogo() {
    return (
        <main className="container py-4">
            <div className="text-center mb-4">
                <h1>Catálogo de videojuegos</h1>
                <p className="text-muted">
                    Explora nuestra colección de videojuegos.
                </p>
            </div>

            <div className="row g-4">
                {videojuegos.map((videojuego) => (
                    <div className="col-12 col-md-6 col-lg-4" key={videojuego.id}>
                        <div className="card h-100 shadow-sm">

                            <img
                                src={videojuego.imagen}
                                className="card-img-top"
                                alt={videojuego.nombre}
                                style={{ height: "250px", objectFit: "cover" }}
                            />

                            <div className="card-body">
                                <h2 className="card-title h5">
                                    {videojuego.nombre}
                                </h2>

                                <p className="card-text">
                                    <strong>Género:</strong> {videojuego.genero}
                                </p>

                                <p className="card-text">
                                    <strong>Plataforma:</strong>{" "}
                                    {videojuego.plataforma}
                                </p>

                                <p className="card-text">
                                    <strong>Año:</strong> {videojuego.anio}
                                </p>

                                <span className="badge text-bg-primary">
                                    {videojuego.estado}
                                </span>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Catalogo;